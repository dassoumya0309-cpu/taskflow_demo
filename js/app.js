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
    console.log(getTasks());
});