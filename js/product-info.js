document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("prodID") + ".json").then(function(resultObj){
        if (resultObj.status === "ok")
        {
            prod = resultObj.data;
            showProductsInfo(prod);
            showProductsComm()
        }
    });
});


function showProductsInfo(product){


        document.getElementById("prod-info-container").innerHTML = `
        <h1>` + product.name + `</h1>
        <hr class="solid">
        <h4>Precio</h4>
        <p>` + product.currency + " " +  product.cost +  `</p>
        <h4>Descripción</h4>
        <p>` + product.description+ `</p>
        <h4>Categoría</h4>
        <p>` + product.category + `</p>
        <h4>Cantidad de vendidos</h4>
        <p>` + product.soldCount + `</p>
        <h4>Imágenes ilustrativas</h4>
        <div class="row-container" id="img"></div>
        `

        for(imagen of product.images){
            document.getElementById("img").innerHTML += `<img src="` + imagen + `" alt="product image" class="img-thumbnail"></img>`
        }
    };


function showProductsComm(){
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("prodID") + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
                commsArray = resultObj.data

                for(const comment of commsArray){            
                    showComment(comment.user, comment.dateTime, comment.score, comment.description)};
            
        }})}


function showStars(starsNum){
    let stars =""

    for(let i=0; i < 5; i++){
        starsNum > i ? stars += '<span class="fa fa-star checked"></span>' : stars += '<span class="fa fa-star"></span>'}

    return stars
    }


function showComment(user, date, stars, description){
    let htmlContentToAppend = ""
    
    htmlContentToAppend += `
    <div class="list-group-item list-group-item-action">
        <div class="row">  
            <div> `+ user +` - `+ date +` - `+ showStars(stars) +`</div>
            <div>`+ description +`</div>          
        </div>
        </div>
    </div>
    `
    document.getElementById("prod-comms-container").innerHTML += htmlContentToAppend
}


function showUserComm(){
    date = new Date();
    const formattedDate = date.toLocaleString().replace(",", " ").replace("/", "-").replace("/", "-")

    showComment(localStorage.getItem("userEmail"), formattedDate , document.getElementById("commStars").value,  document.getElementById("commDesc").value)
}
