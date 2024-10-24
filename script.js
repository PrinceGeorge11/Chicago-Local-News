// script.js

// Fetch and Load Articles from JSON
async function loadArticles() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        displayHeroNews(data.articles);
        displayArticles(data.articles);
        displaySidebarLocalNews(data.articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

// Display Hero News
function displayHeroNews(articles) {
    const heroNewsContainer = document.getElementById('hero-news');
    articles.slice(0, 3).forEach(article => {
        const articleHTML = `
            <article>
                <img src="${article.image}" alt="${article.title}">
                <h3>${article.title}</h3>
                <p><strong>Published on:</strong> ${new Date(article.date).toLocaleDateString()} | <strong>Author:</strong> ${article.author}</p>
                <p>${article.content}</p>
                <a href="article.html" class="read-more">Read More</a>
            </article>
        `;
        heroNewsContainer.insertAdjacentHTML('beforeend', articleHTML);
    });
}

// Display Articles in the Main Local News Section
function displayArticles(articles) {
    const localNewsSection = document.getElementById('local-news-articles');
    localNewsSection.innerHTML = ''; // Clear existing content
    articles.forEach(article => {
        const articleHTML = `
            <article>
                <h3>${article.title}</h3>
                <p><strong>Published on:</strong> ${new Date(article.date).toLocaleDateString()} | <strong>Author:</strong> ${article.author}</p>
                <img src="${article.image}" alt="${article.title}">
                <p>${article.content}</p>
                <a href="article.html" class="read-more">Read More</a>
            </article>
        `;
        localNewsSection.insertAdjacentHTML('beforeend', articleHTML);
    });
}

// Display Local News in the Sidebar
function displaySidebarLocalNews(articles) {
    const localNewsList = document.getElementById('local-news-list');
    localNewsList.innerHTML = ''; // Clear existing content
    articles.forEach(article => {
        const listItemHTML = `
            <li><a href="#">${article.title}</a></li>
        `;
        localNewsList.insertAdjacentHTML('beforeend', listItemHTML);
    });
}

// Search Functionality
document.getElementById('searchButton').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const articles = document.querySelectorAll('article');
    articles.forEach(article => {
        const title = article.querySelector('h3').innerText.toLowerCase();
        if (title.includes(searchInput)) {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
});

// Load articles when the document is ready
document.addEventListener('DOMContentLoaded', loadArticles);

// Load news data and display it
document.addEventListener("DOMContentLoaded", () => {
    displayNews(newsData);
});

function displayNews(news) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    news.forEach(article => {
        const newsArticle = document.createElement('article');
        newsArticle.innerHTML = `
            <h2>${article.title}</h2>
            <p><strong>Date:</strong> ${article.date}</p>
            <p>${article.content}</p>
        `;
        newsContainer.appendChild(newsArticle);
    });
}

// Filter news based on search input
function filterNews() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredNews = newsData.filter(article => 
        article.title.toLowerCase().includes(searchInput) ||
        article.content.toLowerCase().includes(searchInput)
    );
    displayNews(filteredNews);
}

// Check if a user is logged in
document.addEventListener("DOMContentLoaded", () => {
    loadNews();
    checkLoginStatus();
});

// Display news
function loadNews() {
    const storedNews = JSON.parse(localStorage.getItem('newsData')) || newsData;
    displayNews(storedNews);
}

function displayNews(news) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    news.forEach(article => {
        const newsArticle = document.createElement('article');
        newsArticle.innerHTML = `
            <h2>${article.title}</h2>
            <p><strong>Date:</strong> ${article.date}</p>
            <p>${article.content}</p>
        `;
        newsContainer.appendChild(newsArticle);
    });
}

// Filter news based on search input
function filterNews() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const storedNews = JSON.parse(localStorage.getItem('newsData')) || newsData;
    const filteredNews = storedNews.filter(article => 
        article.title.toLowerCase().includes(searchInput) ||
        article.content.toLowerCase().includes(searchInput)
    );
    displayNews(filteredNews);
}

// User registration
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (!username || !password) {
        alert("Please fill out both fields.");
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.some(user => user.username === username)) {
        alert("Username already exists.");
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! You can now log in.");
    toggleLogin();
}

// User login
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("Invalid username or password.");
        return;
    }

    localStorage.setItem('loggedInUser', username);
    alert("Login successful!");
    checkLoginStatus();
}

// Check login status
function checkLoginStatus() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'inline';
        document.getElementById('newsSubmissionSection').style.display = 'block';
    } else {
        document.getElementById('loginButton').style.display = 'inline';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('newsSubmissionSection').style.display = 'none';
    }
}

// Logout user
function logout() {
    localStorage.removeItem('loggedInUser');
    alert("Logged out successfully.");
    checkLoginStatus();
}

// Toggle login and registration forms
function toggleLogin() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registerSection').style.display = 'none';
}

function toggleRegister() {
    document.getElementById('registerSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
}

// Submit news (only if logged in)
function submitNews() {
    const title = document.getElementById('newsTitle').value;
    const content = document.getElementById('newsContent').value;

    if (!title || !content) {
        alert("Please fill out both fields.");
        return;
    }

    const newArticle = {
        title,
        date: new Date().toISOString().split('T')[0],
        content
    };

    const storedNews = JSON.parse(localStorage.getItem('newsData')) || newsData;
    storedNews.push(newArticle);
    localStorage.setItem('newsData', JSON.stringify(storedNews));
    loadNews();
    alert("News submitted successfully.");
    document.getElementById('newsTitle').value = '';
    document.getElementById('newsContent').value = '';
}