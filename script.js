function flipCard(button) {
  var card = button.parentNode;
  card.classList.toggle("flip");
  
}

function onSubmit() {
  var title = document.getElementById("title").value;
  var desc = document.getElementById("description").value;
  var deadline = document.getElementById("deadline").value;
  var taskPending = true;
  var data = {
    taskTitle: title,
    taskDesc: desc,
    taskDeadline: deadline,
    taskPending:taskPending
  };
  fetch("http://localhost:3000/api/addtask", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function getTasks() {
  fetch("http://localhost:3000/api/getTasks", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((tasks) => {
      console.log(tasks);
      const taskList = document.getElementById("pending_task_list");
     
      tasks.forEach(task => {
        // Create <li> element
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        // taskItem.
        const date = new Date(task.taskDeadline);
        const formattedDate = date.toISOString().split('T')[0];
      
        // Create <div> element for task title and deadline
        const titleDeadlineDiv = document.createElement("div");
      
        // Create <h4> element for task title
        const titleElement = document.createElement("h4");
        titleElement.classList.add("task-title");
        titleElement.textContent = task.taskTitle;
      
        // Create <p> element for task deadline
        const deadlineElement = document.createElement("p");
        deadlineElement.classList.add("task-deadline");
        deadlineElement.textContent = formattedDate;
      
        // Append the title and deadline elements to the titleDeadlineDiv
        // titleDeadlineDiv.appendChild(titleElement);
        // titleDeadlineDiv.appendChild(deadlineElement);
      
        // Create <p> element for task description
        const descElement = document.createElement("p");
        descElement.classList.add("task-desc");
        descElement.textContent = task.taskDesc;
      
        // Append the elements to the taskItem <li>
        taskItem.appendChild(titleElement);
        taskItem.appendChild(deadlineElement);
        taskItem.appendChild(descElement);
      
        // Append the taskItem <li> to the taskList <ul>
        taskList.appendChild(taskItem);
      });
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}
