// Collection of all 'addToCart' buttons
var count = document.getElementById("count");
var getProduct = document.querySelector(".cart table tbody");
var container = document.getElementsByClassName("container")[0];
var shoppingCart = document.getElementsByClassName("cart")[0];
var totals = document.getElementsByClassName("totals")[0];
var checkoutBtns = document.getElementsByClassName("checkout")[0];
var applyCode = checkoutBtns.children[0].children[1].children[0];
var coupon = checkoutBtns.children[0].children[0].children[0];
var subTotal = totals.children[1].children[0];
var discount = totals.children[1].children[1];
var total = totals.children[1].children[2];

var register = {
  count: 0,
  subTotal: 0, 
  discount: null, 
  promoCode: {BIGSALE: 10},
  total: function() {
    var net;
    if (this.discount) {
      net = this.subTotal - (this.subTotal * (this.discount / 100));
    } else {
      net = this.subTotal;
    }
    return net;
  }
};

container.addEventListener("click", function(e) {
  if (e.target && e.target.value == "add to cart") {
    // show shopping cart
    /*
    shoppingCart.style.display = "flex";
    totals.style.display = "flex";
    checkoutBtns.style.display = "flex";
    */
    
    shoppingCart.className = "row cart show";
    totals.className = "row totals show";
    checkoutBtns.className = "row checkout show";
    
    // build tr element for shopping cart and add product
    var parental = e.target.parentNode.childNodes;
    var imgUrl = parental[1].src;
    var shoeName = parental[3].textContent;
    var color = parental[5].textContent;
    var cost = parental[9].textContent;
    
    var tr = document.createElement("tr");
    
    var item = document.createElement("td"); // append to cart
    var img = document.createElement("img");
    img.src = imgUrl;
    item.appendChild(img);
    
    var description = document.createElement("td"); // append to cart
    var p1 = document.createElement("p");
    var p2 = document.createElement("p");
    var p1Text = document.createTextNode(shoeName);
    var p2Text = document.createTextNode(color);
    p1.appendChild(p1Text);
    p2.appendChild(p2Text);
    description.appendChild(p1);
    description.appendChild(p2);
    
    var price = document.createElement("td"); // append to cart
    var priceParaEl = document.createElement("p");
    var costTextNode = document.createTextNode(cost);
    priceParaEl.appendChild(costTextNode);
    price.appendChild(priceParaEl);
    
    var quantity = document.createElement("td"); // append to cart
    var quantityEl = document.createElement("input");
    quantityEl.type = "text";
    quantityEl.value = 1;
    quantity.appendChild(quantityEl);
    
    var delItem = document.createElement("td"); // add to cart
    var delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delItem.appendChild(delBtn);
    
    var cart = document.querySelector(".cart table tbody"); // cart
    
    tr.appendChild(item);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(quantity);
    tr.appendChild(delItem);
    
    cart.appendChild(tr);
    
    register.subTotal += +cost.replace("$", "");
    subTotal.innerText = "$" + register.subTotal;
    total.innerText = "$" + register.total();
    
    register.count += 1;
    count.innerText = register.count;
  }
  
  if (e.target && e.target.text == "cart") {
    // problem area
    
    if (!shoppingCart.className.includes("show")) {
      shoppingCart.className = "row cart show"; 
      totals.className = "row totals show";
      checkoutBtns.className = "row checkout show";
    } else if (!shoppingCart.className.includes("dontShow")) {
      shoppingCart.className = "row cart dontShow";
      totals.className = "row totals dontShow";
      checkoutBtns.className = "row checkout dontShow";
    }
    
    console.log("Event listener works at least..") 
    
  }
});

getProduct.addEventListener("click", function(e) {
  if (e.target && e.target.nodeName == "BUTTON") {
    var sneakerInCart = e.target.parentNode.parentNode;
    var cost = sneakerInCart.childNodes[2].childNodes[0].textContent;
    //console.log(sneakerInCart.childNodes[3].children[0].value);
    register.subTotal -= +cost.replace("$", "");
    subTotal.innerText = "$" + register.subTotal;
    total.innerText = "$" + register.total();
    this.removeChild(sneakerInCart);
    
    register.count -= 1;
    count.innerText = register.count;
    
    if (this.childNodes.length < 1) {
      /*
      shoppingCart.style.display = "none";
      totals.style.display = "none";
      checkoutBtns.style.display = "none";
      */
      register.discount = null;
      discount.innerText = "$0";
      
      shoppingCart.className = "row cart dontShow";
      totals.className = "row totals dontShow";
      checkoutBtns.className = "row checkout dontShow";
    }
  }
});

applyCode.addEventListener("click", function(e) {
  if (e.target && e.target.id == "applyCode") {
    var code = coupon.value.toUpperCase();
    if (register.promoCode[code]) {
      register.discount = register.promoCode[code];
      discount.innerText = "- " + register.discount + "%";
      total.innerText = "$" + register.total();
    }
  }
});
