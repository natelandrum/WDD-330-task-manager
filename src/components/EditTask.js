const today = new Date().toISOString().split('T')[0];

export async function renderEditForm(task, e) {
    e.target.closest(".list-item").innerHTML = `
                <form>
                    <h2>Edit Task</h2> 
                    <div class="form-group">
                        <label>Title<input type="text" name="title" placeholder="Task Title" value="${task.title}" required></label>
                        <label>Description<input type="text" name="description" placeholder="Description" value="${task.description}" required></label>
                        <label>Due Date<input type="date" name="date" placeholder="Due Date" min="${today}" value="${task.due}" required></label>
                        <label>Priority
                            <select name="priority" required>
                                <option disabled value="">Select a priority</option>
                                <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                                <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                                <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
                            </select>
                        </label>
                    </div>
                    <button class="edit-task" type="submit">Submit Changes</button>
                    <button id="cancel-update" type="button">Cancel</button>
                </form>
            `;

            document.querySelector("#cancel-update").addEventListener("click", async () => {
                
            });
}