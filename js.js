///// *************************************
// shopping cart  jquery
/////**************************************

$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).attr("data-name");
    var price = Number($(this).attr("data-price"));
    console.log("click add" + name + " " + price)

    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
});


$("#clear-cart").click(function (event) {
    shoppingCart.clearCart();
    displayCart();
});


function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
        output += "<li>" +
            cartArray[i].name
            ////
            +
            "<input class='item-count' type='number' data-name='" + cartArray[i].name +
            "'value='" + cartArray[i].count + "'>"
            ////
            +
            " x " + cartArray[i].price +
            " = " + cartArray[i].total +
            " <button class='plus-item' data-name='" + cartArray[i].name + "'>+</button>" +
            " <button class='subtract-item' data-name='" +
            cartArray[i].name + "'>-</button>" +
            "<button class='delete-item' data-name='" +
            cartArray[i].name + "'>X</button>" +
            "</li>"
    }
    $("#show-cart").html(output);
    $("#count-cart").html(shoppingCart.countCart());
    $("#total-cart").html(shoppingCart.totalCart());
}
$("#show-cart").on("click", ".delete-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
})
$("#show-cart").on("click", ".subtract-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
});
$("#show-cart").on("click", ".plus-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.addItemToCart(name, 0, 1);
    displayCart();
});

////
$("#show-cart").on("change", ".item-count", function (event) {
    var name = $(this).attr("data-name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
});
////
///// *************************************
// END shopping cart  jquery
/////**************************************
//=========================================//
///// *************************************
// START shopping cart  functions
/////**************************************

var shoppingCart = {};

///// START====== cart
shoppingCart.cart = [];
shoppingCart.Item = function (name, price, count) {
    this.name = name
    this.price = price
    this.count = count
};
///// END======  cart
//=================================//
///// START====== add item to cart
shoppingCart.addItemToCart = function (name, price, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count += count;
            this.saveCart();
            return;
        }
    }
    // console.log("item add ",name ,price,count)

    this.item = new this.Item(name, price, count);
    this.cart.push(this.item);
    this.saveCart();
};
////
shoppingCart.setCountForItem = function (name, count) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count = count;
            break;
        }
    }
    this.saveCart();
};
////
///// END====== add item to cart
//=================================//
///// START====== remove item to cart
shoppingCart.removeItemFromCart = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart[i].count--;
            if (this.cart[i].count === 0) {
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
};
///// END====== remove item to cart
//===============================//
///// START====== add all item to cart
shoppingCart.removeItemFromCartAll = function (name) {
    for (var i in this.cart) {
        if (this.cart[i].name === name) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
};
///// END====== add all item to cart
//===================================//
///// START====== clear the full cart
shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
};
///// END====== clear the full cart
//===================================//
///// START====== count cart
shoppingCart.countCart = function () {
    var totalCount = 0;
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount;
};
///// END====== count cart
//===================================//
///// START====== total cart
shoppingCart.totalCart = function () {
    var totalCost = 0;
    for (var i in this.cart) {
        totalCost += this.cart[i].price * this.cart[i].count;
    }
    return totalCost.toFixed(2);
};
///// END====== total cart
//===================================//
///// START====== list of cart
shoppingCart.listCart = function () {
    var cartCopy = [];
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};
///// END====== list of cart
//===================================//
///// START====== save cart
shoppingCart.saveCart = function () {
    localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
};
///// END====== save cart
//===================================//
///// START====== load cart
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
};
shoppingCart.loadCart()
displayCart();
///// END====== load cart

///// *************************************
// END shopping cart  functions
/////**************************************


// console.log("shopping cart: cart")
// console.log(shoppingCart.cart)
// console.log("global cart: cart")
// console.log(this.cart)


















































// ///// *************************************
// // shopping cart  jquery
// /////******************************

// $(".add-to-cart").click(function(event){
//     event.preventDefault();
//     var name = $(this).attr("data-name");
//     var price = Number ($(this).attr("data-price"));
//         addItemToCart(name, price ,1);
//         displayCart();
//     });


// $("#clear-cart").click(function(event){
//     clearCart();
//     displayCart();
// });


//     function displayCart(){
//         var cartArray = listCart();
//         var output = "";
//         for (var i in cartArray){
//             output += "<li>"
//             +cartArray[i].name
//             +" "+cartArray[i].count
//             +" x "+cartArray[i].price
//             +" = "+cartArray[i].total
//             +" <button class='plus-item' data-name='"+cartArray[i].name+"'>+</button>"
//             +" <button class='subtract-item' data-name='"
//             +cartArray[i].name+"'>-</button>"
//             +"<button class='delete-item' data-name='"
//             +cartArray[i].name+"'>X</button>"
//             +"</li>"
//         }
//         $("#show-cart").html(output);
//         $("#total-cart").html( totalCart() );
//     }
//         $("#show-cart").on("click",".delete-item",function(event){
//             var name = $(this).attr("data-name");
//             removeItemFromCartAll(name);
//             displayCart();
//         })
//         $("#show-cart").on("click",".subtract-item", function(event){
//             var name = $(this).attr("data-name");
//             removeItemFromCart(name);
//             displayCart();
//         });
//         $("#show-cart").on("click",".plus-item",function(event){
//             var name = $(this).attr("data-name");
//             addItemToCart(name, 0, 1);
//             displayCart();
//         });




// ///// *************************************
// // END shopping cart  jquery
// /////******************************


// var shoppingCart = {};
// shoppingCart.cart = []


// var cart = [];
// var Item = function(name, price , count){

//     this.name = name
//     this.price = price
//     this.count = count
// };

// function addItemToCart(name, price, count){
//     for (var i in cart){
//         if(cart[i].name === name){
//             cart[i].count += count;
//             saveCart();
//             return;
//         }
//     }
//     var item = new Item (name, price, count);
//     cart.push(item);
//     saveCart();
// }

// //END == add item to cart

// function removeItemFromCart(name){
//     for (var i in cart){
//         if(cart[i].name === name){
//             cart[i].count --;
//             if(cart[i].count === 0){
//                 cart.splice(i,1);
//             }
//             break;
//         }
//     }
//     saveCart();
// }

// //END == remove item to cart

// function removeItemFromCartAll(name){
//     for(var i in cart){
//         if (cart[i].name === name){
//             cart.splice(i,1);
//             break;
//         }
//     }
//     saveCart();
// }

// //END == remove item to cart all

// function clearCart(){
//     cart = [];
//     saveCart();
// }

// //END == clear full cart

// function countCart(){
//     var totalCount = 0;
//     for (var i in cart){
//         totalCount += cart[i].count;
//     }
//     return totalCount;
// }

// //END == count all cart

// function totalCart(){
//     var totalCost = 0;
//     for (var i in cart){
//         totalCost += cart[i].price * cart[i].count;
//     }
//     return totalCost.toFixed(2);
// }

// //END == total cart

// function listCart(){
//     var cartCopy = [];
//     for (var i in cart){
//         var item = cart[i];
//         var itemCopy = {};
//         for (var p in item){
//             itemCopy[p] = item[p];
//         }
//         itemCopy.total = (item.price * item.count).toFixed(2);
//         cartCopy.push(itemCopy);
//     }
//     return cartCopy;
// }

// //END == list cart

// function saveCart(){
//     localStorage.setItem("shoppingCart", JSON.stringify(cart));
// }

// // END save cart

// function loadCart(){
//     cart = JSON.parse(localStorage.getItem("shoppingCart"));
// }
// loadCart()
// displayCart();