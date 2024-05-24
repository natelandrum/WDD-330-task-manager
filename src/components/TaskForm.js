const TaskForm = ({ onSubmit }) => {
    const container = document.createElement("div");
    container.innerHTML = `
        <form>
            <h2>Add Task</h2> 
            <div class="form-group">
                <label>Title<input type="text" name="title" placeholder="Task Title" required></label>
                <label>Description<input type="text" name="description" placeholder="Description" required></label>
                <label>Due Date<input type="date" name="date" placeholder="Due Date" required></label>
                <label>Priority
                    <select name="priority" required>
                        <option selected disabled value="">Select a priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
            </div>
            <button class="add-task" method="post" action="/" type="submit">Add Task</button>
        </form>
    `;

    const form = container.querySelector("form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const task = {
            title: formData.get("title"),
            description: formData.get("description"),
            due: formData.get("date"),
            priority: formData.get("priority"),
            completed: false
        };
        await onSubmit(task);
    });

    return container;
};

export default TaskForm;

