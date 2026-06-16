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