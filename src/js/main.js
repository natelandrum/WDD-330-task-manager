import { getTasks, createTask, updateTask, deleteTask } from "./api.js";
import TaskList from "../components/TaskList.js";
import TaskForm from "../components/TaskForm.js";
import { dateInput } from "../utils/dateInput.js";
import { validate } from "../utils/validate.js";
import { filterTasks } from "../utils/filter.js";
import { searchTasks } from "../utils/search.js";

const app = document.getElementById("app");

const render = async (option=null) => {
    app.innerHTML = `
        <h1>Task Manager</h1>
        <div id="task-form-container"></div>
        <div id="task-list-container"></div>
    `;

    const taskFormContainer = document.getElementById("task-form-container");
    const taskListContainer = document.getElementById("task-list-container");

    const tasks = await getTasks();
    if (!tasks.length || option === "task-form-container") {
        taskListContainer.style.display = "none";
        taskFormContainer.classList.add("animate-in");


    }
    else {
        taskFormContainer.style.display = "none";
        taskListContainer.classList.add("animate-in");
    }
    taskFormContainer.appendChild(TaskForm({ onSubmit: async (task) => {
        await createTask(task);
        render();
    }}));
    await dateInput();
    await validate();

    taskListContainer.appendChild(TaskList({
        tasks,
        onUpdate: async (task) => {
            const id = task._id;
            delete task._id;
            await updateTask(id, task);
        },
        onDelete: async (id) => {
            await deleteTask(id);
            document.querySelector(`input[data-id="${id}"]`).parentElement.remove();
            if (!document.querySelector(".list-item")) {
                render("task-form-container");
            }
        }
    }));
    filterTasks();
    searchTasks();
    document.getElementById("add-task").addEventListener("click", () => {
        render("task-form-container")
    });
};


render();
