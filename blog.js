// Sample blog data
const blogPosts = [
    {
        id: 1,
        title: "The Future of E-commerce: Trends to Watch in 2024",
        excerpt: "Discover the latest trends shaping the e-commerce landscape and how they'll impact your business.",
        category: "business",
        date: "2024-03-15",
        author: "John Doe",
        image: "dresses.jpg",
        readTime: "5 min read",
        likes: 245
    },
    {
        id: 2,
        title: "Sustainable Fashion: Making Ethical Choices",
        excerpt: "Learn how to make more sustainable fashion choices and support ethical brands.",
        category: "fashion",
        date: "2024-03-10",
        author: "Jane Smith",
        image: "cars-carousel.jpeg",
        readTime: "4 min read",
        likes: 189
    },
    {
        id: 3,
        title: "Tech Gadgets That Will Change Your Life",
        excerpt: "Explore the latest tech gadgets that can enhance your daily life and productivity.",
        category: "technology",
        date: "2024-03-05",
        author: "Mike Johnson",
        image: "breakfast.jpg",
        readTime: "6 min read",
        likes: 312
    },
    {
        id: 4,
        title: "Work-Life Balance in the Digital Age",
        excerpt: "Tips and strategies for maintaining a healthy work-life balance in our connected world.",
        category: "lifestyle",
        date: "2024-02-28",
        author: "Sarah Williams",
        image: "wallpaper.jpeg",
        readTime: "7 min read",
        likes: 156
    }
];

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const loadMoreBtn = document.getElementById('loadMore');
const newsletterForm = document.getElementById('newsletterForm');

// Initial state
let currentPage = 1;
const postsPerPage = 6;
let filteredPosts = [...blogPosts];

// Create blog post card
function createBlogCard(post) {
    return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-sm text-primary font-semibold">${post.category}</span>
                    <span class="text-sm text-gray-500">${post.readTime}</span>
                </div>
                <h3 class="text-xl font-bold text-secondary mb-2">${post.title}</h3>
                <p class="text-gray-600 mb-4">${post.excerpt}</p>
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <span class="text-sm text-gray-500">${post.date}</span>
                        <span class="mx-2 text-gray-300">•</span>
                        <span class="text-sm text-gray-500">${post.author}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-heart text-gray-400 mr-1"></i>
                        <span class="text-sm text-gray-500">${post.likes}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render blog posts
function renderBlogPosts(posts) {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = posts.slice(startIndex, endIndex);

    if (postsToShow.length === 0) {
        blogGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">No posts found</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    blogGrid.innerHTML = postsToShow.map(createBlogCard).join('');
    loadMoreBtn.style.display = posts.length > endIndex ? 'block' : 'none';
}

// Filter and sort posts
function filterAndSortPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortBy = sortFilter.value;

    filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                            post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
        case 'newest':
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'popular':
            filteredPosts.sort((a, b) => b.likes - a.likes);
            break;
    }

    currentPage = 1;
    renderBlogPosts(filteredPosts);
}

// Event Listeners
searchInput.addEventListener('input', filterAndSortPosts);
categoryFilter.addEventListener('change', filterAndSortPosts);
sortFilter.addEventListener('change', filterAndSortPosts);

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    renderBlogPosts(filteredPosts);
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your backend
    alert(`Thank you for subscribing with ${email}!`);
    e.target.reset();
});

// Initialize
renderBlogPosts(filteredPosts);

// Add accessibility labels to select elements
categoryFilter.setAttribute('aria-label', 'Filter by category');
sortFilter.setAttribute('aria-label', 'Sort articles'); 