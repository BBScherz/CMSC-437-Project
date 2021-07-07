// Run before page render and reroute if no patient data is present
if (!patient) {
    window.location.href = "main_page.html";
}


$(document).ready(function() {
    
    updateThresholdDisplays();

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

    $("#add-blood-oxygen-threshold").click(function () {
        patient.minimumO2Threshold = Number.parseFloat($("#blood-oxygen-threshold-new").val());
        updateThresholdDisplays();
    });
    $("#add-minimum-heartrate-threshold").click(function () {
        patient.minimumHeartrateThreshold = Number.parseFloat($("#minimum-heartrate-threshold-new").val());
        updateThresholdDisplays();
    });
    $("#add-maximum-heartrate-threshold").click(function () {
        patient.maximumHeartrateThreshold = Number.parseFloat($("#maximum-heartrate-threshold-new").val());
        updateThresholdDisplays();
    });

});


function updateThresholdDisplays() {
    $("#blood-oxygen-threshold").text("Current: " + patient.minimumO2Threshold)
    $("#minimum-heartrate-threshold").text("Current: " + patient.minimumHeartrateThreshold)
    $("#maximum-heartrate-threshold").text("Current: " + patient.maximumHeartrateThreshold)
    writePatients();
}

// Save patient data if page is navigated away from
$(window).on('beforeunload', writePatients);

//write data of current patient to the patient storage
function writePatients() {
    localStorage.setItem("patient", JSON.stringify(patient));
    let nextPatients = JSON.parse(localStorage.getItem("patients"));
    nextPatients = patients.map(({ id }, i) => (
        id === patient.id 
            ? patient 
            : nextPatients[i]
    ));
    localStorage.setItem("patients", JSON.stringify(nextPatients));
}