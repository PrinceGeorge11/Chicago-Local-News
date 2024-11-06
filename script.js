// Dummy news data
const newsData = [
    {
        "id": 1,
        "title": "IIT Front-End  Wins Championship",
        "category": "Sports",
        "content": "Prof. Raj's team secured a historic win in the championship game, marking their first title in over a decade.",
        "date": "2024-10-25"
    },
    {
        "id": 2,
        "title": "Local Star Athlete Breaks Records",
        "category": "Sports",
        "content": "In a stunning performance, the local athlete broke two records in a single match, impressing fans and commentators alike.",
        "date": "2024-10-24"
    },
    {
        "id": 3,
        "title": "Local Politics Debate",
        "category": "Politics",
        "content": "Candidates discussed major issues affecting the community, with a focus on education and public safety during last night's debate.",
        "date": "2024-10-20"
    },
    {
        "id": 4,
        "title": "Mayor Proposes New Policy Changes",
        "category": "Politics",
        "content": "The mayor unveiled a new set of policy changes aimed at improving city infrastructure and public transport.",
        "date": "2024-10-19"
    },
    {
        "id": 5,
        "title": "Severe Weather Warning Issued",
        "category": "Weather",
        "content": "Heavy rains and strong winds are expected in the coming days, prompting officials to issue a severe weather warning.",
        "date": "2024-10-22"
    },
    {
        "id": 6,
        "title": "Snow Weather Warning Issued",
        "category": "Weather",
        "content": "Heavy snow and strong winds are expected in the coming days, prompting officials to issue a severe weather warning.",
        "date": "2024-10-14"
    },

    {
        "id": 7,
        "title": "Weather Advisory for Holiday Weekend",
        "category": "Weather",
        "content": "A weather advisory has been issued for the holiday weekend, with possible thunderstorms and flash flooding.",
        "date": "2024-10-21"
    },
    {
        "id": 8,
        "title": "City Council Approves New Housing Development",
        "category": "Politics",
        "content": "The city council has given the green light to a new affordable housing project aimed at supporting low-income families.",
        "date": "2024-11-01"
    },
    {
        "id": 9,
        "title": "Annual Food Festival Draws Thousands",
        "category": "Business",
        "content": "The city's annual food festival saw a record number of attendees enjoying diverse culinary experiences from around the world.",
        "date": "2024-10-29"
    },
    {
    "id": 10,
    "title": "Tech Firm Expands Operations Downtown",
    "category": "Business",
    "content": "A major tech company has announced plans to open a new office in the downtown area, creating hundreds of job opportunities.",
    "date": "2024-11-02"
},
{
    "id": 11,
    "title": "Museum Unveils New Art Exhibition",
    "category": "Business",
    "content": "The city museum has launched a new exhibition featuring contemporary artists from across the globe.",
    "date": "2024-10-27"
},
{
    "id": 12,
    "title": "Chicago Bulls Vs IIT Students",
    "category": "Sports",
    "content": "In a stunning performance, the IIt students broke two records in a single match against Chicago Bulls, impressing fans and commentators alike.",
    "date": "2024-10-02"
}
];

// Display function for Top News
function displayTopNews() {
    const topNewsContainer = document.getElementById("top-news-titles");
    const topNewsTitles = newsData.map(item => `
      <div class="news-title">${item.title}</div>
    `).join(" ");

    topNewsContainer.innerHTML = topNewsTitles;
}



// Display Function
function displayNews() {
    const newsList = document.getElementById("content-area");
    newsList.innerHTML = newsData.map(item => `
        <div class="news-card" data-id="${item.id}">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><em>${item.date}</em></p>
        </div>
    `).join("");
}

// Call the function on window load
window.onload = function() {
    displayNews(); // Display all news
    displayTopNews(); // Display top news titles
};

// Filter news by category
function filterByCategory(category) {
    const filteredNews = newsData.filter(item => item.category === category);
    displayFilteredNews(filteredNews);
}

// Display filtered news
function displayFilteredNews(filteredNews) {
    const newsList = document.getElementById("content-area");
    newsList.innerHTML = filteredNews.map(item => `
        <div class="news-card" data-id="${item.id}">
            <h4>${item.title}</h4>
            <p>${item.content}</p>
            <p><strong>Category:</strong> ${item.category}</p>
            <p><em>${item.date}</em></p>
        </div>
    `).join("");
}

// Filter news by search input
function filterNews() {
    const searchInput = document.getElementById("search-bar").value.toLowerCase();
    const filteredNews = newsData.filter(item => 
        item.title.toLowerCase().includes(searchInput) ||
        item.category.toLowerCase().includes(searchInput) ||
        item.content.toLowerCase().includes(searchInput) ||
        item.date.toLowerCase().includes(searchInput)
    );
    displayFilteredNews(filteredNews);
}

document.addEventListener("DOMContentLoaded", function () {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".slideshow-image");

    function showSlides() {
        slides.forEach((slide, index) => {
            slide.style.opacity = "0"; // Hide all slides
        });

        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1; // Loop back to the first slide
        }
        
        slides[slideIndex - 1].style.opacity = "1"; // Show current slide
        setTimeout(showSlides, 3000); // Change image every 3 seconds
    }

    showSlides(); // Initialize slideshow
});
