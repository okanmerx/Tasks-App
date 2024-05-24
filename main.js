
const btnAdd = document.querySelector('nav button');
const modal = document.getElementById('overlay');
const btnCancel = document.querySelector("#overlay button[type='reset']");
const form = document.querySelector('#overlay form');
const taskContainer = document.getElementById('tasks');

btnAdd.addEventListener('click', showModal);
btnCancel.addEventListener('click', hideModal);

let todos = [
  {
    id: 1,
    desc: 'Study React',
    date: '2024-05-01',
    completed: false,
  },
  { id: 2, desc: 'Study CSS', date: '2024-05-02', completed: true },
  { id: 3, desc: 'Study JS', date: '2024-04-25', completed: true },
];

const temp = localStorage.getItem('todos');

console.log(temp);

if (temp) {
  todos = JSON.parse(temp);
}

function renderTodos(data) {
  data.sort((a, b) => a.date.localeCompare(b.date));
  console.log(data);
  const html = data.map(
    (item) => `
    <div class="task ${item.completed && 'completed'}" id="task-${item.id}">
  <input type="checkbox" class="check"  ${item.completed && 'checked'}/>
  <div class="task-details">
    <h3 class="task-title">${item.desc}</h3>
    <small> ${item.date}</small>
  </div>
  <div class="actions">
    <button><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete-btn">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
</div>
    `
  );

  taskContainer.innerHTML = html.join('');
}

renderTodos(todos);

function showModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
}

function hideModal() {
  modal.classList.remove('show');
  modal.classList.add('hide');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = document.querySelector('#overlay input').value;

  todos.push({
    id: Math.ceil(Math.random() * 1000),
    desc: task,
    completed: false,
    date: new Date().toISOString().slice(0, 10),
  });

  renderTodos(todos);

  localStorage.setItem('todos', JSON.stringify(todos));

  form.reset();

  hideModal();
  updateCounts();
});

function updateCounts() {

  const allTasks = todos.length;
  console.log(allTasks);


  const completedTasks = todos.filter((item) => item.completed).length;
  console.log(completedTasks);

  const allPTags = document.querySelectorAll('#stats p');
  console.log(allPTags);
  allPTags[0].textContent = completedTasks;
  allPTags[1].textContent = allTasks - completedTasks;
  allPTags[2].textContent = allTasks;
}

updateCounts();

function handleTodo(e) {
  console.log(e.target);
  if (e.target.classList.contains('fa-trash')) {
   

    const id = Number(e.target.closest('.task').id.slice(5));

    todos = todos.filter((item) => item.id !== id);
    renderTodos(todos);
    updateCounts();

    localStorage.setItem('todos', JSON.stringify(todos));
  }
  if (e.target.classList.contains('check')) {
    
    const id = Number(e.target.closest('.task').id.slice(5));
    const todo = todos.find((item) => item.id === id);
    todo.completed = !todo.completed;
    renderTodos(todos);
    updateCounts();
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

taskContainer.addEventListener('click', handleTodo);

document.querySelector('nav input').addEventListener('change', (e) => {
  console.log(e.target.value);

  const temp = todos.filter((item) =>
    item.desc.toLowerCase().includes(e.target.value.toLowerCase())
  );

  renderTodos(temp);
});
