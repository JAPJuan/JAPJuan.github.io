let shippingCostPercentage = 0
let formIsCorrect = false
/**
 * On DOMContentLoaded checks for articles on the json file for the user of id 25801 and adds their ids to the string list item on localStorage, 
 * then checks for every product and if their id is on the string list it adds them to the cart with the function showProduct.
 */
document.addEventListener("DOMContentLoaded", function(e){

/*     getJSONData(CART_INFO_URL + "25801" + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            for(const article of resultObj.data.articles){
                addToCart(article.id)             
            }}
    }) */
    if(!(localStorage.getItem("cartProdsStr"))){localStorage.setItem("cartProdsStr", "")}

    getJSONData("https://japceibal.github.io/emercado-api/cats/cat.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            for(const category of resultObj.data){
                getJSONData(PRODUCTS_URL + category.id + ".json").then(function(resultObj){
                    if (resultObj.status === "ok"){
                        for(const product of resultObj.data.products){
                            if(localStorage.getItem("cartProdsStr").includes(product.id)){showProduct(product)}
                        }
            }})}}
    });
});

/**
 * Shows the products information and the controls for the amount desired on the cart.
 * @param {object} prodObj
 */
 function showProduct(prodObj){
    if(prodObj.currency == "UYU"){prodObj.cost = Math.round(prodObj.cost / 41.01)}
    
    document.getElementById("cart-prods").innerHTML += `
        <div class="row pt-1" id="${prodObj.id}">
          <div class="col-1 cursor-active" onclick="redirectToProdInfo(${prodObj.id})"><img src=${prodObj.image} alt="product image" class="w-75"></div>
          <div class="col-2 cursor-active" onclick="redirectToProdInfo(${prodObj.id})">${prodObj.name}</div>
          <div class="col-2">USD ${prodObj.cost}</div>
          <div class="col-2"><input class="form-control w-75" type="text" onkeyup="calcSubtotal(this,${prodObj.cost})" required><div class="invalid-feedback">Indica la cantidad deseada del producto</div></input></div>
          <div class="row col-2">USD <div class="col-6 gx-2">0</div></div>
          <div class="col-3"><i class="fa fa-trash cursor-active" onclick="removeItem(${prodObj.id})"></i></div>
        </div>
        `
    calcCosts();
}

/**
 * Calculates the subtotal for each product according to the number selected and modifies the subtotal value in real time.
 * @param {object} prodAmountForm 
 * @param {number} productCost 
 */
function calcSubtotal(prodAmountForm, productCost){   
    const subtotalDiv = prodAmountForm.closest(".row").querySelector(".col-6")
    
    if(
        prodAmountForm.value != 0){ subtotalDiv.innerHTML = prodAmountForm.value * productCost
    }else{
        subtotalDiv.innerHTML = 0
    }
    calcCosts()
}

/**
 * Takes a radio element with a number value, then stores it on shippingCostPercentage and calculates costs.
 * @param {object} radio 
 */
function shippTypeChecker(radio){
    shippingCostPercentage = radio.value
    calcCosts()
}

/**
 * Adds the total of the carts items subtotals, calculates the shipping costs and total costs and then shows them on their respective div.
 */
function calcCosts(){
    let totalSubtotal = 0
    let shippCosts = 0

    for(const subtotalDiv of document.querySelectorAll(".col-6.gx-2")){
        totalSubtotal += parseInt(subtotalDiv.textContent)
    }

    if(shippingCostPercentage){shippCosts = Math.round(totalSubtotal / 100 * shippingCostPercentage)}
    
    document.getElementById("totalSubtotal").innerHTML = "USD " + totalSubtotal
    document.getElementById("shippingCost").innerHTML = "USD " + shippCosts
    document.getElementById("totalCost").innerHTML = "USD " + (totalSubtotal + shippCosts)
}
    
/**
 * Deletes the given id off the localstorage string corresponding to the cart list and removes its element from the page.
 * @param {number} Id 
 */
function removeItem(Id){

    localStorage.setItem("cartProdsStr",localStorage.getItem("cartProdsStr").replace(Id, ""))
    document.getElementById(Id).remove()
    calcCosts()
}

function disableUncheckedForm(uncheckedForm,checkedForm){

    let formsToDisable = uncheckedForm.parentElement.querySelectorAll(".form-control")
    let formsToEnable = checkedForm.parentElement.querySelectorAll(".form-control")
    
    for(form of formsToDisable){form.setAttribute("disabled","")}
    for(form of formsToEnable){form.removeAttribute("disabled")}
    checkedForm.id === "payMethodRadio1" ? document.getElementById("payMethodSelected").innerHTML = "Tarjeta de crédito" : document.getElementById("payMethodSelected").innerHTML = "Transferencia bancaria"
}

function showModalValidity(){

    for(form of document.getElementById("payMethodModal").querySelectorAll("[required]")){
        if(!(form.checkValidity())){
            document.getElementById("modalToggler").classList.add("is-invalid")
            document.getElementById("payMethodSelected").classList.add("text-danger")
            return
        } else {
            document.getElementById("modalToggler").classList.remove("is-invalid")
            document.getElementById("payMethodSelected").classList.remove("text-danger")
        }
    }
}

function submitForm(){
    document.querySelector('.needs-validation').submit()
}

(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          } else { 
            event.preventDefault()
            event.stopPropagation()
            document.querySelector(".alert-success").removeAttribute("hidden")           
          }

          showModalValidity()
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  