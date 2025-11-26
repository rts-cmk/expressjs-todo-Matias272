const apiBase = '/api/tasks';

async function fetchTasks() {
  const res = await fetch(apiBase);
  return res.json();
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = task.done ? 'done' : '';
  li.dataset.id = task.id;

  const text = document.createElement('span');
  text.textContent = task.text;
  text.addEventListener('click', () => toggleDone(task.id, !task.done));

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.addEventListener('click', () => deleteTask(task.id));

  li.appendChild(text);
  li.appendChild(del);
  return li;
}

async function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  const tasks = await fetchTasks();
  tasks.forEach(task => list.appendChild(createTaskElement(task)));
}

async function addTask(text) {
  const res = await fetch(apiBase, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (res.ok) {
    await render();
  } else {
    alert('Failed to add task');
  }
}

async function deleteTask(id) {
  const res = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
  if (res.status === 204) await render();
  else alert('Failed to delete');
}

async function toggleDone(id, done) {
  const res = await fetch(`${apiBase}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done })
  });
  if (res.ok) await render();
}

document.getElementById('addTask').addEventListener('click', async () => {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  await addTask(text);
});

document.getElementById('taskInput').addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    document.getElementById('addTask').click();
  }
});

render();
