# WIC-nAM

The Cisco WIC-nAM (WAN Interface Card - _n_ Analog Modem) is a 56k capable dial up modem, that can both originate and answer calls.

There are a number of models:

* WIC-1AM - 1 Modem
* WIC-2AM - 2 Modems
* WIC-8AM - 8 Modems
* WIC-16AM - 16 Modems !

## Compatibility 

### WIC-1AM

The original WIC-1AM is compatible with the following models, according to the [documentation](https://web.archive.org/web/20240711141926/https://www.cisco.com/c/en/us/support/docs/routers/3600-series-multiservice-platforms/7257-wic-2am.html)

* Cisco 1700
* Cisco 2600
* Cisco 2600XM	
* Cisco 3620, 3640, 3660, 3631	
* Cisco 2691, 3725, 3745

It has been tested on the following hardware:

| **Router Model** | **IOS**     | **Working** | **Notes**               |
|------------------|-------------|-------------|-------------------------|
| 1760             |             | Yes         | Does not support the v2 |

### WIC-1AMv2

The WIC-1AMv2 is compatible with the following models, according to the [documentation](https://dn790006.ca.archive.org/0/items/manualsonline-id-bd54868e-e2ea-48de-9957-54682506f997/bd54868e-e2ea-48de-9957-54682506f997.pdf):

* Cisco 2600XM
* Cisco 2691
* Cisco 2800
* Cisco 3700
* Cisco 3800

It has been tested on the following hardware:

| **Router Model** | **IOS**     | **Working** | **Notes**            |
|------------------|-------------|-------------|----------------------|
| 1760             |             | **NO**      | Only supports the v1 |
| 2811             | 15.1(4)M12a | Yes         |                      |
| 2911             |             | Yes         |                      |

## Performance

The WIC-1AMv2 will happily do _almost_ 56k. This was tested connecting to a AS5350 via a VG310, i.e 

`WIC-1AMv2 (2811) -> FXS (VG310) -> E1 -> AS5350`

```
Port  Type     Prot     Comp    Duration  Tx/Rx(bps) Tx/Rx(Lvl) SNR Cfg  Retrain
1     V.90     LAP-M    V.42bis  22      50667/28800- 12/-17     42  In   0
```

## Configuration

### PPP Dial Out

Here's an example config snippet for IOS 15.1 on a 2811. It dials out to 920 and logs in via PPP using the credentials `test@cutel.net` / `test`. It will only do so when outbound traffic is detected, e.g `ping 8.8.8.8`. It will then take some time for the connection to come up, then the ping should succeed. N.B, you may wish to apply ACLs or filter inbound connections elsewhere.

```
!
! The chat scripts reset the modem to sane defaults and initiate the call
!
chat-script INIT "" "AT&F" "OK" "AT&D2" "OK"
chat-script MODEMCONNECT ABORT BUSY ABORT ERROR ABORT "NO CARRIER" ABORT "NO DIALTONE" "" "AT&F" TIMEOUT 5 "OK" "AT&D2" TIMEOUT 5 "OK" "ATDT\T" TIMEOUT 120 "CONNECT" "\c"
!
!
! The router *needs* an IP address somewhere for Dial Up to work, either on an interface or a loopback:
! 
interface FastEthernet0/0
 ip address 10.25.76.10 255.255.255.0
 no shut
!
!
interface Async0/1/0
 ip address negotiated
 encapsulation ppp
 dialer in-band
 dialer idle-timeout 600 ! Timeout after 600s of no activity. Set to 0 to never timeout
 dialer wait-for-carrier-time 180
 ! dialer enable-timeout 30 ! How long to keep the interface down for after an error
 ! dialer redial interval 60 attempts 60 ! How often should we re-try after a failure
 dialer string 920 ! Update to the number you need to dial for your Dial Up service
 dialer-group 1
 async mode dedicated
 no keepalive
 ppp chap hostname test@cutel.net
 ppp chap password 0 test
 ! ppp chap refuse ! If you want to DISABLE CHAP, you must "refuse" it.
 ppp pap sent-username test@cutel.net password 0 test
!
!
ip route 0.0.0.0 0.0.0.0 Async0/1/0
!
dialer-list 1 protocol ip permit
!
line 0/1/0
 script startup INIT
 script dialer MODEMCONNECT
 script activation INIT
 modem InOut
 transport input all
 stopbits 1
 speed 115200
 flowcontrol hardware
!
```

### Reverse Telnet

If you want to connect to something like a BBS rather than a PPP Dial Up service, you can "Reverse Telnet" into the modem to manually enter AT commands.

First of all you'll need to find the "line" associated with your modem card. in my case its 18:

```
modem-client#show line
   Tty Line Typ     Tx/Rx    A Modem  Roty AccO AccI  Uses  Noise Overruns  Int
*     0    0 CTY              -    -      -    -    -     0      0    0/0      -
      1    1 AUX   9600/9600  -    -      -    -    -     0      0    0/0      -
  0/1/0   18 TTY 115200/115200- inout     -    -    -     5      0    0/0      -
```

Add the line number to 2000 to get the reverse telnet port number. E.G 2000 + 18 = 2018

Telnet to an IP on the router with the port number:

`telnet 10.25.76.10 2018`

Dial into your favourite BBS:

`ATDT 930`

To disconnect:

Press `Ctrl + Shift + 6` then `x`, then `disconnect` and then hit enter to confirm.


### Useful commands

View the connection speed: `show modem 0/1/0`  
Close the connection: `clear interface Async0/1/0`  

The following debug might be useful:  
```
debug chat  
debug ppp authentication  
debug ppp negotiation  
```