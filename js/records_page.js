/* Run before page render and reroute if no patient data is present
const patient = JSON.parse(localStorage.getItem("patient"));
if (!patient) {
    console.log('here');
    window.location.href = "main_page.html";
}
*/

// Mock patient data. Make available from Main Page probably.
const patient = {
    id: "0",
    name: "Connor",
    age: "20",
    gender: "Male",
    height: "5 ft. 9 in.",
    weight: "155 lbs.",
    birthday: "12-12-2000",
    conditions: [
        "Myopia",
        "Vitreous floaters",
        "Rhinitis"
    ],
    medications: [
        "Ibuprofen, 200mg",
        "Acetaminophen, 200mg"
    ]
};

// Get a formatted HTML element for a given condition
const getCondition = condition => (
    `<div id=${condition} class="condition">${condition}</div>`
);

// Get a formatted HTML element for a given medication
const getMedication = medication => (
    `<div id=${medication} class="medication">${medication}</div>`
);

const setRealtimeVitals = () => {
    const oxygenLevel = (96 + Math.random()).toPrecision(4);
    const heartRate = 130 + (Math.round(Math.random() * 10));

    $("#blood-oxygen").text(`Blood Oxygen Level: ${oxygenLevel}%`);
    $("#heartrate").text(`Heart Rate: ${heartRate} BPM`);
};

$(document).ready(function() {
    // Display patient Personal Information
    $("#name").text(`Name: ${patient.name}`);
    $("#age").text(`Age: ${patient.age}`);
    $("#gender").text(`Gender: ${patient.gender}`);
    $("#height").text(`Height: ${patient.height}`);
    $("#weight").text(`Weight: ${patient.weight}`);
    $("#birthday").text(`Date of Birth: ${patient.birthday}`);

    // Render patient's initial conditions
    patient.conditions.forEach(condition => {
        $("#condition-list").append(getCondition(condition));
    });

    // Render patient's initial medications
    patient.medications.forEach(medication => {
        $("#medication-list").append(getMedication(medication));
    });

    // Mimic realtime vital data
    setRealtimeVitals();
    setInterval(setRealtimeVitals, 5000);

    $("#add-condition").click(function () {
        const condition = $("#condition-name").val();
        const { conditions } = patient;

        if (patient.conditions.includes(condition)) return;

        conditions.push(condition);
        $('#condition-list').append(getCondition(condition));
    });

    $("#delete-condition").click(function () {
        const condition = $("#condition-name").val();
        const { conditions } = patient;

        if (!conditions.includes(condition)) return;

        conditions.splice(conditions.indexOf(condition), 1);
        $(`#${condition}`).remove();
    });

    $("#add-medication").click(function () {
        const medication = $("#medication-name").val();
        const { medications } = patient;

        if (medications.includes(medication)) return;

        medications.push(medication);
        $("#medication-list").append(getMedication(medication));
    });

    $("#delete-medication").click(function () {
        const medication = $("#medication-name").val();
        const { medications } = patient;
        
        if (!medications.includes(medication)) return;

        medications.splice(medications.indexOf(medications), 1);
        $(`#${medications}`).remove();
    });
});

// Save patient data to localStorage
$(window).on('beforeunload', () => {
    const patients = JSON.parse(localStorage.getItem("patients"));
    patients = patients.map(({ id }, i) => (
        id === patient.id 
            ? patient 
            : patients[i]
    ));
    localStorage.setItem("patients", JSON.stringify(patients));
});