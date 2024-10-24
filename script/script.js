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
