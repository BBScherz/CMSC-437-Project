$(document).ready(function(){
    $("#add-condition").click(function () {
        var newDIV = $(document.createElement("div"));
        var newConditon = document.getElementById("new_condition").value;
        newDIV.after().html(
            '<label class = condition style="border-color:red; border-style:solid;">'+ newConditon + 
            '</label>'
        );
        newDIV.appendTo("#conditionList");
    });

    $("#delete-condition").click(function () {
        var condition = document.getElementById("new_condition").value;
        var element = document.getElementById("conditions");
        var list = element.querySelectorAll("label.condition");
        for(var i=0; i < list.length; i++){
            if(condition == list[i].innerHTML){
                list[i].remove();
            }
        }
    });

    $("#add-med").click(function () {
        var newDIV = $(document.createElement("div"));
        var newMedication = document.getElementById("new_med").value;
        newDIV.after().html(
            '<label class = medics style="border-color:green; border-style:solid;">'+ newMedication + 
            '</label>'
        );
        newDIV.appendTo("#medicationList");
    });

    $("#delete-med").click(function () {
        var condition = document.getElementById("new_med").value;
        var element = document.getElementById("medication");
        var list = element.querySelectorAll("label.medics");
        for(var i=0; i < list.length; i++){
            if(condition == list[i].innerHTML){
                list[i].remove();
            }
        }
    });
});