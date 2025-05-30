function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  // Check if product already in cart
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Produsul a fost adăugat în coș!');
}

// Listen for add-to-cart button clicks
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-to-cart-btn')) {
    const productId = e.target.getAttribute('data-id');
    addToCart(productId);
  }
});