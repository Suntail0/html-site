fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-contents');
    if (cart.length === 0) {
      container.innerHTML = '<p>Coșul este gol.</p>';
      return;
    }
    let total = 0;
    let html = `
      <table class="cart-table">
        <thead>
          <tr>
            <th>Produs</th>
            <th>Pret</th>
            <th>Cantitate</th>
            <th>Total</th>
            <th>Acțiuni</th>
          </tr>
        </thead>
        <tbody>
    `;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const price = parseInt(product.price);
        const itemTotal = price * item.qty;
        total += itemTotal;
        html += `
          <tr>
            <td>
              <img src="${product.image}" alt="${product.title}" class="cart-thumb">
              <span>${product.title}</span>
            </td>
            <td>${product.price}</td>
            <td>
              <button class="qty-btn" data-id="${item.id}" data-action="decrease">-</button>
              <span class="cart-qty">${item.qty}</span>
              <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
            </td>
            <td>${itemTotal} RON</td>
            <td>
              <button class="remove-btn" data-id="${item.id}">Șterge</button>
            </td>
          </tr>
        `;
      }
    });
    html += `
        </tbody>
      </table>
      <div class="cart-total">Total: <strong>${total} RON</strong></div>
    `;
    container.innerHTML = html;
  });

// Handle remove and quantity change
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-btn')) {
    const id = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
  }
  if (e.target.classList.contains('qty-btn')) {
    const id = e.target.getAttribute('data-id');
    const action = e.target.getAttribute('data-action');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === id);
    if (item) {
      if (action === 'increase') item.qty += 1;
      if (action === 'decrease' && item.qty > 1) item.qty -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      location.reload();
    }
  }
});