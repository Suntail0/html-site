document.addEventListener('DOMContentLoaded', function () {
      const cartContents = JSON.parse(localStorage.getItem('cart')) || [];
      const checkoutContainer = document.querySelector('.checkout-container');
      const cartContentsDiv = document.querySelector('#cart-contents');
      const totalPriceElement = document.querySelector('#total-price');
      const discountDiv = document.querySelector('#discount-item');
      const discountMessage = document.querySelector('.discount-message');
      let totalPrice = 0;
      let discount = 0;

      // Render cart items
      cartContents.forEach(item => {
        // Validate item and price
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
        totalPrice += item.price;
      });

      // Update total price
      totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} RON`;

      // Hide "Finalizează Comanda" button if cart is empty
      if (cartContents.length === 0) {
        checkoutContainer.style.display = 'none';
      }

      // Handle coupon code
      document.querySelector('#apply-coupon').addEventListener('click', function () {
        const couponInput = document.querySelector('#coupon-code').value.trim();

        if (couponInput === 'FRAMIPO3') { // Example coupon code
          discount = totalPrice * 0.15; // Calculate 15% discount
          discountMessage.textContent = 'Felicitări! Ai primit o reducere de 15%.';
          discountMessage.style.color = 'green';

          // Display discount as a negative price item
          discountDiv.innerHTML = `
            <span>Reducere (FRAMIPO3)</span>
            <span>-${discount.toFixed(2)} RON</span>
          `;
          discountDiv.style.display = 'flex';

          // Update total price with discount
          totalPriceElement.textContent = `Total: ${(totalPrice - discount).toFixed(2)} RON`;
        } else {
          discountMessage.textContent = 'Codul de reducere este invalid.';
          discountMessage.style.color = 'red';

          // Hide discount item
          discountDiv.style.display = 'none';

          // Reset total price
          totalPriceElement.textContent = `Total: ${totalPrice.toFixed(2)} RON`;
        }
      });
    });