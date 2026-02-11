document.addEventListener('DOMContentLoaded', () => {
    // State
    let products = [];
    let cart = JSON.parse(localStorage.getItem('shopMateCart')) || [];
    let filters = {
        category: 'All',
        price: 100000,
        rating: 0,
        search: ''
    };

    // DOM Elements
    const productGrid = document.getElementById('product-grid');
    const categoryList = document.getElementById('category-list');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortSelect = document.getElementById('sort-select');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById('product-modal');
    const closeModal = document.getElementById('close-product-modal');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutModal = document.getElementById('close-checkout-modal');
    const modalBody = document.getElementById('modal-body');
    const toast = document.getElementById('toast');
    const resultsCount = document.getElementById('results-count');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const cartBtn = document.querySelector('.cart-btn');
    const checkoutForm = document.getElementById('checkout-form');
    const cartSummary = document.getElementById('cart-summary');
    const checkoutTotal = document.getElementById('checkout-total');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Initialization
    updateCartIcon(); // Set initial count from local storage
    fetchProducts();

    // Event Listeners
    cartBtn.addEventListener('click', openCheckout);

    closeCheckoutModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            showToast("Cart is empty!");
            return;
        }
        // Simulate Order Placement
        showToast("Order Placed Successfully!");
        cart = [];
        saveCart();
        checkoutModal.style.display = 'none';
        checkoutForm.reset();
    });

    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    searchInput.addEventListener('input', (e) => {
        filters.search = e.target.value.toLowerCase();
        applyFilters();
    });

    priceRange.addEventListener('input', (e) => {
        filters.price = parseInt(e.target.value);
        priceValue.textContent = `₹${filters.price.toLocaleString()}`;
        applyFilters();
    });

    document.querySelectorAll('input[name="rating-filter"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filters.rating = parseInt(e.target.value);
            applyFilters();
        });
    });

    sortSelect.addEventListener('change', () => {
        applyFilters(); // Re-render with sort
    });

    clearFiltersBtn.addEventListener('click', resetFilters);

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
        if (e.target === checkoutModal) {
            checkoutModal.style.display = 'none';
        }
    });

    // Functions
    async function fetchProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) throw new Error('Network response was not ok');
            products = await response.json();
            setupCategories();
            applyFilters();
        } catch (error) {
            console.warn('Fetch failed (likely CORS), using fallback data:', error);
            // Fallback data for local file:// access
            products = [
                {
                    "id": 1,
                    "name": "Wireless Bluetooth Headphones",
                    "category": "Electronics",
                    "price": 2499,
                    "rating": 4.5,
                    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
                    "inStock": true,
                    "description": "High-quality wireless headphones with noise cancellation."
                },
                {
                    "id": 2,
                    "name": "Smart Watch Series 5",
                    "category": "Electronics",
                    "price": 4999,
                    "rating": 4.2,
                    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
                    "inStock": true,
                    "description": "Track your fitness and stay connected with this smart watch."
                },
                {
                    "id": 3,
                    "name": "Men's Casual T-Shirt",
                    "category": "Clothing",
                    "price": 499,
                    "rating": 3.8,
                    "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
                    "inStock": true,
                    "description": "Comfortable cotton t-shirt for everyday wear."
                },
                {
                    "id": 4,
                    "name": "Women's Running Shoes",
                    "category": "Clothing",
                    "price": 1299,
                    "rating": 4.7,
                    "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
                    "inStock": true,
                    "description": "Lightweight and durable running shoes for women."
                },
                {
                    "id": 5,
                    "name": "Python Programming Book",
                    "category": "Books",
                    "price": 850,
                    "rating": 4.8,
                    "image": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
                    "inStock": true,
                    "description": "Comprehensive guide to Python programming for beginners."
                },
                {
                    "id": 6,
                    "name": "Gaming Laptop 15-inch",
                    "category": "Electronics",
                    "price": 65000,
                    "rating": 4.6,
                    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
                    "inStock": false,
                    "description": "High-performance laptop for gaming and work."
                },
                {
                    "id": 7,
                    "name": "4K LED Monitor 27\"",
                    "category": "Electronics",
                    "price": 15999,
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
                    "inStock": true,
                    "description": "Crisp and clear display for professional use."
                },
                {
                    "id": 8,
                    "name": "Leather Wallet",
                    "category": "Accessories",
                    "price": 799,
                    "rating": 4.0,
                    "image": "https://images.unsplash.com/photo-1627123424574-181ce5171c98?w=500&q=80",
                    "inStock": true,
                    "description": "Genuine leather wallet with multiple card slots."
                },
                {
                    "id": 9,
                    "name": "Digital Camera",
                    "category": "Electronics",
                    "price": 35000,
                    "rating": 4.9,
                    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
                    "inStock": true,
                    "description": "Capture life's moments with stunning clarity."
                },
                {
                    "id": 10,
                    "name": "Coffee Maker",
                    "category": "Home & Kitchen",
                    "price": 2999,
                    "rating": 4.3,
                    "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
                    "inStock": true,
                    "description": "Brew delicious coffee at home every morning."
                },
                {
                    "id": 11,
                    "name": "Backpack Water Resistant",
                    "category": "Accessories",
                    "price": 1499,
                    "rating": 4.5,
                    "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80",
                    "inStock": true,
                    "description": "Durable backpack suitable for travel and school."
                },
                {
                    "id": 12,
                    "name": "Wireless Mouse",
                    "category": "Electronics",
                    "price": 599,
                    "rating": 4.1,
                    "image": "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
                    "inStock": true,
                    "description": "Ergonomic wireless mouse for productivity."
                },
                {
                    "id": 13,
                    "name": "Graphic T-Shirt",
                    "category": "Clothing",
                    "price": 599,
                    "rating": 3.9,
                    "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&q=80",
                    "inStock": true,
                    "description": "Stylish graphic tee with unique design."
                },
                {
                    "id": 14,
                    "name": "Denim Jeans",
                    "category": "Clothing",
                    "price": 1999,
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1542272617-08f08630329f?w=500&q=80",
                    "inStock": true,
                    "description": "Classic denim jeans with a comfortable fit."
                },
                {
                    "id": 15,
                    "name": "Mechanical Keyboard",
                    "category": "Electronics",
                    "price": 3500,
                    "rating": 4.7,
                    "image": "https://images.unsplash.com/photo-1587829741301-dc798b91add1?w=500&q=80",
                    "inStock": true,
                    "description": "Tactile mechanical keyboard for typing and gaming."
                },
                {
                    "id": 16,
                    "name": "Fitness Tracker Band",
                    "category": "Electronics",
                    "price": 1200,
                    "rating": 4.0,
                    "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
                    "inStock": true,
                    "description": "Monitor your daily activity and sleep patterns."
                },
                {
                    "id": 17,
                    "name": "Sunglasses Aviator",
                    "category": "Accessories",
                    "price": 999,
                    "rating": 4.2,
                    "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",
                    "inStock": true,
                    "description": "Trendy aviator sunglasses with UV protection."
                },
                {
                    "id": 18,
                    "name": "Sci-Fi Novel",
                    "category": "Books",
                    "price": 450,
                    "rating": 4.6,
                    "image": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
                    "inStock": true,
                    "description": "Bestselling science fiction novel."
                },
                {
                    "id": 19,
                    "name": "Ceramic Mug",
                    "category": "Home & Kitchen",
                    "price": 250,
                    "rating": 4.1,
                    "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&q=80",
                    "inStock": true,
                    "description": "Beautiful ceramic mug for tea or coffee."
                },
                {
                    "id": 20,
                    "name": "Bluetooth Speaker",
                    "category": "Electronics",
                    "price": 1800,
                    "rating": 4.4,
                    "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
                    "inStock": false,
                    "description": "Portable speaker with powerful bass."
                }
            ];
            setupCategories();
            applyFilters();
        }
    }

    function setupCategories() {
        const categories = ['All', ...new Set(products.map(p => p.category))];
        categoryList.innerHTML = categories.map(cat =>
            `<li><button class="${cat === 'All' ? 'active' : ''}" onclick="filterByCategory(this, '${cat}')">${cat}</button></li>`
        ).join('');
    }

    window.filterByCategory = (btn, category) => {
        // Update UI
        document.querySelectorAll('#category-list button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update State
        filters.category = category;
        applyFilters();
    };

    function applyFilters() {
        let filtered = products.filter(product => {
            const matchesCategory = filters.category === 'All' || product.category === filters.category;
            const matchesPrice = product.price <= filters.price;
            const matchesRating = product.rating >= filters.rating;
            const matchesSearch = product.name.toLowerCase().includes(filters.search) ||
                product.category.toLowerCase().includes(filters.search);
            return matchesCategory && matchesPrice && matchesRating && matchesSearch;
        });

        // Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'rating') {
            filtered.sort((a, b) => b.rating - a.rating);
        }
        // Popularity is default/id order for now

        renderProducts(filtered);
        resultsCount.textContent = `Showing ${filtered.length} products`;
    }

    function renderProducts(items) {
        if (items.length === 0) {
            productGrid.innerHTML = '<div class="no-results">No products found matching your criteria.</div>';
            return;
        }

        productGrid.innerHTML = items.map(product => `
            <div class="product-card" onclick="openDetails(${product.id})">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${!product.inStock ? '<span class="badge badge-out">Out of Stock</span>' : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-rating">
                        <span class="stars">${renderStars(product.rating)}</span>
                        <span class="rating-val">(${product.rating})</span>
                    </div>
                    <div class="product-price">
                        <span class="price">₹${product.price.toLocaleString()}</span>
                        ${product.inStock ?
                `<button class="btn-add" onclick="event.stopPropagation(); addToCart(${product.id})">Add</button>` :
                `<button class="btn-add disabled" disabled>Sold Out</button>`
            }
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderStars(rating) {
        return '★'.repeat(Math.floor(rating)) + (rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(rating));
    }

    function resetFilters() {
        filters = {
            category: 'All',
            price: 100000,
            rating: 0,
            search: ''
        };
        searchInput.value = '';
        priceRange.value = 100000;
        priceValue.textContent = '₹100,000+';
        document.querySelector('input[name="rating-filter"][value="0"]').checked = true;

        // Reset Category UI
        document.querySelectorAll('#category-list button').forEach(b => b.classList.remove('active'));
        document.querySelector('#category-list button').classList.add('active'); // First one is 'All'

        applyFilters();
    }

    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        if (product && product.inStock) {
            cart.push(product);
            saveCart();

            // Animation for cart icon
            const cartBtnIcon = document.querySelector('.cart-btn');
            cartBtnIcon.classList.add('bump');
            setTimeout(() => cartBtnIcon.classList.remove('bump'), 300);

            showToast(`Added ${product.name} to cart!`);
        }
    };

    function saveCart() {
        localStorage.setItem('shopMateCart', JSON.stringify(cart));
        updateCartIcon();
    }

    function updateCartIcon() {
        cartCount.textContent = cart.length;
    }

    function openCheckout() {
        renderCartSummary();
        checkoutModal.style.display = 'flex';
    }

    function renderCartSummary() {
        if (cart.length === 0) {
            cartSummary.innerHTML = '<p>Your cart is empty.</p>';
            checkoutTotal.textContent = '₹0';
            return;
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);

        cartSummary.innerHTML = cart.map(item => `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>₹${item.price.toLocaleString()}</span>
            </div>
        `).join('');

        checkoutTotal.textContent = `₹${total.toLocaleString()}`;
    }

    window.openDetails = (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        modalBody.innerHTML = `
            <div class="detail-view">
                <div class="detail-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="detail-category">${product.category}</p>
                    <div class="detail-rating">${renderStars(product.rating)} (${product.rating} Rating)</div>
                    <h1 class="detail-price">₹${product.price.toLocaleString()}</h1>
                    <p class="detail-desc">${product.description || 'No description available.'}</p>
                    <div class="detail-actions">
                        ${product.inStock ?
                `<button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>` :
                `<button class="btn btn-secondary" disabled>Out of Stock</button>`
            }
                    </div>
                </div>
                <div class="policies">
                    <div class="policy-item"><i class="fas fa-truck"></i> Free Delivery</div>
                    <div class="policy-item"><i class="fas fa-undo"></i> 7 Days Return</div>
                    <div class="policy-item"><i class="fas fa-shield-alt"></i> 1 Year Warranty</div>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    };

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
