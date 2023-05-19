const taskLists = document.querySelectorAll('.task-list');
const inboxTasks = document.querySelector('#inbox .task-list');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const submitButton = document.querySelector('#submit-button');
const errorContainer = document.querySelector('.error-container');

let tasks = [
  {
    id: 0,
    title: 'Fix submit button',
    description:
      'The submit button has stopped working since the last release.',
  },
  {
    id: 1,
    title: "Change text on T and C's",
    description:
      'The terms and conditions need updating as per the business meeting.',
  },
  {
    id: 2,
    title: 'Change banner picture',
    description:
      'Marketing has requested a new banner to be added to the website.',
  },
];

taskLists.forEach(taskList => {
  taskList.addEventListener('dragover', dragOver);
  taskList.addEventListener('drop', dragDrop);
});

function createTask(taskId, title, description) {
  const taskCard = document.createElement('div');
  const taskHeader = document.createElement('div');
  const taskTitle = document.createElement('p');
  const taskDescriptionContainer = document.createElement('div');
  const taskDescription = document.createElement('p');
  const deleteIcon = document.createElement('p');

  taskCard.classList.add('task-container');
  taskHeader.classList.add('task-header');
  taskDescriptionContainer.classList.add('task-description-container');

  taskTitle.textContent = title;
  taskDescription.textContent = description;
  deleteIcon.textContent = 'ⓧ';

  taskCard.setAttribute('draggable', true);
  taskCard.setAttribute('task-id', taskId);

  taskCard.addEventListener('dragstart', dragStart);
  deleteIcon.addEventListener('click', deleteTask);

  taskHeader.append(taskTitle, deleteIcon);
  taskDescriptionContainer.append(taskDescription);
  taskCard.append(taskHeader, taskDescriptionContainer);
  inboxTasks.append(taskCard);
}

function addColor(column) {
  switch (column) {
    case 'inbox':
      color = '#317fc3';
      break;
    case 'in-progress':
      color = '#51ce59';
      break;
    case 'complete':
      color = '#a1946a';
      break;
    case 'discard':
      color = '#c33131';
      break;
    default:
      color = '#317fc3';
  }
  return color;
}

function addTasks() {
  tasks.forEach(task => createTask(task.id, task.title, task.description));
}

addTasks();

let elementBeingDragged;

function dragStart() {
  elementBeingDragged = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const columnId = this.parentNode.id;
  elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId);
  this.append(elementBeingDragged);
}

function showError(message) {
  const errorMessage = document.createElement('p');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  errorContainer.append(errorMessage);

  setTimeout(() => {
    errorContainer.textContent = '';
  }, 3000);
}

function addTask(e) {
  e.preventDefault();
  const filteredTitles = tasks.filter(task => {
    return task.title === titleInput.value;
  });

  if (!filteredTitles.length) {
    const newId = tasks.length;

    tasks.push({
      id: newId,
      title: titleInput.value,
      description: descriptionInput.value,
    });
    createTask(newId, titleInput.value, descriptionInput.value);
    titleInput.value = '';
    descriptionInput.value = '';
  } else {
    showError('Title must be unique!');
  }
}

submitButton.addEventListener('click', addTask);

function deleteTask() {
  const headerTitle = this.parentNode.firstChild.textContent;
  const filteredTasks = tasks.filter(task => {
    return task.title === headerTitle;
  });
  tasks = tasks.filter(task => {
    return task !== filteredTasks[0];
  });
  this.parentNode.parentNode.remove();
}
