const getPatientListItem = ({ id, name }) => (`
    <div class="patient">
        <h3>Patient ${id}: ${name}</h3>
        <div class="panels">
            <div class="list-item-panel">
                <div class="heartrate">Heart Rate:</div>
                <div class="blood-oxygen">Blood Oxygen Level:</div>
            </div>
            <div class="list-item-panel">
                <button onclick="visitCrisis(${id})">Crisis Response</button>
            </div>
            <div class="list-item-panel">
                <button onclick="visitRecords(${id})">View Records</button>
            </div>
        </div>
    </div>
`);

const visitCrisis = patientId => {
    const clickedPatient = patients.find(({ id }) => patientId == id);
    localStorage.setItem("patient", JSON.stringify(clickedPatient));
    window.location.href = "crisis_page.html";
};

const visitRecords = patientId => {
    const clickedPatient = patients.find(({ id }) => patientId == id);
    localStorage.setItem("patient", JSON.stringify(clickedPatient));
    window.location.href = "records_page.html";
};

const setRealtimeVitals = () => {
    $(".blood-oxygen").each(function() {
        const oxygenLevel = (96 + (-2 + Math.random() * 4)).toPrecision(4);
        $(this).text(`Blood Oxygen Level: ${oxygenLevel}%`);
    });

    $(".heartrate").each(function() {
        const heartRate = 130 + (-10 + Math.round(Math.random() * 20));
        $(this).text(`Heart Rate: ${heartRate} BPM`);
    });
};

$(document).ready(() => {
    $("#welcome-text").text(`Welcome, ${user.role} ${user.name}`);

    patients.forEach(item => {
        $("#patient-list").append(getPatientListItem(item));
    });

    setRealtimeVitals();
    setInterval(setRealtimeVitals, 5000);
});