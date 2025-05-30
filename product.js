function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

fetch('products.json')
  .then(response => response.json())
  .then(products => {
    const productId = getQueryParam('id');
    const product = products.find(p => p.id === productId);
    const container = document.getElementById('product-detail');
    if (!product) {
      container.innerHTML = '<p>Produsul nu a fost găsit.</p>';
      return;
    }
    container.innerHTML = `
      <div class="product-detail-container">
        <img src="${product.image}" alt="${product.title}" class="product-detail-image">
        <div class="product-detail-info">
          <h1>${product.title}</h1>
          <p class="short-desc">${product.description}</p>
          <div class="sizes">
            <strong>Mărimi disponibile:</strong>
            <ul>
              ${product.sizes.map(size => `<li>${size}</li>`).join('')}
            </ul>
          </div>
          <span class="price">${product.price}</span>
        </div>
      </div>
      <div class="product-full-desc">
        <h2>Descriere completă</h2>
        <p>${product.fullDescription}</p>
      </div>
    `;
  });