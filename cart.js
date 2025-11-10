document.addEventListener('DOMContentLoaded', function () {
    actualizarCarrito();
});

function actualizarCarrito() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cart-items');
    let totalElement = document.getElementById('total');
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-500">Tu carrito está vacío</p>';
        totalElement.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        cartContainer.innerHTML += `
            <div class="flex justify-between items-center border-b py-2">
                <span class="text-estudio-500">${item.name}</span>
                <span class="text-estudio-600">$${item.price.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})" class="text-red-500">❌</button>
            </div>`;
    });
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function eliminarDelCarrito(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    actualizarCarrito();
}

function generarFactura() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('El carrito está vacío. Agrega productos antes de pagar.');
        return;
    }
    
    let codigoCompra = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    let facturaContainer = document.getElementById('factura-container');
    facturaContainer.classList.remove('hidden');
    facturaContainer.innerHTML = `
        <h2 class="text-xl font-bold text-estudio-600">Factura</h2>
        <p class="text-estudio-500"><strong>Código:</strong> ${codigoCompra}</p>
        <ul class="list-disc ml-5 text-estudio-500">
            ${cart.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
        </ul>
        <p class="text-estudio-600"><strong>Total:</strong> $${total.toFixed(2)}</p>
        <div id="qr-code" class="mt-4"></div>
    `;
    
    new QRCode(document.getElementById('qr-code'), {
        text: `Código: ${codigoCompra}\nTotal: $${total.toFixed(2)}`,
        width: 128,
        height: 128
    });
    
    localStorage.removeItem('cart');
    actualizarCarrito();
}
    