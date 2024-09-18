document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.getElementById('addTaskForm');
    const taskTableBody = document.getElementById('taskTableBody');
    const updatePopup = document.getElementById('updatePopup');
    const closeBtn = document.querySelector('.close-btn');
    const updateForm = document.getElementById('updateForm');

    addTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(addTaskForm);
        const data = new URLSearchParams(formData).toString();

        const response = await fetch('/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: data
        });

        if (response.ok) {
            window.location.reload();
        }
    });

    taskTableBody.addEventListener('click', async (event) => {
        if (event.target.classList.contains('form-update-btn')) {
            const row = event.target.closest('tr');
            const taskId = row.getAttribute('data-task-id');

            const response = await fetch(`/get_task/${taskId}`);
            const task = await response.json();

            document.getElementById('updateTaskId').value = taskId;
            document.getElementById('updateTask').value = task.task;
            document.getElementById('updateDescription').value = task.description;
            document.getElementById('updateDueTime').value = task.due_time;
            document.getElementById('updatePriorityLevel').value = task.priority_level;
            document.getElementById('updateStatus').value = task.status;

            updatePopup.style.display = 'flex';
        }

        
    });

    closeBtn.addEventListener('click', () => {
        updatePopup.style.display = 'none';
    });

    updateForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const taskId = document.getElementById('updateTaskId').value;
        const task = document.getElementById('updateTask').value;
        const description = document.getElementById('updateDescription').value;
        const dueTime = document.getElementById('updateDueTime').value;
        const priorityLevel = document.getElementById('updatePriorityLevel').value;
        const status = document.getElementById('updateStatus').value;

        const response = await fetch(`/update/${taskId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                task,
                description,
                due_time: dueTime,
                priority_level: priorityLevel,
                status
            })
        });

        if (response.ok) {
            window.location.reload();
        }
    });
});
