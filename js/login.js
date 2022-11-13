(function () {
  'use strict'
  let formToValidate = document.querySelector('.needs-validation')

      formToValidate.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        
        if (formToValidate.checkValidity()) {
          let user = {"email": document.getElementById("email").value}
          localStorage.setItem("userInfo", JSON.stringify(user));
          window.location = "home.html"
        }

        formToValidate.classList.add('was-validated')
      }, false)
    })
()
