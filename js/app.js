const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const formTitle = document.getElementById("formTitle");
const saveBtn = document.getElementById("saveBtn");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("taskId").value;
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const priority = document.getElementById("priority").value;
    const dueDate = document.getElementById("dueDate").value;

    const tasks = getTasks();

    if (id) {
        const task = tasks.find(function (t) {
            return t.id === id;
        });
        if (task) {
            task.title = title;
            task.description = description;
            task.priority = priority;
            task.dueDate = dueDate;
        }
    } else {
        tasks.push({
            id: Date.now().toString(),
            title: title,
            description: description,
            priority: priority,
            createdAt: new Date().toISOString(),
            dueDate: dueDate,
            completed: false
        });
    }

    saveTasks(tasks);
    resetForm();
    renderTasks();
});

function resetForm() {
    taskForm.reset();
    document.getElementById("taskId").value = "";
    formTitle.textContent = "Add New Task";
    saveBtn.textContent = "Save Task";
}

document.getElementById("cancelBtn").addEventListener("click", resetForm);
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

taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("edit-btn")) {
        const id = event.target.closest(".task-item").dataset.id;
        startEdit(id);
    }
});

function startEdit(id) {
    const task = getTasks().find(function (t) {
        return t.id === id;
    });
    if (!task) return;

    document.getElementById("taskId").value = task.id;
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("priority").value = task.priority;
    document.getElementById("dueDate").value = task.dueDate;

    formTitle.textContent = "Edit Task";
    saveBtn.textContent = "Update Task";
    taskForm.scrollIntoView({ behavior: "smooth" });
}
document.getElementById("searchInput").addEventListener("input", renderTasks);
renderTasks();
