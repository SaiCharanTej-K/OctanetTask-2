document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterDateInput = document.getElementById('filter-date');
    const toggleTasksBtn = document.getElementById('toggle-tasks-btn');

    let tasks = [];

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    filterDateInput.addEventListener('change', filterTasks);
    toggleTasksBtn.addEventListener('click', toggleTaskList);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;

        if (taskText !== '' && taskDate !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                date: taskDate,
                isEditing: false
            };
            tasks.push(task);
            taskInput.value = '';
            taskDateInput.value = '';
            displayTasks();
        }
    }

    function displayTasks() {
        taskList.innerHTML = '';
        const filteredTasks = filterDateInput.value ? tasks.filter(task => task.date === filterDateInput.value) : tasks;

        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${task.isEditing ? `<input type="text" value="${task.text}" class="edit-input">` : `<span>${task.text} (${task.date})</span>`}
                <button class="edit-btn">${task.isEditing ? 'Save' : 'Edit'}</button>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);

            const editBtn = li.querySelector('.edit-btn');
            const deleteBtn = li.querySelector('.delete-btn');

            editBtn.addEventListener('click', () => {
                if (task.isEditing) {
                    const editInput = li.querySelector('.edit-input');
                    task.text = editInput.value;
                }
                task.isEditing = !task.isEditing;
                displayTasks();
            });

            deleteBtn.addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                displayTasks();
            });
        });
    }

    function filterTasks() {
        displayTasks();
    }

    function toggleTaskList() {
        taskList.classList.toggle('hidden');
    }
});
