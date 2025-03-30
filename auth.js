// auth.js - Handles user authentication

// Register User
function registerUser(event) {
    event.preventDefault();
    let username = document.getElementById("registerUsername").value;
    let password = document.getElementById("registerPassword").value;

    if (localStorage.getItem(username)) {
        alert("User already exists!");
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password: password }));
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
}

// Login User
function loginUser(event) {
    event.preventDefault();
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    let userData = JSON.parse(localStorage.getItem(username));
    if (userData && userData.password === password) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password!");
    }
}

// Check if user is logged in
function checkAuth() {
    if (!localStorage.getItem("loggedInUser")) {
        window.location.href = "login.html";
    }
}

// Logout function
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully.");
    window.location.href = "index.html";
}

// Add logout button dynamically to navbar if user is logged in
document.addEventListener("DOMContentLoaded", function () {
    let navbar = document.querySelector(".navbar-nav");
    if (localStorage.getItem("loggedInUser")) {
        let logoutButton = document.createElement("li");
        logoutButton.className = "nav-item";
        logoutButton.innerHTML = '<a class="nav-link" href="#" onclick="logoutUser()">Logout</a>';
        navbar.appendChild(logoutButton);
    }
});
