export async function searchTasks() {
    document.getElementById("search-bar").addEventListener("input", async (e) => {
        document.querySelector("#filter-dropdown").value = "";
        const search = e.target.value.toLowerCase();
        const tasks = document.querySelectorAll(".list-item");
        tasks.forEach(task => {
            task.style.display = "grid";
            if (!task.querySelector("span").textContent.toLowerCase().includes(search) && 
                !Array.from(task.querySelectorAll("p")).some(item => item.textContent.toLowerCase().includes(search))) {
                task.style.display = "none";
            }
        });
    });
}