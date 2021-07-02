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
    const user = { name, role };
    localStorage.setItem("user", JSON.stringify(user));
}