

let clients  = JSON.parse(localStorage.getItem("clients"))  || [];
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];


document.querySelector("#totalClients").textContent  = clients.length;
document.querySelector("#totalInvoices").textContent = invoices.length;

let revenue = 0;

invoices.forEach(function(inv) {
    revenue += Number(inv.total);
});

document.querySelector("#revenue").textContent = revenue.toFixed(2) + " DH";




function showInvoices(data) {
    let tbody = document.querySelector("#invoiceBody");
    tbody.innerHTML = "";

    data.forEach(function(inv) {
        let row = document.createElement("tr");

        [inv.id, inv.client, inv.date, inv.total + " DH"].forEach(function(val) {
            let td = document.createElement("td");
            td.textContent = val;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });
}


showInvoices(invoices);


function searchInvoices() {

  
    let keyword = document.querySelector("#search").value.toLowerCase();

    let results = invoices.filter(function(inv) {

        let clientName = inv.client.toLowerCase();
        let invoiceId  = inv.id.toLowerCase();

        return clientName.includes(keyword) || invoiceId.includes(keyword);

    });


    showInvoices(results);
}