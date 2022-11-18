var taskIdCounter = 0;
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");
var pageContentE1 = document.querySelector("#page-content");
var tasksInProgressE1 = document.querySelector('#tasks-in-progress');
var tasksCompletedE1 = document.querySelector('#tasks-completed');
var tasks = [];

var taskFormHandler = function (event) {
    event.preventDefault();
    
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    //check if inputs are empty (validate)
      if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
      }
      
      //reset form fields for next task to be entered
      document.querySelector("input[name='task-name']").value = "";
      document.querySelector("select[name='task-type']").selectedIndex = 0;

    
  var isEdit = formE1.hasAttribute("data-task-id");

  if (isEdit) {
    var taskId = formE1.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status: "to do"
    };

    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);
    console.log(taskDataObj);
    console.log(taskDataObj.status);
    
  }
};

var createTaskE1 = function (taskDataObj) {
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    
    listItemE1.setAttribute("data-task-id", taskIdCounter);
    
    var taskInfoE1 = document.createElement("div");
    
    taskInfoE1.className = "task-info";
    
    taskInfoE1.innerHTML =
    "<h3 class ='task-name'>" +
    taskDataObj.name +
    "</h3><span class='task-type'>" +
    taskDataObj.type +
    "</span>";
    
    listItemE1.appendChild(taskInfoE1);
    
    var taskActionsE1 = createTaskActions(taskIdCounter);
    
    listItemE1.appendChild(taskActionsE1);
    
    tasksToDoE1.appendChild(listItemE1);

    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);
    
    // increase task counter for next unique id
    
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    
    //create edit button
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId);
    
    actionContainerE1.appendChild(editButtonE1);
    
    //create delete button
    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent = "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);
    
    actionContainerE1.appendChild(deleteButtonE1);
    
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);
    
    var statusChoices = ["To Do", "In Progress", "Completed"];
    
    for (let i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent = statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);
        
        //append to select
        statusSelectE1.appendChild(statusOptionE1);
    }
    actionContainerE1.appendChild(statusSelectE1);
    
    return actionContainerE1;
};

var completeEditTask = function (taskName, taskType, taskId) {

  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  alert("Task Updated!");

  // loop through tasks array and task object with new content 
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].name = taskType;
    }
    
  };

  formE1.removeAttribute("data-task-id");
  formE1.querySelector("#save-task").textContent = "Add Task";
};
formE1.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function (event) {
  // get element from event
  var targetE1 = event.target;
  
  // edit button was clicked
  
  if (targetE1.matches(".edit-btn")) {
    console.log("edit", targetE1);
      var taskId = targetE1.getAttribute("data-task-id");
    editTask(taskId);
    // delete button was clicked
  } else if (targetE1.matches(".delete-btn")) {
    console.log("delete", targetE1);
    // get element's task id
    var taskId = targetE1.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};

pageContentE1.addEventListener("click", taskButtonHandler);

var taskStatusChangeHandler = function(event) {
    //get the task item's id
    var taskId = event.target.getAttribute('data-task-id');

    
    //find the parent task item element based on the id 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    
    if (statusValue === 'to do') {
        tasksToDoE1.appendChild(taskSelected);
        
    } else if (statusValue === 'in progress') {

        tasksInProgressE1.appendChild(taskSelected);

    } else if (statusValue === 'completed' ) {

        tasksCompletedE1.appendChild(taskSelected);
    }

    //update task's in task array 
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;            
        }
        console.log(tasks);
    }

};

var editTask = function (taskId) {
  console.log(taskId);
  // get task list item element
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  //write values of taskName and taskType to form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  //set data attribute to the form with a value of the task's id so it knows which one is being edited
  formE1.setAttribute("data-task-id", taskId);
  //update form's button to reflect editing a task rather than creating a new on
  formE1.querySelector("#save-task").textContent = "Save Task";
};

var deleteTask = function (taskId) {
    console.log(taskId);
  var taskSelected = document.querySelector(
    ".task-item[data-task-id='" + taskId + "']"
  );
  taskSelected.remove();

  //create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    //if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);        
    }
    
  }

  // reassign tasks array to be the same as updatedTasksArr
  tasks = updatedTaskArr;


};

pageContentE1.addEventListener('change', taskStatusChangeHandler);