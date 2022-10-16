/**
 * On DomcontentLoaded checks for articles on the json file for the user of id 25801 and adds their ids to the string list item on localStorage, 
 * then checks for every product and if their id is on the string list it adds them to the cart with the function showProduct.
 */
document.addEventListener("DOMContentLoaded", function(e){
    localStorage.getItem("cartProdsStr") ? null : localStorage.setItem("cartProdsStr", "")    

    getJSONData(CART_INFO_URL + "25801" + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            for(const article of resultObj.data.articles){
                localStorage.setItem("cartProdsStr", localStorage.getItem("cartProdsStr") + " " + article.id)                
            }
        }
    })
    
    getJSONData("https://japceibal.github.io/emercado-api/cats/cat.json").then(function(resultObj){
        if (resultObj.status === "ok"){
            let categoryIds = []
            
            for(const category of resultObj.data){                
                categoryIds.push(category.id)
            }

            for(const category of categoryIds){
                getJSONData(PRODUCTS_URL + category + ".json").then(function(resultObj){
                    if (resultObj.status === "ok"){
                        for(const product of resultObj.data.products){
                            localStorage.getItem("cartProdsStr").includes(product.id) ? showProduct(product) : null
                        }
            }})}
        }
    });

});

/**
 * Shows the products information and the controls for the amount desired on the cart.
 * @param {object} prodObj
 */
 function showProduct(prodObj){
    let htmlContentToAppend = "";


    htmlContentToAppend += `
        <div class="row pt-1" id="` + prodObj.id + `">
          <div class="col-1"><img src=` + prodObj.image + ` alt="product image" class="w-75"></div>
          <div class="col-2">` + prodObj.name + `</div>
          <div class="col-2">` + prodObj.currency + ` ` + prodObj.cost + `</div>
          <div class="col-2"><input class="form-control w-75" id="prodAmount" placeholder="1" onkeyup="calcSubtotal(this,` + prodObj.cost + `)"></input></div>
          <div class="row col-2">` + prodObj.currency + ` <div class="col-6" id="` + prodObj.id + `Subtotal">` + prodObj.cost + `</div></div>
        </div>
        `
    document.getElementById("cart-prods").innerHTML += htmlContentToAppend;

}

/**
 * Calculates the subtotal for each product according to the number selected and modifies the subtotal value in real time.
 * @param {object} prodAmountForm 
 * @param {number} productCost 
 */
function calcSubtotal(prodAmountForm, productCost){
    const subtotalDiv = document.getElementById(prodAmountForm.parentElement.parentElement.id + "Subtotal")

    if(prodAmountForm.value != 0){ subtotalDiv.innerHTML = prodAmountForm.value * productCost} else{
        subtotalDiv.innerHTML = productCost
    }
    
}
