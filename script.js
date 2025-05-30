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
