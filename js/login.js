document.addEventListener("DOMContentLoaded", init)

function init(){
    document.getElementById("ingresar").addEventListener("click", send);
}

function validate(){
    let valid = true
    localStorage.setItem('userEmail',document.getElementById("email").value );
    
    for(inpt of document.getElementsByClassName("form-control")){
        if(inpt.value == ""){
            valid = false
            inpt.classList.add("is-invalid")
        }
    }

    return valid   
}

function send(ev){
    ev.preventDefault()

    if (validate()){
        console.log(document.getElementById("email").value)
        window.location.href = "home.html";
    }
}