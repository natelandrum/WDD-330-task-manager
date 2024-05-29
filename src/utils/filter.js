export async function filterTasks() {
    document.getElementById("filter-dropdown").addEventListener("change", async (e) => {
        document.querySelector("#search-bar").value = "";
        const filter = e.target.value;
        const tasks = document.querySelectorAll(".list-item");
        tasks.forEach(task => {
            task.style.display = "grid"; // Reset display to grid before applying filter
            switch(filter) {
                case "completed":
                    if (!task.querySelector("input").checked) {
                        task.style.display = "none";
                    }
                    break;
                case "not-completed":
                    if (task.querySelector("input").checked) {
                        task.style.display = "none";
                    }
                    break;
                case "high":
                case "medium":
                case "low":
                    if (task.querySelector(".list-item__priority p").textContent !== filter.charAt(0).toUpperCase() + filter.slice(1)) {
                        task.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        });
    });
}