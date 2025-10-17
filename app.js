document.addEventListener('DOMContentLoaded', function() {
    // TASK MANAGER
    const list = document.querySelector('#task-list ul');
    const addForm = document.forms['box'];
    const input = addForm.querySelector('input[type="text"]');

    // Load tasks from localStorage on page load
    loadTasks();

    // Add Task
    addForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = input.value.trim();
        if (!value) return;

        createTaskElement(value);
        saveTask(value);

        input.value = '';
    });

    // Delete Task
    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            const taskText = e.target.previousSibling.textContent;
            deleteTaskFromStorage(taskText);

            const li = e.target.parentElement;
            list.removeChild(li);
        }
    });

    // Create Task Element (Reusable)
    function createTaskElement(text) {
        const li = document.createElement('li');
        const taskName = document.createElement('span');
        const deleteTsk = document.createElement('span');

        taskName.textContent = text;
        deleteTsk.textContent = 'delete';

        taskName.classList.add('task');
        deleteTsk.classList.add('delete');

        li.append(taskName, deleteTsk);
        list.append(li);
    }

    // Save Task to Local Storage
    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Delete Task from Local Storage
    function deleteTaskFromStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load Tasks from Local Storage
    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    // THEME TOGGLE
    const sun = document.querySelector('.sun');
    const moon = document.querySelector('.moon');
    const body = document.body;

    function setLightTheme() {
        body.classList.add('light');
        body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }

    function setDarkTheme() {
        body.classList.add('dark');
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark');
    }

    sun.addEventListener('click', setLightTheme);
    moon.addEventListener('click', setDarkTheme);

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
});
