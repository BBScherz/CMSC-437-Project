var db = [];
var user = "";

function login(){

    var nurse = document.getElementById("nur").value;
    var doctor = document.getElementById("doc").value;
    var role;
    var name = document.getElementById("name").value;

    

        if(document.getElementById("nur").checked){

            if(name){

                role = nurse;
                db[0] = {NAME: name, ROLE: role};
                user = JSON.stringify(db);

                localStorage.setItem("logged", user);
                console.log(db);
                console.log(user);

                alert(db[0].NAME + "is logged in as a " + db[0].ROLE);
            }else{

                alert("Please enter your name to log-in.")
            }
        }else if(document.getElementById("doc").checked){

            if(name){

                role = doctor;
                db[0] = {NAME: name, ROLE: role};
                user = JSON.stringify(db);

                localStorage.setItem("logged", user);
                console.log(db);
                console.log(user);

                alert(db[0].NAME + "is logged in as a " + db[0].ROLE);
            }else{

                alert("Please enter your name to log-in.")
            }
        }else{

            alert("Please select a designation to log-in.");
        }
    
}

function check_login(){

    if(user == ""){

        alert("Nobody is logged in");
    }
    else{

        alert("Someone is logged in");
    }
    
}

function signout(){


    localStorage.removeItem("logged");
    user = "";
    db = 0;

    /*Debugging for system
    document.getElementById("nur").checked = false;
    document.getElementById("doc").checked = false;
    document.getElementById("name").value = "";
    */
}