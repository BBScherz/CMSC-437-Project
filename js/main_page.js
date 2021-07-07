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
                <button onclick="visitCrisis(${id})">Crisis Threshold Settings</button>
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

const getRealtimeVitals = () => {
    let patient_counter = 0;    //To keep track of which patient in the list is being updated. Not the best solution but works as long as the patients are rendered in the same order in html
    $(".heartrate").each(function() {
        const heartRate = patients[patient_counter].heartRate;
        patient_counter++;
        $(this).text(`Heart Rate: ${heartRate} BPM`);
    });
    patient_counter = 0;
    $(".blood-pressure").each(function() {
        const systolic = patients[patient_counter].systolic;
        const diastolic = patients[patient_counter].diastolic;
        patient_counter++;
        $(this).text(`Blood Pressure: ${systolic} mmHg / ${diastolic} mmHg`);
    });
    patient_counter = 0;
    $(".blood-oxygen").each(function() {
        const oxygenLevel = patients[patient_counter].oxygenLevel;
        patient_counter++;
        $(this).text(`Blood Oxygen Level: ${oxygenLevel}%`);
    });
    patient_counter = 0;
    $(".blood-carbondioxide").each(function() {
        const carbonDioxideLevel = patients[patient_counter].carbonDioxideLevel;
        patient_counter++;
        $(this).text(`Blood Carbon Dioxide Level: ${carbonDioxideLevel} mmHg`);
    });
};


$(document).ready(() => {
    $("#welcome-text").text(`Welcome, ${user.role} ${user.name}`);

    patients.forEach(item => {
        $("#patient-list").append(getPatientListItem(item));
    });

    getRealtimeVitals();
    setInterval(getRealtimeVitals, 500);
});