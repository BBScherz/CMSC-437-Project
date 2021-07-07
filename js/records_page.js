// Run before page render and reroute if no patient data is present
if (!patient) {
    window.location.href = "main_page.html";
}

// Get a formatted HTML element for a given condition
const getCondition = condition => (
    `<div id="${condition}" class="condition">${condition}</div>`
);

// Get a formatted HTML element for a given medication
const getMedication = medication => (
    `<div id="${medication}" class="medication">${medication}</div>`
);

const getRealtimeVitals = () => {
    const oxygenLevel = patient.oxygenLevel;
    const heartRate = patient.heartRate;
    const systolic = patient.systolic;
    const diastolic = patient.diastolic;
    const carbonDioxideLevel = patient.carbonDioxideLevel;
    
    $("#heartrate").text(`Heart Rate: ${heartRate} BPM`);
    $("#blood-pressure").text(`Blood Pressure: ${systolic} mmHg / ${diastolic} mmHg`);
    $("#blood-oxygen").text(`Blood Oxygen Level: ${oxygenLevel}%`);
    $("#blood-carbondioxide").text(`Blood Carbon Dioxide Level: ${carbonDioxideLevel} mmHg`);
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

    if (user.role === "Doctor") {
        $("#cond-container").append(`
            <input type="text" id="condition-name" name="condition-name">
            <input type="button" value="Add" id="add-condition">
            <input type="button" value="Remove" id="delete-condition">
        `);

        $("#med-container").append(`
            <input type="text" id="medication-name" name="medication-name">
            <input type="button" value="Add" id="add-medication">
            <input type="button" value="Remove" id="delete-medication">
        `);
    }

    // Mimic realtime vital data
    getRealtimeVitals();
    setInterval(getRealtimeVitals, 5000);

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
    let nextPatients = JSON.parse(localStorage.getItem("patients"));
    nextPatients = nextPatients.map(({ id }, i) => (
        id === patient.id 
            ? patient 
            : nextPatients[i]
    ));
    localStorage.setItem("patients", JSON.stringify(nextPatients));
});

function open_xray(){

    var num_xray = Math.floor(Math.random() * 4);
    switch(num_xray){
        case 0:
            window.open("assets/chest_x.jpeg");
            break;
        case 1:
            window.open("assets/hand_x.jpg");
            break;
        case 2:
            window.open("assets/head_x.jpg");
            break;
        case 3:
            window.open("assets/leg_x.jpeg");
            break;
    }
}