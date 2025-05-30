fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-contents');
    if (cart.length === 0) {
      container.innerHTML = '<p>Coșul este gol.</p>';
      return;
    }
    let html = '<ul>';
    let total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      if (product) {
        const price = parseInt(product.price);
        total += price * item.qty;
        html += `<li>${product.title} x ${item.qty} - ${product.price}</li>`;
      }
    });
    html += `</ul><p>Total: ${total} RON</p>`;
    container.innerHTML = html;
  });