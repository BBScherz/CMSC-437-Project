var db = {};
function login(){

    var nurse = document.getElementById("nur").value;
    var doctor = document.getElementById("doc").value;
    var role;
    var user;
    var name = document.getElementById("name").value;

    

        if(document.getElementById("nur").checked){

            if(name){

                role = nurse;
                db[0] = {NAME: name, ROLE: role};
                user = JSON.stringify(db);

                localStorage.setItem("local_list", user);
                console.log(db);
                console.log(user);
            }else{

                alert("Please enter your name to log-in.")
            }
        }else if(document.getElementById("doc").checked){

            if(name){

                role = doctor;
                db[0] = {NAME: name, ROLE: role};
                user = JSON.stringify(db);

                localStorage.setItem("local_list", user);
                console.log(db);
                console.log(user);
            }else{

                alert("Please enter your name to log-in.")
            }
        }else{

            alert("Please select a designation to log-in.");
        }

    

    

    
}