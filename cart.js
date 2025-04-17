const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

//const cart = []; // 0 items test case 

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be < - fixed
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (
    typeof discountRate != "number" || 
    isNaN(discountRate) || 
    discountRate >= 1 || // discount rate is >= 0 and < 1
    discountRate < 0
  ) {
    throw new Error("The discount rate is invalid.");
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate - added validation for discountRate
}

function generateReceipt(cartItems, total) {
  if (cartItems.length == 0 && total === 0) {
    return "The cart is empty."; // receipt for an empty cart (an edge case)
  }
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });
  if (
    typeof total != "number" || 
    isNaN(total) || 
    total < 0
  ) {
    throw new Error("The total price is invalid."); // if total is not valid
  }
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number - added validation for total
  return receipt;
}

// Debugging entry point
try{
  console.log("Starting shopping cart calculation...");
  const total = calculateTotal(cart);
  //const discountedTotal = applyDiscount(total, 0); // 0% discount
  //const discountedTotal = applyDiscount(total, 1); // 100% discount. we don't give out items for free so it's not a valid discount
  const discountedTotal = applyDiscount(total, 0.2); // 20% discount
  const receipt = generateReceipt(cart, discountedTotal);
  document.getElementById("total").textContent = `Total: $${discountedTotal}`;
  document.getElementById("receipt").textContent = receipt;
} catch(err) { // catching errors from the functions
  console.error(err.message);
  document.getElementById("error-message").textContent = "Oops! Something went wrong. " + err.message; // error message on the page
}

