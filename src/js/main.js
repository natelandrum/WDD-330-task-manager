import { getTasks, createTask, updateTask, deleteTask } from "./api.js";
import TaskList from "../components/TaskList.js";
import TaskForm from "../components/TaskForm.js";
import { dateInput } from "../utils/dateInput.js";
import { validate } from "../utils/validate.js";
import { filterTasks } from "../utils/filter.js";
import { searchTasks } from "../utils/search.js";
import { notify } from "../utils/notify.js";
import DraftManager from "../components/DraftManger.js";
import { checkForDrafts } from "../utils/modal.js";

const draftManager = new DraftManager();
const app = document.getElementById("app");

const render = async (option={}) => {
    app.innerHTML = `
        <h1>Task Manager</h1>
        <div id="task-form-container"></div>
        <div id="task-list-container"></div>
    `;

    const taskFormContainer = document.getElementById("task-form-container");
    const taskListContainer = document.getElementById("task-list-container");

    const tasks = await getTasks();
    if (!tasks.length || option.container === "task-form-container") {
        taskListContainer.style.display = "none";
        taskFormContainer.classList.add("animate-in");
        checkForDrafts(taskFormContainer);
    }
    else {
        taskFormContainer.style.display = "none";
        if (option.animate !== false) {
            taskListContainer.classList.add("animate-in");
        }
        else {
            taskListContainer.style.transform = "TranslateX(0)"
        }
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
            if (task === "cancel") {
                render({animate: false});
                return;
            }
            await updateTask(id, task);
            render({animate: false});
        },
        onDelete: async (id) => {
            await deleteTask(id);
            document.querySelector(`input[data-id="${id}"]`).parentElement.remove();
            if (!document.querySelector(".list-item")) {
                render({container: "task-form-container"});
            }
        },
    }));
    filterTasks();
    searchTasks();
    document.getElementById("add-task").addEventListener("click", () => {
        render({container: "task-form-container"})
    });
    document.getElementById("cancel-task").addEventListener("click", () => {
        let userResponse = confirm("Do you want to save as a draft?");

        if (userResponse) {
            let form = document.querySelector("form");
            const task = {
                id: Date.now(),
                title: form.title.value,
                description: form.description.value,
                due: form.date.value,
                priority: form.priority.value,
            };
            draftManager.addDraft(task);
            render();
        } else {
            render();
        }
    });
};

async function init() {
    await render();
    const tasks = await getTasks();
    await notify(tasks);
}

init();