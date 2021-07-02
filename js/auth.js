const user = JSON.parse(localStorage.getItem("user"));
const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf("/") + 1);

if (filename !== "login_page.html" && !user) {
    window.location.href = "login_page.html";
} else if (filename === "login_page.html" && user) {
    window.location.href = "main_page.html";
}

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

function logout() {
    localStorage.removeItem("user");
    window.location.href = "login_page.html";
}