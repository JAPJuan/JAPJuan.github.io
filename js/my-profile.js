let user = {};
let imagen = ""

document.addEventListener("DOMContentLoaded", function(e){
  
  if(localStorage.getItem("userInfo")){
    user = JSON.parse(localStorage.getItem("userInfo"))
  }
  
  for(property of Object.entries(user)){
    if(property[0] !== profilePicture){
      document.getElementById(property[0]).value = property[1]
    }}

  if(user.profilePicture !== "" && user.profilePicture){document.getElementById("profilePicture").src = user.profilePicture}
});

(function () {
  'use strict'
  const formToValidate = document.querySelector('.needs-validation')
  
  formToValidate.addEventListener('submit', function (event){  
  
  if (!formToValidate.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  } else {     
    event.preventDefault()
    event.stopPropagation()            
      
    for(const inpt of document.querySelectorAll("[type='text']")){
      user[inpt.id] = inpt.value
    } 
      
    user.profilePicture = imagen
    if(user.profilePicture){document.getElementById("profilePicture").src = user.profilePicture}
    localStorage.setItem("userInfo", JSON.stringify(user)) 
  }
  
  formToValidate.classList.add('was-validated')
  }, false)    
})()

function profilePictureHandle(){
  const reader = new FileReader();
  
  reader.addEventListener("load",() => {  
    imagen = reader.result
    document.getElementById("profilePicture").src = imagen  
  }, true);
  
  reader.readAsDataURL(document.getElementById("profilePictureInput").files[0]);
}


