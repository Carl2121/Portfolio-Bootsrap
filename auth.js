// auth.js - Handles user authentication

// Register User
function registerUser(event) {
    event.preventDefault();
    let email = document.getElementById("registerEmail").value;
    let username = document.getElementById("registerUsername").value;
    let phone = document.getElementById("registerPhone").value;
    let role = document.getElementById("registerRole").value;
    let password = document.getElementById("registerPassword").value;

    // Check if user already exists
    if (localStorage.getItem(email)) {
        alert("User with this email already exists!");
        return;
    }

    // Store user data in localStorage
    localStorage.setItem(email, JSON.stringify({
        username: username,
        phone: phone,
        role: role,
        password: password
    }));

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
}

// Login User
function loginUser(event) {
    event.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let userData = JSON.parse(localStorage.getItem(email));
    if (userData && userData.password === password) {
        localStorage.setItem("loggedInUser", email);
        alert(`Login successful! Welcome, ${userData.username} (${userData.role}).`);
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
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
