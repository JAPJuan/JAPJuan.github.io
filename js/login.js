document.addEventListener("DOMContentLoaded", init)

function init(){
    document.getElementById("ingresar").addEventListener("click", validate);
    gapi.load('auth2', function() {
        /* Ready. Make a call to gapi.auth2.init or some other API */
      });
    
}

function send(email){    
  localStorage.setItem('userEmail', email);
  window.location.href = "home.html";

}


function validate(){
    let valid = true
    
    for(inpt of document.getElementsByClassName("form-control")){
        if(inpt.value == ""){
            valid = false
            inpt.classList.add("is-invalid")
        }
    }

    if(valid){send(document.getElementById("email").value)}
}

function onSignIn(googleUser) {
    console.log(googleUser)
    var profile = googleUser.getBasicProfile();

    send(profile.getEmail())

  }

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


