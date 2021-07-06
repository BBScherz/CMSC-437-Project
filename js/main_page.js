const getPatientListItem = ({ id, name }) => (`
    <div class="patient">
        <h3>Patient ${id}: ${name}</h3>
        <div class="panels">
            <div id="gif">
                <img src="https://i.gifer.com/QVGh.gif" alt="Patient Heart Beat" width="200" height="80">
            </div>
            <div class="list-item-panel">
                <div class="heartrate">Heart Rate:</div>
                <div class="blood-pressure">Blood Pressure:</div>
                <div class="blood-oxygen">Blood Oxygen Level:</div>
                <div class="blood-carbondioxide">Blood Carbon Dioxide Level:</div>
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
    $(".heartrate").each(function() {
        const heartRate = 80 + (-10 + Math.round(Math.random() * 20));
        $(this).text(`Heart Rate: ${heartRate} BPM`);
    });

    $(".blood-pressure").each(function() {
        const systolic = 130 + Math.round(Math.random() * 10);
        const diastolic = 85 + Math.round(Math.random() * 10);
        $(this).text(`Blood Pressure: ${systolic} mmHg / ${diastolic} mmHg`);
    });

    $(".blood-oxygen").each(function() {
        const oxygenLevel = (96 + (-2 + Math.random() * 4)).toPrecision(4);
        $(this).text(`Blood Oxygen Level: ${oxygenLevel}%`);
    });

    $(".blood-carbondioxide").each(function() {
        const carbonDioxideLevel = (40 + (-15 + Math.random() * 30)).toPrecision(4);
        $(this).text(`Blood Carbon Dioxide Level: ${carbonDioxideLevel} mmHg`);
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