const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
  let result = {};
  showSpinner();
  return fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }else{
      throw Error(response.statusText);
    }
  })
  .then(function(response) {
    result.status = 'ok';
    result.data = response;
    hideSpinner();
    return result;
  })
  .catch(function(error) {
    result.status = 'error';
    result.data = error;
    hideSpinner();
    return result;
  });
}



document.addEventListener("DOMContentLoaded", function(e){
  const navItem = document.getElementById("navbarNav")
  
  if(localStorage.getItem("userInfo")){
    
    navItem.innerHTML += `
    <div class="dropdown">
    <a class="nav-link dropdown-toggle" href="" data-bs-toggle="dropdown">` +  JSON.parse(localStorage.getItem("userInfo")).email + `</a>
    <ul class="dropdown-menu" aria-labelledby="navEmail">
    <li><a class="dropdown-item" href="my-profile.html">Mi perfil</a></li>
    <li><a class="dropdown-item" href="cart.html">Mi carrito</a></li>
    <li><a class="dropdown-item" onclick="logOut()">Cerrar sesión</a></li>
    </ul>
    </div>
    `
    navItem.previousElementSibling.removeAttribute("hidden", "")
    
  } else { 
    navItem.innerHTML += `<a class="nav-link" href="index.html">Iniciar sesión</a>`
    navItem.previousElementSibling.setAttribute("hidden", "")
  }
});

/**
* Sets the localStorage item that stores the ID of the product which information we want to see to the given ID, then redirects to the product information page.
* @param {number} productID 
*/
function redirectToProdInfo(productID){
  localStorage.setItem("prodID", productID);
  window.location = "product-info.html"
}

/**
* Sets the localStorage item that stores the ID of the category which information we want to see to the given ID, then redirects to the category display page.
* @param {number} categoryID 
*/
function redirectToCatInfo(categoryID){
  localStorage.setItem("catID", categoryID);
  window.location = "products.html"
}

/**
* Adds the given product id to the localstorage string list corresponding to the users cart.
*/
function addToCart(productID){
  if(enforceLogin()){ return }
  
  if(!(localStorage.getItem("cartProdsStr"))){
    localStorage.setItem("cartProdsStr", "")}
    
    if(!(localStorage.getItem("cartProdsStr").includes(productID))){
      localStorage.setItem("cartProdsStr", localStorage.getItem("cartProdsStr") + " " + productID)}        
    }
    
function enforceLogin(){
   if (!localStorage.getItem("userInfo")){
      window.location = "index.html"
        return true
      }
    }
    
function logOut(){
      if(localStorage.getItem("userInfo")){
        localStorage.removeItem("userInfo")
        window.location = "home.html"
      }
    }