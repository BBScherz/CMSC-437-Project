// Run before page render and reroute if no patient data is present
if (!patient) {
    window.location.href = "main_page.html";
}


$(document).ready(function() {


    $("#blood-oxygen-threshold").text("Current: 80")
    $("#minimum-heartrate-threshold").text("Current: 60")
    $("#maximum-heartrate-threshold").text("Current: 160")


    if (user.role === "Doctor") {
        $("#threshold1-container").append(`
            <input type="text" id="blood-oxygen-threshold-new" name="threshold-name">
            <input type="button" value="Save" id="add-blood-oxygen-threshold">
        `);
        $("#threshold2-container").append(`
            <input type="text" id="minimum-heartrate-threshold-new" name="threshold-name">
            <input type="button" value="Save" id="add-minimum-heartrate-threshold">
        `);
        $("#threshold3-container").append(`
            <input type="text" id="maximum-heartrate-threshold-new" name="threshold-name">
            <input type="button" value="Save" id="add-maximum-heartrate-threshold">
        `);


    }

});

// Save patient data to localStorage
$(window).on('beforeunload', () => {
    let nextPatients = JSON.parse(localStorage.getItem("patients"));
    nextPatients = patients.map(({ id }, i) => (
        id === patient.id 
            ? patient 
            : patients[i]
    ));
    localStorage.setItem("patients", JSON.stringify(nextPatient));
});