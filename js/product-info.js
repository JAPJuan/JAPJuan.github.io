let prod = []

/**
 * On DOMContentLoaded fetches the .json file indicated by the prodID localstorage item, then stores it on a variable and shows the product info,
 * shows the products commentaries and shows the related products with each respective function.
 */
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prod = resultObj.data;
            showProductsInfo(prod);
            showProductsComm()
            showProductsRelated(prod)
        }
    });
});

/**
 * Shows the products specific information: name, cost, description, category, number sold and images.
 * @param {object} product 
 */
function showProductsInfo(product){

        document.getElementById("prod-info-container").innerHTML += `
        <div class="row"><h1 class="col-7">${product.name}</h1><button class="btn col-1 btn-lg btn-primary" type="button" onclick="addToCart(${product.id})">Comprar</button></div>
        <hr class="solid">
        <h4>Precio</h4>
        <p>${product.currency + " " +  product.cost}</p>
        <h4>Descripción</h4>
        <p>${product.description}</p>
        <h4>Categoría</h4>
        <p>${product.category}</p>
        <h4>Cantidad de vendidos</h4>
        <p>${product.soldCount}</p>
        <h4 class="mb-4">Imágenes ilustrativas</h4>
        `

        for(let i = 0; i < product.images.length; i++){
            if(i === 0){
                document.getElementById("prodCarousel").innerHTML += `<div class="carousel-item active">
                <img src="${product.images[i]}" class="d-block w-100" alt="Product image">
                </div>`
            } else {
                document.getElementById("prodCarousel").innerHTML += `<div class="carousel-item">
                <img src="${product.images[i]}" class="d-block w-100" alt="Product image">
                </div>`

            }
        }
    };

/**
 * Shows the products related products thumbnails, and adds the click on the image to go to the product functionality.
 * @param {object} product 
 */   
function showProductsRelated(product){

    for(const relatedProd of product.relatedProducts){
        document.getElementById("relatedThumb").innerHTML += `
        <div class "col">
            <div class="card h-90 cursor-active" id="${relatedProd.id}" style="width: 15rem;" onclick="redirectToProdInfo(${relatedProd.id})">
                <img class="card-img-top" src="${relatedProd.image}" alt="Card image cap">
                <div class="card-footer">
                    <p>${relatedProd.name}</p>
                </div>
            </div>
        </div>`
    }
}

/**
 * Gets the JSON data for the comments of the current product and iterates through them with the showComment function.
 */
function showProductsComm(){
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
                commsArray = resultObj.data

                for(const comment of commsArray){            
                    showComment(comment.user, comment.dateTime, comment.score, comment.description)};
            
        }})}


/**
 * Returns the Bootstrap stars specified by the argument.
 * @param {Number} starsNum
 * @returns {String} Bootstrap stars specified by the argument.
 */
function showStars(starsNum){
    let stars =""

    for(let i=0; i < 5; i++){
        starsNum > i ? stars += '<span class="fa fa-star checked"></span>' : stars += '<span class="fa fa-star"></span>'}

    return stars
    }

/**
 * Shows a comment with the specified user, date, number of stars and description.
 * @param {string} user 
 * @param {number} date 
 * @param {number} stars 
 * @param {string} description 
 */
function showComment(user, date, stars, description){
    
    document.getElementById("prod-comms-container").innerHTML += `
    <div class="list-group-item list-group-item-action">
        <div class="row">  
            <div>${user +` - `+ date +` - `+ showStars(stars)}</div>
            <div>${description}</div>          
        </div>
        </div>
    </div>
    `
}

/**
 * Shows the users provided comment with its email, stars rating and current date.
 */
function showUserComm(){
    date = new Date();
    const formattedDate = date.toLocaleString().replace(",", " ").replace("/", "-").replace("/", "-")

    showComment(localStorage.getItem("userEmail"), formattedDate , document.getElementById("commStars").value,  document.getElementById("commDesc").value)
}

/**
 * Adds the given product id to the localstorage string list corresponding to the users cart.
 */
function addToCart(productID){

    if(!(localStorage.getItem("cartProdsStr"))){
        localStorage.setItem("cartProdsStr", "")}

    if(!(localStorage.getItem("cartProdsStr").includes(productID))){
        localStorage.setItem("cartProdsStr", localStorage.getItem("cartProdsStr") + " " + productID)}        
}