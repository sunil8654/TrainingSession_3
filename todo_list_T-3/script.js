document.getElementById('addTaskButton').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const taskList = document.getElementById('taskList');

    // Create a new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Task buttons container
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task-buttons');

    // Complete button
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.className = 'complete';
    completeButton.addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Edit button
    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.className = 'edit';
    editButton.addEventListener('click', function() {
        const newTaskText = prompt('Edit your task', taskText);
        if (newTaskText !== null) {
            li.firstChild.textContent = newTaskText;
        }
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);
    });

    // Append buttons to the list item
    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    li.appendChild(taskButtons);

    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
});
