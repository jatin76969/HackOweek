// ==========================================
// CONFIGURATION
// ==========================================
// Replace this with your actual Unsplash API Key
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

// ==========================================
// STATE MANAGEMENT
// ==========================================
let currentPage = 1;
let currentQuery = 'nature';
let isFetching = false;
let useMockData = false;

// ==========================================
// DOM ELEMENTS
// ==========================================
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const categoryButtons = document.querySelectorAll('.category-btn');
const loader = document.getElementById('loader');
const loadMoreContainer = document.getElementById('load-more-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const emptyState = document.getElementById('empty-state');
const messageContainer = document.getElementById('message-container');
const messageText = document.getElementById('message-text');

// Lightbox Elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxLink = document.getElementById('lightbox-link');

// Theme & Setup Elements
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const setupOverlay = document.getElementById('setup-overlay');
const useMockBtn = document.getElementById('use-mock-btn');
const setupDismissBtn = document.getElementById('setup-dismiss-btn');

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    setupEventListeners();
    
    // Check if API key is provided
    if (UNSPLASH_ACCESS_KEY === 'YOUR_UNSPLASH_ACCESS_KEY') {
        setupOverlay.classList.remove('hidden');
    } else {
        fetchImages(true);
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Search bindings
    searchButton.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    // Category Buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // Trigger fetch
            currentQuery = e.target.dataset.query;
            searchInput.value = ''; // clear search input
            fetchImages(true);
        });
    });

    // Load More
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        fetchImages(false);
    });

    // Lightbox Controls
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Setup Modal Controls
    useMockBtn.addEventListener('click', () => {
        useMockData = true;
        setupOverlay.classList.add('hidden');
        fetchImages(true);
    });
    
    setupDismissBtn.addEventListener('click', () => {
        setupOverlay.classList.add('hidden');
        showMessage('Waiting for API key...');
    });

    // Theme Toggle
    themeToggle.addEventListener('click', toggleTheme);
}

// ==========================================
// CORE LOGIC
// ==========================================
async function fetchImages(isNewSearch = false) {
    if (isFetching) return;
    
    if (isNewSearch) {
        currentPage = 1;
        grid.innerHTML = '';
        hideMessage();
        emptyState.classList.add('hidden');
        loadMoreContainer.classList.add('hidden');
    }

    isFetching = true;
    loader.classList.remove('hidden');
    loadMoreContainer.classList.add('hidden');

    try {
        let photos = [];
        let totalPages = 1;

        if (useMockData) {
            // Simulate API Delay
            await new Promise(r => setTimeout(r, 1000));
            
            // Generate mock payload using Picsum
            photos = Array.from({ length: 12 }).map((_, i) => {
                const height = 400 + Math.floor(Math.random() * 300);
                const seed = `${currentQuery}-${currentPage}-${i}`;
                const id = Math.floor(Math.random() * 1000)
                return {
                    id: id.toString(),
                    urls: { 
                        regular: `https://picsum.photos/seed/${seed}/400/${height}`,
                        full: `https://picsum.photos/seed/${seed}/1200/${height * 3}`
                    },
                    alt_description: `${currentQuery} mock image`,
                    user: { name: `Photographer ${id}` },
                    links: { html: `https://picsum.photos/` }
                };
            });
            totalPages = 10;
        } else {
            // Real Unsplash API Call
            const url = `https://api.unsplash.com/search/photos?page=${currentPage}&query=${encodeURIComponent(currentQuery)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=12&orientation=portrait`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 401) throw new Error("Invalid API Key");
                if (response.status === 403) throw new Error("Rate limit exceeded");
                throw new Error("Failed to fetch images");
            }
            
            const data = await response.json();
            photos = data.results;
            totalPages = data.total_pages;
        }

        loader.classList.add('hidden');

        if (photos.length === 0 && isNewSearch) {
            emptyState.classList.remove('hidden');
        } else {
            renderImages(photos);
            if (currentPage < totalPages) {
                loadMoreContainer.classList.remove('hidden');
            }
        }
    } catch (error) {
        loader.classList.add('hidden');
        showMessage(error.message);
        console.error("Fetch Error:", error);
    } finally {
        isFetching = false;
    }
}

function renderImages(photos) {
    photos.forEach(photo => {
        const figure = document.createElement('figure');
        figure.className = 'card';
        
        // Use regular size for grid, full for lightbox
        const imgSrc = photo.urls.regular;
        const fullImgSrc = photo.urls.full || photo.urls.regular;
        const altText = photo.alt_description || 'Nature photograph';
        const authorName = photo.user.name;
        const authorLink = photo.links.html;

        figure.innerHTML = `
            <img src="${imgSrc}" alt="${altText}" loading="lazy">
            <figcaption class="card-overlay">
                <div>
                    <h3 class="card-title">${formatAltText(altText)}</h3>
                    <p class="card-author">by ${authorName}</p>
                </div>
                <div class="card-action">
                    <span class="material-symbols-outlined">zoom_in</span>
                </div>
            </figcaption>
        `;

        // Click to open lightbox
        figure.addEventListener('click', () => {
            openLightbox(fullImgSrc, authorName, authorLink);
        });

        grid.appendChild(figure);
    });
}

// ==========================================
// UTILITIES & UI HELPERS
// ==========================================
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    currentQuery = query;
    // Clear active state from category buttons
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    
    fetchImages(true);
}

function openLightbox(imgSrc, author, link) {
    lightboxImg.src = imgSrc;
    lightboxAuthor.textContent = `Photo by ${author}`;
    lightboxLink.href = link;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightboxImg.src = ''; // Clear source to prevent brief flash on next open
    }, 400); 
    document.body.style.overflow = '';
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
}

function showMessage(msg) {
    messageText.textContent = msg;
    messageContainer.classList.remove('hidden');
}

function hideMessage() {
    messageContainer.classList.add('hidden');
}

function formatAltText(text) {
    if (!text) return 'Nature Image';
    const words = text.split(' ').slice(0, 4).join(' ');
    // Capitalize first letter
    return words.charAt(0).toUpperCase() + words.slice(1) + (text.split(' ').length > 4 ? '...' : '');
}

// Start application
init();
