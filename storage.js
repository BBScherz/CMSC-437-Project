var db = {};
function login(){

    var nurse = document.getElementById("nur").value;
    var doctor = document.getElementById("doc").value;
    var role;
    var name = document.getElementById("name").value;

    if(nurse == "Nurse"){

        role = nurse;
    }else{

        role = doctor;
    }

    db[0] = {NAME: name, ROLE: role};
    var user = JSON.stringify(db);

    localStorage.setItem("local_list", user);
    console.log(db);
    console.log(user);
}