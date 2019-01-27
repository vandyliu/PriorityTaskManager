document.getElementById('taskInputForm').addEventListener('submit', saveTask);

function changePriority() {
  const tasks = this.tasksList();
  const tasksList = document.getElementById('tasksList');
  const priorityBox = document.getElementById("priorityBox");
  var priority;
  if (tasks[0] == "soonest")
    priority = "easiest";
  else if (tasks[0] == "easiest")
    priority = "quickest";
  else
    priority = "soonest";

  tasks[0] = priority;
  priorityBox.innerHTML = `<div><h3>Priority: ${priority} </h3></div>`;

  localStorage.setItem('tasks', JSON.stringify(tasks))
}



function tasksList() {
    return localStorage.getItem('tasks') ? 
        JSON.parse(localStorage.getItem('tasks')) :
        ["soonest"];
}

function fetchTasks () {
  const tasks = this.tasksList();
  const tasksList = document.getElementById('tasksList');
  
  tasksList.innerHTML = '';


  if (tasks.length > 0) {
    for(var i = 1; i < tasks.length; i++)
    {
      var element = tasks[i];
      const {id, desc, time, difficulty, dueDate, completionStatus} = element;
      tasksList.innerHTML +=   `<div class="well">
            <h6>Task ID:  ${id} </h6>
            <p><span class="label label-info">${completionStatus}</span></p>
            <h3>${desc}</h3>
            <p><span class="glyphicon glyphicon-time"></span> ${time} hours </p>
            <p><span class="glyphicon glyphicon-calendar"></span> ${dueDate}</p>`+
            //<a href="#" class="btn btn-warning" onclick="completeTask('${id}')">Complete</a>
            `<a href="#" class="btn btn-danger" onclick="deleteTask('${id}')">Delete</a>
            </div>`;
    }
  }
}

function saveTask(e) {
  const id = chance.guid(); //not sure if needed
  const desc = document.getElementById('taskDescInput').value;
  const difficulty = document.getElementById('taskDifficultyInput').value;
  const time = document.getElementById('taskTimeInput').value;
  const dueDate = document.getElementById('taskDueDateInput').value;    // make into if statement
  //const tasks = tasksList();
  const tasks = JSON.parse(localStorage.getItem('tasks')) || ["soonest"];

  tasks.push({
    id,
    desc,
    difficulty,
    time,
    dueDate,
    completionStatus: 'To Do'
  });

  localStorage.setItem('tasks', JSON.stringify(tasks))
  document.getElementById('taskInputForm').reset();   //resets form

  fetchTasks();   //makes new list of all forms (prob can do better, by just adding it)

  e.preventDefault(); // prevents default form to be submitted
}

function deleteTask(id) {
  const tasks = this.tasksList();
  const taskToDelete = tasks.find(taskToFind => {
    return taskToFind.id === id
  });

  const indOf = tasks.indexOf(taskToDelete)
  tasks.splice(indOf, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks));

  fetchTasks();
}
