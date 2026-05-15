
let clients = JSON.parse(localStorage.getItem("clients")) || [];


let editingIndex = -1;



let emailInput   = document.querySelector("#email1");
let prenomInput  = document.querySelector("#fname");
let phoneInput   = document.querySelector("#phone");
let addressInput = document.querySelector("#Address");
let table        = document.querySelector("#clientsTable");



function afficher() {

    table.innerHTML = "";

    
    clients.forEach(function(client, i) {

        
        let row = document.createElement("tr");

        ["fname", "phone", "email", "address"].forEach(function(key) {
            let td = document.createElement("td");
            td.textContent = client[key]; 
            row.appendChild(td);
        });

        
        let tdActions = document.createElement("td");

        let btnModify = document.createElement("button");
        btnModify.textContent = "Modify";
        btnModify.onclick = function() { modifyClient(i); };

        
        let btnDelete = document.createElement("button");
        btnDelete.textContent = "Delete";
        btnDelete.onclick = function() { deleteClient(i); };

    
        tdActions.appendChild(btnModify);
        tdActions.appendChild(btnDelete);
        row.appendChild(tdActions);

    
        table.appendChild(row);
    });
}



function saveToStorage() {
    localStorage.setItem("clients", JSON.stringify(clients));
}



function addClient() {

  
    if (
        prenomInput.value.trim()  === "" ||
        phoneInput.value.trim()   === "" ||
        emailInput.value.trim()   === "" ||
        addressInput.value.trim() === ""
    ) {
        alert("Fill all fields");
        return; 
    }

    
    let clientData = {
        fname:   prenomInput.value.trim(),
        phone:   phoneInput.value.trim(),
        email:   emailInput.value.trim(),
        address: addressInput.value.trim()
    };

    if (editingIndex === -1) {
        
        clients.push(clientData);
    } else {
        
        clients[editingIndex] = clientData;
        editingIndex = -1; 
    }

    saveToStorage(); 
    afficher();     
    clearForm();    
}



function deleteClient(idx) {

    clients.splice(idx, 1);
    saveToStorage();
    afficher();
}



function modifyClient(idx) {

    let client = clients[idx];

    
    prenomInput.value  = client.fname;
    phoneInput.value   = client.phone;
    emailInput.value   = client.email;
    addressInput.value = client.address;

    editingIndex = idx;

  
    prenomInput.focus();
}


function clearForm() {
    prenomInput.value  = "";
    phoneInput.value   = "";
    emailInput.value   = "";
    addressInput.value = "";
    editingIndex = -1; 
}



afficher();