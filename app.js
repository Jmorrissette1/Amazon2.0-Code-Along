

function getItems(){
    db.collection("items").get().then((querySnapshot) => {
         let items =[];
          querySnapshot.forEach((doc) => {
          items.push({
              id: doc.id,
              image: doc.data().image,
              productName: doc.data().productName,
              productMake : doc.data().productMake,
              rating: doc.data().rating,
              price: doc.data().price
          })
        
        });
        generateItems(items);
      
    });
 
  
}
function addToCart(item){
    let cartItem = db.collection("cart-items").doc(item.id);
    cartItem.get()
    .then(function(doc){
        if(doc.exists){
            cartItem.update({
                qauntity: doc.data().qauntity + 1
            })
        } else{
           cartItem.set({
                image: item.image,
                productMake: item.productMake,
                productName: item.productName,
                rating: item.rating,
                price: item.price,
                qauntity: 1
            })
        }
    })
  
    
}


function generateItems(items){
   
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-7");
        doc.innerHTML= `
        <div class="product-image w-48 h-42 bg-white">
            <img class="w-full h-full object-contain p-4" src="${item.image}" alt="Pins">
        </div>
        <div class="product-name text-black font-bold mt-2 text-sm">${item.productName}</div>
        <div class="product-make">${item.productMake}</div>
        <div class="product-rating my-1 text-black">⭐⭐⭐⭐⭐ ${item.rating}</div>
        <div class="product-price text-lg font-bold">${item.price}</div>
        
        `
      
       let addToCartEl = document.createElement("div");
       addToCartEl.classList.add("add-to-cart-btn");
       addToCartEl.innerText ="add to cart";
       addToCartEl.addEventListener("click", function(){
           addToCart(item);
       });
       doc.appendChild(addToCartEl);
       document.querySelector(".main-section-products").appendChild(doc);
    });
    
   
}

getItems();