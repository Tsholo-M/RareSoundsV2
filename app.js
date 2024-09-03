const instruments = {
    pianos: [
        { id: 1, name: "Vintage Grand Piano", price: 5000.00 },
        { id: 2, name: "Classic Upright Piano", price: 3000.00 }
    ],
    wind: [
        { id: 3, name: "Retro Saxophone", price: 1500.00 },
        { id: 4, name: "Antique Clarinet", price: 1200.00 }
    ],
    strings: [
        { id: 5, name: "Vintage Violin", price: 2000.00 },
        { id: 6, name: "Classic Guitar", price: 2500.00 }
    ],
    percussion: [
        { id: 7, name: "Antique Drum Set", price: 4000.00 },
        { id: 8, name: "Retro Bongos", price: 1000.00 }
    ]
};

let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from localStorage if available

// Display instruments based on category
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

if (category) {
    const instrumentsList = document.getElementById('instrumentsList');
    const categoryTitle = document.getElementById('categoryTitle');

    // Set the category title
    categoryTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Instruments`;

    // Iterate over the instruments in the selected category
    instruments[category].forEach(instrument => {
        const article = document.createElement('article');
        article.classList.add('instrument-card');

        article.innerHTML = `
            <img src="images/${category}/${instrument.id}.jpg" alt="${instrument.name}" class="instrument-image">
            <h3>${instrument.name}</h3>
            <p class="instrument-price">Price: R${instrument.price.toFixed(2)}</p>
            <button class="add-to-cart" onclick="addToCart(${instrument.id}, '${category}')">Add to Cart</button>
        `;
        instrumentsList.appendChild(article);
    });
}

// Add item to cart
function addToCart(id, category) {
    const instrument = instruments[category].find(item => item.id === id);
    cart.push(instrument);
    updateCart();
    saveCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span>${item.name} - R${item.price.toFixed(2)}</span>
            <button class="remove-from-cart" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout function
function checkout() {
    saveCart();  // Ensure cart is saved before checkout
    window.location.href = 'cart.html';
}

// Load cart on checkout page
if (window.location.pathname.endsWith('cart.html')) {
    if (cart.length > 0) {
        updateOrderSummary();
    }

    function updateOrderSummary() {
        const orderSummary = document.getElementById('orderSummary');
        const orderTotal = document.getElementById('orderTotal');
        orderSummary.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            const li = document.createElement('li');
            li.textContent = `${item.name} - R${item.price.toFixed(2)}`;
            orderSummary.appendChild(li);
        });

        orderTotal.textContent = total.toFixed(2);
    }

    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.removeItem('cart');
        alert('Thank you for your purchase!');
        window.location.href = 'index.html';
    });
}

// Initial cart display update on page load
updateCart();
