export async function filterTasks() {
    document.getElementById("filter-dropdown").addEventListener("change", async (e) => {
        document.querySelector("#search-bar").value = "";
        const filter = e.target.value;
        const tasks = document.querySelectorAll(".list-item");
        tasks.forEach(task => {
            task.style.display = "grid";
            if (filter === "completed" && !task.querySelector("input").checked) {
                task.style.display = "none";
            }
            if (filter === "not-completed" && task.querySelector("input").checked) {
                task.style.display = "none";
            }
            if (filter === "high" && task.querySelector(".list-item__priority p").textContent !== "High") {
                task.style.display = "none";
            }
            if (filter === "medium" && task.querySelector(".list-item__priority p").textContent !== "Medium") {
                task.style.display = "none";
            }
            if (filter === "low" && task.querySelector(".list-item__priority p").textContent !== "Low") {
                task.style.display = "none";
            }
        });
    });
}