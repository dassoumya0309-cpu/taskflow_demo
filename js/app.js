const taskForm = document.getElementById("taskForm");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = {
        id: Date.now().toString(),
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        priority: document.getElementById("priority").value,
        createdAt: new Date().toISOString(),
        dueDate: document.getElementById("dueDate").value,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    taskForm.reset();
    renderTasks();
});
const taskList = document.getElementById("taskList");

taskList.addEventListener("change", function (event) {
    if (event.target.classList.contains("task-check")) {
        const id = event.target.closest(".task-item").dataset.id;
        toggleTask(id);
    }
});

function toggleTask(id) {
    const tasks = getTasks();
    const task = tasks.find(function (t) {
        return t.id === id;
    });

    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
        renderTasks();
    }
}

let taskToDelete = null;
const deleteModal = document.getElementById("deleteModal");

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("delete-btn")) {
        taskToDelete = event.target.closest(".task-item").dataset.id;
        deleteModal.classList.remove("hidden");
    }
});

document.getElementById("confirmDeleteBtn").addEventListener("click", function () {
    const tasks = getTasks().filter(function (t) {
        return t.id !== taskToDelete;
    });
    saveTasks(tasks);
    closeDeleteModal();
    renderTasks();
});

document.getElementById("cancelDeleteBtn").addEventListener("click", closeDeleteModal);

function closeDeleteModal() {
    taskToDelete = null;
    deleteModal.classList.add("hidden");
}
renderTasks();
