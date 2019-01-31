document.getElementById('taskInputForm').addEventListener('submit', saveTask);

var tasks = this.tasksList();

function buildHeap() {
  var tasks = this.tasksList();
  for (var i = tasks.length - 1; i > 0; i--) {
    heapifyDown(i);
  }
  fetchTasks();
}

function heapifyUp(index) {
  var tasks = this.tasksList();
  var priority = tasks[0];
  var parent = Math.floor(index/2);

  if (index !== 1) {
    if (compare(tasks[index], tasks[parent], priority)) {
      swap(index, parent);
      console.log(index);
      heapifyUp(parent);
    }
  }
}

function heapifyDown(index) {
  var tasks = this.tasksList();
  var priority = tasks[0];
  var size = tasks.length;
  var highestPriority = index;
  var left = 2*index;
  var right = 2*index+1;

  if (left <= size - 1) {
    if (compare(tasks[left], tasks[highestPriority], priority))
      highestPriority = left;
  }

  if (right <= size - 1) {
    if (compare(tasks[right], tasks[highestPriority], priority))
      highestPriority = right;
  }

  if (highestPriority !== index) {
    swap(index, highestPriority);
    heapifyDown(highestPriority);
  }
}

function compare(firstElement, secondElement, priority) {
  //var p = (priority === "quickest") ? "time" : "difficulty";
  var p = "time";
  return (firstElement[p] < secondElement[p]);
}

function swap(firstIndex, secondIndex) {
  var tasks = this.tasksList();
  if (secondIndex === "last")
    secondIndex = tasks.length - 1;

  var tmp = tasks[firstIndex];

  tasks[firstIndex] = tasks[secondIndex];
  tasks[secondIndex] = tmp;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  //fetchTasks();
}

function changePriority() {
  var tasks = this.tasksList();
  var tasksList = document.getElementById('tasksList');
  var priorityBox = document.getElementById("priorityBox");
  var priority;
  if (tasks[0] === "soonest")
    priority = "easiest";
  else if (tasks[0] === "easiest")
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
  var tasks = this.tasksList();
  var tasksList = document.getElementById('tasksList');
  
  tasksList.innerHTML = '';


  if (tasks.length > 0) {
    for(var i = 1; i < tasks.length; i++)
    {
      var element = tasks[i];
      var {id, desc, time, difficulty, dueDate, completionStatus} = element;
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
  var id = chance.guid(); //not sure if needed
  var desc = document.getElementById('taskDescInput').value;
  var difficulty = document.getElementById('taskDifficultyInput').value;
  var time = document.getElementById('taskTimeInput').value;
  var dueDate = document.getElementById('taskDueDateInput').value;    // make into if statement
  //const tasks = tasksList();
  var tasks = JSON.parse(localStorage.getItem('tasks')) || ["soonest"];

  tasks.push({
    id,
    desc,
    difficulty,
    time,
    dueDate,
    completionStatus: 'To Do'
  });

  
  localStorage.setItem('tasks', JSON.stringify(tasks))
  heapifyUp(tasks.length - 1);
  document.getElementById('taskInputForm').reset();   //resets form
  fetchTasks();   //makes new list of all forms (prob can do better, by just adding it)

  e.preventDefault(); // prevents default form to be submitted
}

function pop() {
  swap(1, "last");
  var tasks = this.tasksList();
  console.log(tasks.pop());
  localStorage.setItem('tasks', JSON.stringify(tasks));  

  heapifyUp(tasks.length - 1);
  // tasks.pop();
  // localStorage.setItem('tasks', JSON.stringify(tasks));
  //heapifyUp(tasks.length - 1);
}

function deleteTask(id) {
  var tasks = this.tasksList();
  var taskToDelete = tasks.find(taskToFind => {
    return taskToFind.id === id
  });

  var indOf = tasks.indexOf(taskToDelete)
  tasks.splice(indOf, 1)
  localStorage.setItem('tasks', JSON.stringify(tasks));
  fetchTasks();
}
