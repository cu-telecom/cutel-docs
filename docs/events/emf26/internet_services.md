# Internet Services

This year we will be offering a plethora of Internet Services, supporting up to 1Gb/s !

!!! warning "Disclaimer"

    * All these services are best effort, experimental, and provided for fun. If you want reliable internet maintained by _real_ network engineers, please use the services provided by the EMF NOC Team.
    * Please disable WiFi on any routers or equipment you're using, ideally before arriving on site.

## Dial Up Internet

We will be providing Dial Up Internet access across the entire site - up to a speedy 56kb/s.

### Required Equipment

* A 50m ethernet cable + BT Adapter
* A suitable dial up modem - We recommend a _real_ modem such as those made by US Robotics, rather than a [winmodem/softmodem](https://en.wikipedia.org/wiki/Softmodem)

If you intend to host your own Dial Up service on a CuTEL line, please get in touch so we can optimise your line.

<figure markdown="span">
  [![US Robotics Modem](images/usr-modem.png){ width="400" }](images/usr-modem.png)
  <figcaption>US Robotics Modem</figcaption>
</figure>

### Accessing the service

Telephone numbers will be announced closer to the event. Login credentials are as per *[PPPoE](#pppoe)*.

## Experimental Services

We'll be offering some cutting-edge, experimental services within a limited trial area, covering [Camping C2](https://map.emfcamp.org/#16/52.0411/-2.3784/m=52.042,-2.37589)

<figure markdown="span">
  [![CuTEL Trial Area](images/CuTEL-ISP-Coverage.png){ width="400" }](images/CuTEL-ISP-Coverage.png)
  <figcaption>CuTEL Trial Area</figcaption>
</figure>

### VDSL/ADSL2 (Fibre to the DK)

Within the trial area we'll be offering VDSL and ADSL2 with blazing fast speeds of up to 80Mb/s down and 20Mb/s up !

#### Required Equipment

* A 50m ethernet cable + BT Adapter
* A router with builtin ADSL2 or VDSL modem
* **OR** a separate router + DSL modem
* A DSL filter

#### Accessing the service

PPPoE is used to access the service - see *[PPPoE](#pppoe)* for more information. PPPoA is **not** supported.

The following VLANs are available:

| VLAN ID    | Function |
| -------    | -------- |
| *untagged* | General PPPoE access |
| 101        | PPPoE for BT (and related) devices |

### GPON (Fibre to the Tent)

Within the trial area we'll also be offering [GPON](https://en.wikipedia.org/wiki/GPON). You may know this style of service as “Fibre to the Premises” - or in this case Fibre to the Tent.

We'll be offering up to face melting Gigabit speeds!

#### Required Equipment

You'll need some hardware to connect to the GPON network:

- An ONT (see *[ONT Compatibility](#ont-compatibility)*)
- A suitable length fibre - the splitter end should be SC APC (Green) and the ONT end should match your hardware.
- You may want to bring a suitable router, but you could connect a laptop directly if you're packing light

<figure markdown="span">
  [![SC APC Fibre](images/SC_APC_Fibre.jpg){ width="400" }](images/SC_APC_Fibre.jpg)
  <figcaption>SC APC Fibre</figcaption>
</figure>

#### ONT Compatibility

A table of ONTs that have been tested and confirmed as working can be found below.

* We'd recommend using one of the Openreach ones as they're easy to get hold of and come with a quality UK power supply.
* We **do not** recommend using an ONT that you intend to use with a "real" ISP in future, as our service will provision the equipment and we cannot _guarantee_ that it won't cause issues with another ISP.

| **Make / Model** | **Interfaces** | **FXS** | **CATV** | **Price** |
| --- | --- | --- | --- | --- |
| Nokia G-010G-R (Openreach) | 1GE | No | No | £10 (Second Hand) |
| Adtran SDX611 (Openreach) | 1GE | No | No | £10 (Second Hand) |
| V-Sol V2801SG  | 1GE | No | No | £15.59 |
| Huawei EG8120L  | 1GE + 1FE | Manual | No | £15 |
| Huawei HG8230V | 2FE | Manual | No | £6.50 |

#### Accessing the service

When you connect your ONT, it should be automatically provision general internet access on the 1st ethernet interface (untagged)

PPPoE is the prefered method of connecting (see *[PPPoE](#pppoe)*), but we also support DHCP for a "Plug and Play" experience (however, you will receive a CGNAT'ed IP).

<!-- ### Configuring your OLT for VoIP

Many of the Huawei ONTs have an "FXS" port that allows you to connect an analogue phone. To use this you will have to manually configure your ONT.

* Connect a computer to the ONT 
* Configure a static IP on your computer so you can access the ONTs web interface. The IP is usually printed on the back, but the default is `192.168.100.1`  Remember to set your IP to something unique in the same subnet, e.g  `192.168.100.10` 
* Open the ONTs IP in your browser and login. The default username and password is `telecomadmin` / `admintelecom`.
* Go to the WAN tab in the top menu bar, then click "new"
* 

<figure markdown="span">
  [![Huawei WAN Configuration](images/huawei_onu_voip_wan.png ){ width="400" }](images/huawei_onu_voip_wan.png )
  <figcaption>Huawei WAN Configuration</figcaption>
</figure>

-->

!!! tip "Tips"

    - Fibre optics don't like sharp bends or other mechanical stress
    - Dirty connectors can reduce performance. Avoid touching them, and apply dust caps when not in use.
    - SC APC and SC UPC connectors will physically connect, but it can damage them. Avoid mixing connector types / colours.
    - GPON uses lasers. These are at low power levels, but avoid looking directly into any connectors.

### PPPoE

We service the following PPPoE realms (*See below for 'wholesaling'*):

| Realm                   | Public IPv4 | Public IPv6 | Prefix Delegation | CGNAT | 
| ---------------         | ----------- | ----------- | ----------------- | ----- |
| `@btinternet.com`       | ✅          | ✅          | ✅                | ❌    |
| `@btbroadband.com`      | ✅          | ✅          | ✅                | ❌    |
| `@talktalk.com`         | ✅          | ✅          | ✅                | ❌    |
| `@service.btclick.com`  | ✅          | ✅          | ✅                | ❌    |
| `@business.btclick.com` | ✅          | ✅          | ✅                | ❌    |
| `@cutel.net`            | ✅          | ✅          | ✅                | ❌    |
| `@firewall.ed`          | ❌          | ❌          | ❌                | ✅    |
| `@firewalled.net`       | ❌          | ❌          | ❌                | ✅    |

These have been tested to be plug-and-play functional with BT Home Hubs and Business Hubs. Passwords are **not** checked.

CGNAT addresses come out of `100.64.0.0/10`. We'd recommend using these on old, potentially insecure, equipment.
**We don't** give out static addresses of either type, so expect your IPv6 PD ranges to change. We may be able to advertise & route your prefixes - if you're after this, please give advance notice.

### Wholesale Broadband

This year, we are giving connected users the option of becoming their own ISP.
This can be done by running an L2TP server and setting the DNS up as follows:

- Create **SRV** records in the format `_l2tp._udp.<YOUR DOMAIN>`
- Create corresponding **A** records, pointing to your L2TP server(s). AAAA records are **not** accepted.
- Connect to DSL, Dial-Up or GPON over **PPPoE** as normal, specifying **your domain** as the realm in your username.
    - For example, you can log in as `youruser@<YOUR DOMAIN>`, where `<YOUR DOMAIN>` is the same as above
    - **Further authentication** is handled by your server.

#### Important Points
- Your L2TP server **must** listen on port `1701` on a *publicly reachable* IPv4 address.
- The L2TP secret sent is always `emf2026`
- Up to **three** SRV records will be load-balanced round-robin.

!!! danger "Security"

    As the shared secret is known, we **strongly** recommend setting up IP access lists for your LNS. L2TP traffic is also plain-text, so choose your authentication schemes carefully. We can offer **IPSec** transport for your L2TP traffic - please let us know with plenty of notice.

    Our LAC will have the following IP: `109.95.186.254` (***This is currently subject to change! Please review this as you arrive at EMF***)

#### Checking your DNS configuration

<script type="text/javascript">
async function dnsQuery(name, type) {
  const url = "https://one.one.one.one/dns-query?type=" + encodeURIComponent(type) + "&name=" + encodeURIComponent(name);
  try {
    const response = await fetch(url, {"method":"GET", "headers":{"Accept":"application/dns-json"}});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
    return undefined;
  }
}

function createTableData(data) {
    var el = document.createElement("td");
    el.innerHTML = data;
    return el;
}

function createTableDataBold(data) {
    var el = createTableData(data);
    el.style.fontWeight = "bold";
    return el;
}

async function run_dnscheck(realm) {
    document.getElementById("dnscheck_err").innerText = "";
    document.getElementById("dnscheck_results").innerHTML = "";

    var srv_name = "_l2tp._udp."+realm;
    var srv_resp = await dnsQuery(srv_name, "SRV");

    if (srv_resp["Status"] != 0) {
        document.getElementById("dnscheck_err").innerText = "Error: SRV " + srv_name + " not found!";
        return;
    }

    var final_table_ents = [];

    for (var i=0;i<srv_resp["Answer"].length;i++) {
        var srv = srv_resp["Answer"][i];
        if (srv["name"] != srv_name) continue; // Just in case we get some junk

        var srv_data = srv["data"].split(" ");

        if (srv_data.length != 4) {
            final_table_ents.push({"error":"SRV record contains invalid data"});
            continue;
        }

        if (srv_data[2] != 1701) {
            final_table_ents.push({"error":"SRV port is not 1701"});
            continue;
        }

        var a_resp = await dnsQuery(srv_data[3], "A");

        if (a_resp["Status"] != 0) {
            final_table_ents.push({"name":srv_data[3],"error":"Failed to look up A record"});
            continue;
        }

        var ent = {"name":srv_data[3],"success":"Found A record","ips":[]};
        for (var j=0;j<a_resp["Answer"].length;j++)
            ent["ips"].push(a_resp["Answer"][j]["data"]);

        final_table_ents.push(ent);
    }

    if (final_table_ents.length > 0) {
        var results_table = document.createElement("table");
        document.getElementById("dnscheck_results").appendChild(results_table);

        // HEADER
        var hdr_row = document.createElement("tr");
        hdr_row.appendChild(createTableDataBold("LNS Name"));
        hdr_row.appendChild(createTableDataBold("Status"));
        hdr_row.appendChild(createTableDataBold("Address(es)"));
        results_table.appendChild(hdr_row);

        // RESULTS
        for (var i=0;i<final_table_ents.length;i++) {
            var res_row = document.createElement("tr");
            res_row.appendChild(createTableData(final_table_ents[i].name?final_table_ents[i].name:""));
            if (final_table_ents[i].error) {
                res_row.appendChild(createTableData(final_table_ents[i].error));
                res_row.style.backgroundColor = "#c96f69";
            } else {
                res_row.appendChild(createTableData(final_table_ents[i].success));
                res_row.style.backgroundColor = "#9ed194";
            }

            var ip_str = "";
            if (final_table_ents[i].ips) {
                for (var j=0;j<final_table_ents[i].ips.length;j++)
                    ip_str = ip_str + final_table_ents[i].ips[j] + ",";

                if (ip_str.substr(ip_str.length-1,1) == ",")
                    ip_str = ip_str.substring(0,ip_str.length-1);
            }

            res_row.appendChild(createTableData(ip_str));

            results_table.appendChild(res_row);
        }
    }
}

function dnscheck(evt, form) {
    var realm = form["realm"].value;

    run_dnscheck(realm);

    evt.preventDefault();
    return false;
}
</script>

You can check your DNS configuration using this tool <noscript><b>(Javascript is required)</b></noscript>:
<form action="#" onsubmit="dnscheck(event, this)">
<label for="realm">Enter your domain (<b>realm</b>) here:</label>
<input type="text" required minlength="3" maxlength="127" id="realm" name="realm" style="border:1px solid black;" placeholder="Enter Realm">
<input type="submit" value="Check Domain">
</form>

<h3 id="dnscheck_err" style="font-weight:bold;color:red;"></h3>
<div id="dnscheck_results"></div>
