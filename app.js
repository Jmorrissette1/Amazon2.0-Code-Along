

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
        
          });
        });
       // generateItems(items);
        console.log(items);
    });
 
  
}


function generateItems(items){
    let itemsHTML ="";
    items.forEach((item) => {
        let doc = document.createElement("div");
        doc.classList.add("main-product", "mr-5");
      
        itemsHTML += ` <div class="main-product">
        <div class="product-image w-48 h-42 bg-white">
            <img class="w-full h-full object-contain p-4" src="${item.image}" alt="Pins">
        </div>
        <div class="product-name text-black font-bold mt-2 text-sm">${item.productName}/div>
        <div class="product-make">${item.productMake}</div>
        <div class="product-rating my-1 text-black">⭐⭐⭐⭐⭐ ${item.raiting}</div>
        <div class="product-price text-lg font-bold">${item.price}</div>
        <button class="add-to-cart-btn">add to cart</button>
        </div>  `
    });

    document.querySelector("main-section-products").innerHTML =itemsHTML;
}

getItems();