function createTaskCard(task) {
    return `
        <div class="task-item" data-id="${task.id}">
            <input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}>
            <div class="task-info">
                <h4>${escapeHtml(task.title)}</h4>
                <p>${escapeHtml(task.description)}</p>
                <small>Created: ${formatDate(task.createdAt)}</small>
            </div>
            <span class="badge ${task.priority}">${task.priority}</span>
            <span class="due">Due: ${formatDate(task.dueDate)}</span>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
}

function renderTasks() {
    const tasks = getTasks();
    const list = document.getElementById("taskList");
    const empty = document.getElementById("emptyState");

    list.innerHTML = tasks.map(createTaskCard).join("");
    empty.style.display = tasks.length === 0 ? "block" : "none";
}
