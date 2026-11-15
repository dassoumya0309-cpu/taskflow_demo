function createTaskCard(task) {
    return `
        <div class="task-item ${task.completed ? "completed" : ""}" data-id="${task.id}">
            <input type="checkbox" class="task-check" ${task.completed ? "checked" : ""}>
            <div class="task-info">
                <h4>${escapeHtml(task.title)}</h4>
                <p>${escapeHtml(task.description)}</p>
                <small>Created: ${formatDate(task.createdAt)}</small>
            </div>
            <span class="badge ${task.priority}">${task.priority}</span>
            <span class="due ${getDueClass(task)}">Due: ${formatDate(task.dueDate)}</span>
            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        </div>
    `;
}

function getVisibleTasks() {
    let tasks = getTasks();

    const query = document.getElementById("searchInput").value.trim().toLowerCase();
    if (query) {
        tasks = tasks.filter(function (t) {
            return t.title.toLowerCase().includes(query);
        });
    }

    const status = document.getElementById("statusFilter").value;
    if (status === "pending") {
        tasks = tasks.filter(function (t) {
            return !t.completed;
        });
    } else if (status === "completed") {
        tasks = tasks.filter(function (t) {
            return t.completed;
        });
    }

    const priority = document.getElementById("priorityFilter").value;
    if (priority !== "all") {
        tasks = tasks.filter(function (t) {
            return t.priority === priority;
        });
    }

    const deadline = document.getElementById("deadlineFilter").value;
    const today = getTodayString();
    if (deadline === "today") {
        tasks = tasks.filter(function (t) {
            return t.dueDate === today;
        });
    } else if (deadline === "week") {
        const weekEnd = getDateOffsetString(7);
        tasks = tasks.filter(function (t) {
            return t.dueDate >= today && t.dueDate <= weekEnd;
        });
    } else if (deadline === "overdue") {
        tasks = tasks.filter(isOverdue);
    }

    const sortBy = document.getElementById("sortSelect").value;
    const order = { high: 0, medium: 1, low: 2 };
    tasks = tasks.slice();
    if (sortBy === "dueDate") {
        tasks.sort(function (a, b) {
            return a.dueDate.localeCompare(b.dueDate);
        });
    } else if (sortBy === "priority") {
        tasks.sort(function (a, b) {
            return order[a.priority] - order[b.priority];
        });
    } else if (sortBy === "status") {
        tasks.sort(function (a, b) {
            return Number(a.completed) - Number(b.completed);
        });
    }

    return tasks;
}

function renderTasks() {
    const tasks = getVisibleTasks();
    const list = document.getElementById("taskList");
    const empty = document.getElementById("emptyState");

    list.innerHTML = tasks.map(createTaskCard).join("");
    empty.style.display = tasks.length === 0 ? "block" : "none";
    updateDashboard();
}

function updateDashboard() {
    const tasks = getTasks();
    const total = tasks.length;
    const completed = tasks.filter(function (t) {
        return t.completed;
    }).length;
    const pending = total - completed;
    const overdue = tasks.filter(isOverdue).length;

    document.getElementById("totalCount").textContent = total;
    document.getElementById("pendingCount").textContent = pending;
    document.getElementById("completedCount").textContent = completed;
    document.getElementById("overdueCount").textContent = overdue;
}