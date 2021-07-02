// Try to fetch user from localStorage, get the visited file
const user = JSON.parse(localStorage.getItem("user"));
const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf("/") + 1);

// If user is not found and we are not on the login page, redirect
if (filename !== "login_page.html" && !user) {
    window.location.href = "login_page.html";
// Else, if we are on the login page and user is found, redirect
} else if (filename === "login_page.html" && user) {
    window.location.href = "main_page.html";
}

// Get checked role & name, create user object for localStorage
function login() {
    const nurse = document.getElementById("nurse");
    const doctor = document.getElementById("doctor");
    const name = document.getElementById("name").value;

    if (!nurse.checked && !doctor.checked) {
        alert("Please select a role to log in.");
        return;
    }

    if (!name) {
        alert("Please enter your name to log in.");
        return;
    }

    const role = nurse.checked ? nurse.value : doctor.value;
    const newUser = { name, role };
    localStorage.setItem("user", JSON.stringify(newUser));
}

// Remove user from localStorage, redirect
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login_page.html";
}