document.addEventListener("DOMContentLoaded", function(){
    
    for(const prodCard of document.getElementsByClassName("card mb-4 shadow-sm custom-card cursor-active")){
        document.getElementById(prodCard.id).addEventListener("click", function() {
            localStorage.setItem("catID", prodCard.id);
            window.location = "products.html"
        });
    }
});