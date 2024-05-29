import { renderEditForm } from "./EditTask.js";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
    const container = document.createElement("div");
    container.innerHTML = `
        <div class="tasks">
            <h2>Tasks</h2> 
            <button type="button" id="add-task">Add Task</button>
            <label for="search-bar" class="visually-hidden">Search Bar</label>
            <input type="text" name="search" id="search-bar" placeholder="Search tasks..." autocomplete="off">
            <label for="filter-dropdown" class="visually-hidden">Filter drop-down</label>
            <select name="filter" id="filter-dropdown">
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="not-completed">Not Completed</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
            </select>
        </div>
            ${tasks.map(task => `
                 <div class="list-item">
                    <label for="${task._id}" class="visually-hidden">Completed Checkbox</label>
                    <input type="checkbox" name="completed" id="${task._id}" ${task.completed ? "checked" : ""} data-id="${task._id}">
                    <div class="list-item__info">  
                        <span>${task.title}</span>
                        <p>${task.due}</p>  
                        <p>${task.description}</p>
                    </div>
                    <div class="list-item__priority">
                        <span>Priority:</span>	
                        <p class="${task.priority}">${task.priority}</p>
                    </div>
                    <div class="list-item__actions">
                        <button class="remove" type="button" data-id="${task._id}">Delete</button>
                        <button class="edit" type="button" data-id="${task._id}">Edit</button>
                    </div> 
                </div>
            `).join("")}
    `;

    container.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", async (e) => {
            const id = e.target.getAttribute("data-id");
            const taskIndex = tasks.findIndex(task => task._id == id);
            const task = tasks[taskIndex];
            task.completed = e.target.checked;
            await onUpdate(task);
        });
    });

    container.querySelectorAll(".remove").forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            await onDelete(id);
        });
    });

    container.querySelectorAll(".edit").forEach(button => {
        button.addEventListener("click", async (e) => {
            const id = e.target.getAttribute("data-id");
            const taskIndex = tasks.findIndex(task => task._id == id);
            const task = tasks[taskIndex];

            await renderEditForm(task, e);
            
            const form = container.querySelector("form");
            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(form);

                
                task.title = formData.get("title"),
                task.description = formData.get("description"),
                task.due = formData.get("date"),
                task.priority = formData.get("priority"),
                task.completed = task.completed
                
                await onUpdate(task);
            });

            document.querySelector("#cancel-update").addEventListener("click", async () => {
                await onUpdate("cancel");
            });
        });
    });


    return container;
};

export default TaskList;
