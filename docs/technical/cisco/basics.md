
# Basics

[Cisco](https://en.wikipedia.org/wiki/Cisco) is a large _enterprise_ equipment manufacturer known for producing networking and telecoms hardware. Due to its widespread use, it's cheap and easy to get hold of on the secondhand market.

As Cisco are deleting documentation for End of Life products, we're going to attempt to document as much as we can here. At present most of the documentation applies to Cisco IOS devices, particually the 28XX, 38XX ISRs and the VG202, VG204, VG224 Voice Gateways, but this may change in future.


## Serial Console

Just about every Cisco device has a "console port" of some variety which exposes a serial connection for configuring the device when the networking side is either unconfigured or unavailable. Historically these have been an 8P8C RJ45 socket, but could be anything from a DB25 to a USB port, depending on the age of the equipment.

If you've obtained a second hand piece of Cisco equipment, chances are you're going to have to use a serial cable to reset the password and reconfigure it so you can access it via telnet or SSH.

If you don't have one already, search your favourite online marketplace for "Cisco Console Cable" and there should be lots of options. We'd recommend something with a genuine FTDI chipset, and possibly USB C if you're feeling posh.

### Default Serial Parameters

The default parameter for the console port are below. It's very unusual for these to be different, but if you don't get a response it might be worth trying `115200` baud. If that doesn't work, you're on your own.  

| Parameter | Value | 
|-----------|-------|
| Baud Rate |  9600 |
| Data Bits |     8 |
| Parity    |  none |
| Stop Bits |     1 |

## Storage

There's a couple of different types of storage that are worth familiarising yourself with:  

* **Flash** - Used for storing Firmware images. Could be a removable Compact Flash card, or soldered to the board.
* **NVRAM (Non-Volatile Random Access Memory)** - Used for storing configuration

Some devices also have USB ports which can have storage attached

## Authentication

Depending on how the device is configured, you may find when you login you're in _user mode_, signified by the `>` prompt. When you're in user mode the available commands are limited, often allowing you to check the configuration and status, but preventing changes to the config.

To enter _privileged mode_, enter the `enable` command - you may be prompted for a password. Once you're in privileged mode you should see the prompt change to `#`

Note - this is somewhat of an over simplication that describes the default behaviour - IOS allows you assign privilege levels to users, and map different commands to different privilege levels.

## Making changes persistent 

Cisco devices have what they call a `running-config` and a `startup-config`. When you make a change via the console it's applied instantly, and if you run the command `show running-config` you'll see your changes. _However_ these changes aren't persistent, and if the device is power cycled the changes will be lost, reverting to whatever was previously saved. This can be useful as a last-resort method to backout of changes, but generally you'll want to save new changes so they're persistent.

To save changes, you issue the command:  

`copy running-config startup-config` 

or the abbreviated version:  

`copy run start` 

This will save the config to the NVRAM so they persist after a reboot.