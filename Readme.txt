Explanation:
HTML: Contains the structure of the page, including a search input and a main section where news articles will be dynamically inserted.
CSS: Styles the website, making it responsive and easy to read, with a simple layout for the news articles.
JavaScript:
newsData.js contains a simple array of dummy news articles in JSON format.
script.js manages the dynamic display of the news and the search filter functionality.
How it Works:
When the user types into the search bar, the filterNews() function is triggered. 
This function checks if the search input matches any part of the news title or content and updates the displayed news accordingly.

Explanation of Changes:
User Registration and Login:

Users can register using a username and password, which are stored in localStorage.
During login, we check the credentials against stored users.
If a user is logged in, the news submission form becomes visible.
News Submission:

Logged-in users can submit news, which is saved to localStorage and displayed alongside existing news.
Logout Functionality:

The logout() function clears the login state and hides the news submission form.
This basic implementation simulates authentication and content management on the front end without using a database or backend.