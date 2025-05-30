fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(product => {
      container.innerHTML += `
        <a href="product.html?id=${product.id}" style="text-decoration:none; color:inherit;">
          <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <span class="price">${product.price}</span>
          </div>
        </a>
      `;
    });
  });