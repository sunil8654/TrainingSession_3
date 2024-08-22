// script.js

document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('search-tasks').addEventListener('input', filterTasks);
document.querySelectorAll('input[name="filter"]').forEach(filter => {
    filter.addEventListener('change', filterTasks);
});

function addTask() {
    const title = document.getElementById('task-title').value;
    const desc = document.getElementById('task-desc').value;
    const date = document.getElementById('task-date').value;

    if (title === '' || date === '') {
        alert('Title and due date are required');
        return;
    }

    const task = { title, desc, date, completed: false };
    saveTask(task);
    renderTask(task);
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
}

function renderTask(task) {
    const taskList = document.getElementById('task-list');
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
        <span>
            <strong>${task.title}</strong> - ${task.desc} (Due: ${task.date})
        </span>
        <span class="task-actions">
            <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </span>
    `;

    li.querySelector('.complete').addEventListener('click', () => toggleComplete(task, li));
    li.querySelector('.edit').addEventListener('click', () => editTask(task, li));
    li.querySelector('.delete').addEventListener('click', () => deleteTask(task, li));

    taskList.appendChild(li);
}

function toggleComplete(task, li) {
    task.completed = !task.completed;
    li.classList.toggle('completed');
    saveTasks();
}

function editTask(task, li) {
    const title = prompt('Edit Task Title', task.title);
    const desc = prompt('Edit Task Description', task.desc);
    const date = prompt('Edit Task Due Date', task.date);

    if (title !== null && date !== null) {
        task.title = title;
        task.desc = desc;
        task.date = date;

        li.querySelector('strong').innerText = task.title;
        li.querySelector('span').innerText = `${task.title} - ${task.desc} (Due: ${task.date})`;
        saveTasks();
    }
}

function deleteTask(task, li) {
    if (confirm('Are you sure you want to delete this task?')) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.findIndex(t => t.title === task.title && t.date === task.date);
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.remove();
    }
}

function filterTasks() {
    const text = document.getElementById('search-tasks').value.toLowerCase();
    const filter = document.querySelector('input[name="filter"]:checked').value;
    const tasks = document.querySelectorAll('#task-list li');

    tasks.forEach(li => {
        const title = li.querySelector('strong').innerText.toLowerCase();
        const matchesText = title.includes(text);
        const matchesFilter = (filter === 'all') || (filter === 'completed' && li.classList.contains('completed')) || (filter === 'incomplete' && !li.classList.contains('completed'));

        if (matchesText && matchesFilter) {
            li.style.display = '';
        } else {
            li.style.display = 'none';
        }
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const title = li.querySelector('strong').innerText;
        const desc = li.querySelector('span').innerText.split(' - ')[1].split(' (Due: ')[0];
        const date = li.querySelector('span').innerText.split('Due: ')[1].split(')')[0];
        const completed = li.classList.contains('completed');

        tasks.push({ title, desc, date, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
