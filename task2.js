const projectForm = document.getElementById('projectForm');
const projectList = document.getElementById('projectList');

const projects = [];

// Handle project form submission
projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const projectName = document.getElementById('projectName').value;
  const projectDescription = document.getElementById('projectDescription').value;
  const projectDeadline = document.getElementById('projectDeadline').value;

  const newProject = {
    id: Date.now(),
    name: projectName,
    description: projectDescription,
    deadline: projectDeadline,
    tasks: [],
  };

  projects.push(newProject);
  displayProjects();
  projectForm.reset();
});

// Display projects
function displayProjects() {
  projectList.innerHTML = '';

  projects.forEach((project) => {
    const projectElement = document.createElement('li');
    projectElement.classList.add('project');
    projectElement.innerHTML = `
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <p><strong>Deadline:</strong> ${project.deadline}</p>
      <h4>Tasks:</h4>
      <ul class="task-list" id="taskList-${project.id}"></ul>
      <input type="text" id="taskInput-${project.id}" placeholder="New Task">
      <button onclick="addTask(${project.id})">Add Task</button>
    `;

    projectList.appendChild(projectElement);
    displayTasks(project);
  });
}

// Add task to a project
function addTask(projectId) {
  const taskInput = document.getElementById(`taskInput-${projectId}`);
  const taskName = taskInput.value;

  if (taskName.trim() === '') return;

  const project = projects.find((p) => p.id === projectId);
  project.tasks.push({ name: taskName, completed: false });

  displayTasks(project);
  taskInput.value = '';
}

// Display tasks for a project
function displayTasks(project) {
  const taskList = document.getElementById(`taskList-${project.id}`);
  taskList.innerHTML = '';

  project.tasks.forEach((task, index) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
      <span>${task.name}</span>
      <button onclick="toggleTask(${project.id}, ${index})">
        ${task.completed ? 'Undo' : 'Complete'}
      </button>
    `;

    if (task.completed) {
      taskElement.style.textDecoration = 'line-through';
    }

    taskList.appendChild(taskElement);
  });
}

// Toggle task completion
function toggleTask(projectId, taskIndex) {
  const project = projects.find((p) => p.id === projectId);
  project.tasks[taskIndex].completed = !project.tasks[taskIndex].completed;
  displayTasks(project);
}
