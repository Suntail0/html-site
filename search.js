function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || '';
}

fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const query = normalize(getQueryParam('query'));
    const results = products.filter(product =>
      normalize(product.title).includes(query) ||
      normalize(product.description).includes(query)
    );
    const container = document.getElementById('search-results');
    if (results.length === 0) {
      container.innerHTML = '<p>Nu am găsit produse pentru această căutare.</p>';
      return;
    }
    results.forEach(product => {
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