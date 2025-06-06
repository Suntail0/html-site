document.addEventListener('DOMContentLoaded', function () {
  const cartContents = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContentsDiv = document.querySelector('#cart-contents');
  const totalPriceElement = document.querySelector('#total-price');
  const discountDiv = document.querySelector('#discount-item');
  const discountMessage = document.querySelector('.discount-message');
  let subtotal = 0; // Subtotal before applying the coupon
  let discount = 0; // Discount amount
  let total = 0; // Total after applying the coupon

  // Render cart items
  cartContents.forEach(item => {
    if (!item || typeof item.price !== 'number') {
      console.error('Invalid item or price:', item);
      return; // Skip invalid items
    }

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price.toFixed(2)} RON</span>
    `;
    cartContentsDiv.appendChild(itemDiv);
    subtotal += item.price; // Calculate subtotal
  });

  // Update total price (initially same as subtotal)
  totalPriceElement.textContent = `Total: ${subtotal.toFixed(2)} RON`;

  // Handle coupon code
  document.querySelector('#apply-coupon').addEventListener('click', function () {
    const couponInput = document.querySelector('#coupon-code').value.trim();

    if (couponInput === 'FRAMIPO3') { // Example coupon code
      discount = subtotal * 0.15; // Calculate 15% discount
      total = subtotal - discount; // Calculate total after applying the coupon
      discountMessage.textContent = 'Felicitări! Ai primit o reducere de 15%.';
      discountMessage.style.color = 'green';

      // Display discount as a negative price item
      discountDiv.innerHTML = `
        <span>Reducere (FRAMIPO3)</span>
        <span>-${discount.toFixed(2)} RON</span>
      `;
      discountDiv.style.display = 'flex';

      // Update total price with discount
      totalPriceElement.textContent = `Total: ${total.toFixed(2)} RON`;
    } else {
      discountMessage.textContent = 'Codul de reducere este invalid.';
      discountMessage.style.color = 'red';

      // Hide discount item
      discountDiv.style.display = 'none';

      // Reset total price
      totalPriceElement.textContent = `Total: ${subtotal.toFixed(2)} RON`;
    }
  });
});