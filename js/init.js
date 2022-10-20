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
  document.getElementById("navEmail").innerHTML +=  localStorage.getItem("userEmail");
  });

/**
 * Sets the localStorage item that stores the ID of the product whose information we want to see to the given ID, then redirects to the product information page.
 * @param {number} productID 
 */
 function redirectToProdInfo(productID){
  localStorage.setItem("prodID", productID);
  window.location = "product-info.html"
}

/**
 * Sets the localStorage item that stores the ID of the category whose information we want to see to the given ID, then redirects to the category display page.
 * @param {number} productID 
 */
 function redirectToCatInfo(categoryID){
  localStorage.setItem("catID", categoryID);
  window.location = "products.html"
}