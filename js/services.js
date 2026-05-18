let services = JSON.parse(localStorage.getItem("services")) || [];

let service_name = document.querySelector("#service_name");
let service_price = document.querySelector("#service_price");
let addbtn= document.querySelector(".addbtn")
let btndelete= document.querySelector(".update")


let txt = "";


let addservice = () => {
    
    let service = {

        name: service_name.value,
        price: service_price.value

    };

    services.push(service);

    localStorage.setItem("services",JSON.stringify(services));

    afficher();

    service_name.value = "";
    service_price.value = "";

};



function afficher(){
btndelete.style.display ="none"
    let tbody =document.querySelector("#table_services");

    txt = "";

    services.forEach(function(s, i){

        txt += `

        <tr>

            <td>${s.name}</td>

            <td>${s.price} DH</td>

            <td>

                <button class="edit-btn" onclick="toedit(${i})">
                    Edit
                </button>

                <button class="delete-btn"
                onclick="removeService(${i})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    tbody.innerHTML = txt;

}



function removeService(idx){

    services.splice(idx,1);

    localStorage.setItem("services",JSON.stringify(services));

    afficher();

}

function toedit(idx){
    btndelete.style.display ="inline"
    addbtn.style.display = "none"

    pos = idx

    service_name.value = services[idx].name;
    service_price.value = services[idx].price;

    localStorage.setItem("services",JSON.stringify(services));
}

function update(){
    btndelete.style.display ="none"
    addbtn.style.display = "inline"

    services[pos].name = service_name.value
    services[pos].price = service_price.value

    service_name.value =""
    service_price.value =""

    localStorage.setItem("services",JSON.stringify(services));
    afficher()
}

afficher();