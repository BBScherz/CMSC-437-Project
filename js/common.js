// Try to fetch user from localStorage, get the visited file
const user = JSON.parse(localStorage.getItem("user"));

var patients = JSON.parse(localStorage.getItem("patients"));
var patient = JSON.parse(localStorage.getItem("patient"));
var patient_in_crisis;

const url = window.location.pathname;
const filename = url.substring(url.lastIndexOf("/") + 1);

// If user is not found and we are not on the login page, redirect
if (filename !== "login_page.html" && !user) {
    window.location.href = "login_page.html";
// Else, if we are on the login page and user is found, redirect
} else if (filename === "login_page.html" && user) {
    window.location.href = "main_page.html";
}

// Load mock patient data if none exists
if (!patients) {
    const mockPatients = [{
        id: "23134",
        name: "Jacob Elridge",
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
    }, {
        id: "54712",
        name: "Sarah Knight",
        age: "31",
        gender: "Female",
        height: "5 ft. 6 in.",
        weight: "154 lbs.",
        birthday: "11-24-1990",
        conditions: [
            "Hyperopia",
            "Raynaud's Syndrome",
            "Type I Hypersensitivity: Peanuts"
        ],
        medications: [
            "Acetaminophen, 200mg",
            "Epinephrine, 0.3mg"
        ],
    }, {
        id: "13244",
        name: "Craig Dyson",
        age: "51",
        gender: "Male",
        height: "5 ft. 11 in.",
        weight: "257 lbs.",
        birthday: "10-13-1970",
        conditions: [
            "Heart Disease",
            "Type II Diabetes",
            "Severe Hemophilia A"
        ],
        medications: [
            "Insulin, 116.81 units",
            "Ibuprofen, 400mg",
            "Hemlibra"
        ],
    }];

    for (let p of mockPatients) {   //Add starting threshold values to the mock patients
        p.minimumO2Threshold = null;
        p.minimumHeartrateThreshold = null;
        p.maximumHeartrateThreshold = null;
        p.inCrisis = false;
    }
    localStorage.setItem("patients", JSON.stringify(mockPatients));
    loadPatientData();
    savePatientData();
}

//Begin realtime vitals updates
if (!patients[0].heartRate) {    //only force a vitals refresh if the values are uninitialized
    console.log("Manually initialized vitals");
    setRealtimeVitals();
}
setInterval(setRealtimeVitals, 10000);

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

function setRealtimeVitals() {
    // console.log("Updating vitals")

    for(let p of patients) {
        p.heartRate = 80 + (-10 + Math.round(Math.random() * 20));
        p.systolic = 130 + Math.round(Math.random() * 10);
        p.diastolic = 85 + Math.round(Math.random() * 10);
        p.oxygenLevel = (96 + (-2 + Math.random() * 4)).toPrecision(4);
        p.carbonDioxideLevel = (40 + (-15 + Math.random() * 30)).toPrecision(4);
    }

    if (patient) {
        patient = patients.find(x => x.id === patient.id);  //Update data for the current patient if he exists on the page
    }
    savePatientData();
};


function simCrisis(){

    var patient = Math.floor(Math.random() * 3);
    var vital_pick = Math.round(Math.random());
    var sfx = new Audio("assets/alert_sfx.mp3");
    
    if(vital_pick == 0){
        patients[patient].heartRate -= 30;
        savePatientData();
        if(patients[patient].heartRate > patients[patient].maximumHeartrateThreshold || patients[patient].heartRate < patients[patient].minimumHeartrateThreshold){
            alert(patients[patient].name + " is in cardiac distress!  Click the 'OK' button to assist them!");
            sfx.play();
            setTimeout(function(){
                alert(patients[patient].name + "'s heart rate will stabilize in just a moment.");
            },2000);
            setTimeout(function(){
                alert("Vital signs normal.");
            },2000);
        }
    }else{
        patients[patient].oxygenLevel -= 12.0;
        savePatientData();
        if(patients[patient].oxygenLevel < patients[patient].minimumO2Threshold){  
            alert(patients[patient].name + "'s oxygen levels are dangerously low!  Click the 'OK' button below to assist them!");  
            sfx.play();
            setTimeout(function(){
                alert(patients[patient].name + "'s oxygen levels will stabilize in just a moment.");
            },2000);
            setTimeout(function(){
                alert("Vital signs normal.");
            },2000);

        }
    }
}


function savePatientData() { //Write data to browser localStorage
    localStorage.setItem("patients", JSON.stringify(patients));
    localStorage.setItem("patient", JSON.stringify(patient));
}
function loadPatientData() { //Load data from browser localStorage
    patients = JSON.parse(localStorage.getItem("patients"));
    patient = JSON.parse(localStorage.getItem("patient"));
}

// Remove user from localStorage, redirect
function logout() {
    localStorage.removeItem("user");
    window.location.href = "login_page.html";
}