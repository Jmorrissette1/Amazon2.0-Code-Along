function getCartItems(){
    db.collection("cart-items").onSnapshot((snapshot) => {
       let totalCount = 0;
        snapshot.forEach((doc)=>{
            totalCount += doc.data().qauntity;
        })
        setCartCounter(totalCount);
        console.log(totalCount);
    })
}

function setCartCounter(totalCount){
    //cart-item-number
    document.querySelector(".cart-item-number").innerText = totalCount;
}
getCartItems();