The following instructions should help you get started with a basic configuration, ready to move on to more complex configurations.

It's designed for simplicity 


## Factory Reset

It's common for secondhand Cisco kit to arrive with the previous configuration still on it, and an unknown password. 

To reset the config you will need to enter `ROMON` mode as the device boots by sending a `BREAK` signal. How to send this signal will depend on what terminal software you're using - Look it up with your favourite search engine.

Connect via the console port and reboot or power up the device. Keep sending the `BREAK` signal until you hit the following prompt:

`rommon 1 >`  

The enter the following:  

```
confreg 0x2142
reset
```

The device will then reload and once it's booted up you should see the following prompt:  

`Would you like to enter the initial configuration dialog? [yes/no]:`

Enter `no` and hit enter. Some more info will scroll past on the terminal - keep hitting enter until you see the following:  

`Router>`

At that point enter the following:  

```
en
write erase
```
You'll then see the following:  

```
Erasing the nvram filesystem will remove all configuration files! Continue? [confirm]
```

Hit enter continue then enter the following:  

```
conf t
config-register 0x2102
end
copy run start
```

You'll then get prompted for the destination filename:  

`Destination filename [startup-config]?`

Hit enter to accept the default then enter:  

```
reload
```

You'll then be prompted to proceed with the reload:  

```
Proceed with reload? [confirm]
```

Hit enter, and the device should then reload with a factory default configuration.

## Configuration

Before going any further it's worth getting a basic configuration on the device so you can manage it via telnet and upgrade the IOS image if required, before moving on to the more complex configuration.

### Configure authentication

To configure the authentication and create a user enter the following, remembering to update the username and password to something relevant:  

```
en
conf t
aaa new-model
username your_username priviledge 15 secret your_password
aaa authentication login default local
aaa authorization exec default local
end
copy run start
```

### Configure the network

The following assumes you're connecting to the LAN via the FastEthernet0/0 interface, but could be updated to use FastEthernet0/1

#### DHCP

Configuring DHCP on the interface is simple:  

```
conf t
interface FastEthernet0/0
ip address dhcp
no shut
end
copy run start
```

#### Static IP

If you want use a static IP, you also need to add a static route. Here's an example, remember to update the IP, subnet mask, and default gateway:  

```
conf t
interface FastEthernet0/0
ip address 10.0.130.208 255.255.255.0
no shut
exit
ip route 0.0.0.0 0.0.0.0 10.0.130.1
end
copy run start
```

## Upgrading the IOS image

See [Upgrading IOS](upgrading_ios.md)
