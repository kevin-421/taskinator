
var taskIdCounter = 0;
var formE1 = document.querySelector("#task-form");

var tasksToDoE1 = document.querySelector("#tasks-to-do");


var taskFormHandler = function(event) {
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;

    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
    
    //check if values are empty strings

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formE1.reset();
};

var createTaskE1 = function(taskDataObj) {

     var listItemE1 = document.createElement("li");
     listItemE1.className = "task-item";

     listItemE1.setAttribute("data-task-id", taskIdCounter);
 
     var taskInfoE1 = document.createElement("div");
 
     taskInfoE1.className = "task-info";
 
     taskInfoE1.innerHTML = "<h3 class ='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
     listItemE1.appendChild(taskInfoE1);
 
     tasksToDoE1.appendChild(listItemE1);

     taskIdCounter++;
 
};

var createTaskActions = function (taskId) {
    
}

formE1.addEventListener('submit' , taskFormHandler);
    