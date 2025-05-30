fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products
      .filter(product => product.category !== 'women' && product.category !== 'men')
      .forEach(product => {
        container.innerHTML += `
          <div class="product-card">
            <a href="product.html?id=${product.id}" style="text-decoration:none; color:inherit;">
              <img src="${product.image}" alt="${product.title}">
              <h3>${product.title}</h3>
              <p>${product.description}</p>
              <span class="price">${product.price}</span>
            </a>
            <button class="add-to-cart-btn" data-id="${product.id}">Adaugă în coș</button>
          </div>
        `;
      });
  });

// Add this cart logic (or put it in cart.js and include it in index.html)
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = e.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: productId, qty: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produsul a fost adăugat în coș!');
  }
});