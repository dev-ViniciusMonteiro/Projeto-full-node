document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const newTaskInput = document.getElementById("newTask");
  const addTaskButton = document.getElementById("addTask");

  const refreshTasks = async () => {
    taskList.innerHTML = ""; // Limpa a lista de tarefas antes de atualizar
    const response = await fetch("/tasks");
    const tasks = await response.json();

    tasks.forEach(task => {
      const listItem = document.createElement("li");
      listItem.textContent = task.task;
      taskList.appendChild(listItem);
    });
  };

  const addTask = async () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      await fetch("/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: taskText })
      });

      newTaskInput.value = "";
      refreshTasks(); // Atualiza a lista após adicionar uma nova tarefa
    }
  };

  addTaskButton.addEventListener("click", addTask);

  newTaskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });

  refreshTasks(); // Atualiza a lista de tarefas ao carregar a página
});
