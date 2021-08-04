function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot)=>{
        let cartItems = [];
        snapshot.docs.forEach((doc)=>{
            cartItems.push({
                id: doc.id,
                ...doc.data()
            })
        })
        generateCartItems(cartItems);
        getTotalCost(cartItems);
    })
    
}

function getTotalCost(items){
    let totalCost = 0;
    items.forEach((item) =>{
        totalCost += (item.price * item.qauntity);
    })
    document.querySelector(".total-cost-number").innerText = totalCost;
}

function decreaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if (doc.exists){
            if(doc.data().qauntity > 1){
                cartItem.update({
                    qauntity: doc.data().qauntity -1
                })
            }
        }
    })
}

function increaseCount(itemId){
    let cartItem = db.collection("cart-items").doc(itemId);
    cartItem.get().then(function(doc){
        if (doc.exists){
            if(doc.data().qauntity > 0){
                cartItem.update({
                    qauntity: doc.data().qauntity +1
                })
            }
        }
    })
}

function deleteItem(itemId){
    db.collection("cart-items").doc(itemId).delete();
}


function generateCartItems(cartItems){
    let itemsHTML = "";
    cartItems.forEach((item) =>{
        itemsHTML += `
        <div class="cart-item flex items-center border-b">
        <div>
            <img src="${item.image}" class="w-40 h-25 p-4 mt-5 rounded-lg ">
        </div>
        <div class="cart-item-details flex-grow">
            <div class="text-white font-bold cart-product-name"> ${item.productName} </div>
            <div class="cart-product-make font-bold"> ${item.productMake} </div>
        </div>
        <div class="cart-item-counter w-48 flex items-center">
            <div
                 data-id="${item.id}" class="chevron-left cart-item-decrease  cursor-pointer h-6 w-6 flex justfiy-center items-center  mr-2">
                <i class="fas fa-chevron-left "></i>
            </div>
            <h4 class="text-white qty ">${item.qauntity}</h4>
            <div
               data-id="${item.id}" class="chevron-right cart-item-increase cursor-pointer h-6 w-6 flex justfiy-center items-center   ml-2">
                <i class="fas fa-chevron-right cursor-pointer"></i>
            </div>
        </div>
        <div class="item-total-cost w-48 font-bold text-white">
            ${item.price * item.qauntity}
        </div>
        <div data-id="${item.id}" class=" item-card-delete w-10 font-bold cursor-pointer">
            <i class="fas fa-times cancel-item"></i>
        </div>
    </div>  `
   
    })
    document.querySelector(".cart-item").innerHTML = itemsHTML;
    createEventListeners();
}

function createEventListeners(){
    let decreaseButton = document.querySelectorAll(".cart-item-decrease");
    let increaseButton = document.querySelectorAll(".cart-item-increase");
    let deleteButton = document.querySelectorAll(".item-card-delete");

    
    decreaseButton.forEach((button) => { 
      button.addEventListener("click", function(){
        decreaseCount(button.dataset.id);
      })
    
    })

    increaseButton.forEach((button) => { 
        button.addEventListener("click", function(){
          increaseCount(button.dataset.id);
        })
      
      })
    
    deleteButton.forEach((button) =>{
        button.addEventListener("click", function(){
            deleteItem(button.dataset.id);
        })
    })
}

getCartItems();