
let services = JSON.parse(localStorage.getItem("services")) || [];

let clients = JSON.parse(localStorage.getItem("clients")) || [];

let clientSelect = document.querySelector("#clientSelect");

function loadClients() {
    clientSelect.innerHTML = `<option value="">Select client</option>`;

    clients.forEach(function(client) {
      
        clientSelect.innerHTML += `
            <option value="${client.fname}">${client.fname}</option>
        `;
    });
}

loadClients();


function getClientName() {
    let selected = document.querySelector("#clientSelect").value;
    let typed    = document.querySelector("#clientName").value;
    return selected || typed; 
}



function addRow() {
    
    let options = "";
    services.forEach(function(service) {
        options += `<option value="${service.price}">${service.name}</option>`;
    });

  
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <select class="services" onchange="onServiceChange(this)">
                ${options}
            </select>
        </td>
        <td>
            <input type="number" class="price" value="0">
        </td>
        <td>
            <input type="number" class="qty" value="1" oninput="onQtyChange(this)">
        </td>
        <td class="tva">0 DH</td>
        <td class="lineTotal">0 DH</td>
    `;

    document.querySelector("#tbody").appendChild(row);
    updateGrandTotal();
}


function onServiceChange(selectEl) {
    let row = selectEl.closest("tr");         
    row.querySelector(".price").value = selectEl.value;
    updateLine(row);
}


function onQtyChange(inputEl) {
    let row = inputEl.closest("tr");
    updateLine(row);
}


function updateLine(row) {
    let price = Number(row.querySelector(".price").value);
    let qty   = Number(row.querySelector(".qty").value);

    let totalHT  = price * qty;
    let tva      = totalHT * 0.20;   // TVA 20%
    let totalTTC = totalHT + tva;

    row.querySelector(".tva").textContent       = tva.toFixed(2)      + " DH";
    row.querySelector(".lineTotal").textContent = totalTTC.toFixed(2) + " DH";

    updateGrandTotal();
}



function updateGrandTotal() {
    let rows = document.querySelectorAll("#tbody tr");

    let totalHT  = 0;
    let totalTVA = 0;
    let totalTTC = 0;

    rows.forEach(function(row) {
        let price = Number(row.querySelector(".price").value);
        let qty   = Number(row.querySelector(".qty").value);

        let ht  = price * qty;
        let tva = ht * 0.20;
        let ttc = ht + tva;

        totalHT  += ht;
        totalTVA += tva;
        totalTTC += ttc;
    });

    document.querySelector("#totalHT").textContent  = totalHT.toFixed(2)  + " DH";
    document.querySelector("#totalTVA").textContent = totalTVA.toFixed(2) + " DH";
    document.querySelector("#grandTotal").textContent = totalTTC.toFixed(2) + " DH";
}



function saveInvoice(totalTTC) {
    let invoices = JSON.parse(localStorage.getItem("invoices")) || [];

    let lastId = Number(localStorage.getItem("invoiceId")) || 0;
    let newId  = lastId + 1;

    let newInvoice = {
        id:     "#INV-" + newId,
        date:   new Date().toLocaleDateString(),
        client: getClientName(),
        total:  totalTTC.toFixed(2)
    };

    invoices.push(newInvoice);

    localStorage.setItem("invoices",   JSON.stringify(invoices));
    localStorage.setItem("invoiceId",  newId);
}


window.jsPDF = window.jspdf.jsPDF;

function downloadPDF() {
    
    let buttons = document.querySelectorAll(".btnpdf");
    buttons.forEach(btn => btn.style.display = "none");

    let invoiceEl = document.getElementById("invoice");

   
    html2canvas(invoiceEl, { scale: 2 }).then(function(canvas) {
        let imgData = canvas.toDataURL("image/png");

       
        let pdf    = new jsPDF("p", "mm", "a4");
        let width  = 190;
        let height = canvas.height * width / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, width, height);
        pdf.save("invoice.pdf");

        
        let totalText = document.querySelector("#grandTotal").textContent;
        let totalNum  = Number(totalText.replace("DH", "").trim());
        saveInvoice(totalNum);

        buttons.forEach(btn => btn.style.display = "inline-block");
        location.reload();
    });
}

document.querySelector("#date").textContent = new Date().toLocaleDateString();