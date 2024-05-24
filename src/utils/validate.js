export async function validate () {
    document.querySelector("select").addEventListener("change", (e) => {
        if (e.target.value !== "Select a priority") e.target.setCustomValidity("");
    });

    document.querySelector("input[type='date']").addEventListener("change", (e) => {
        if (e.target.value) e.target.setCustomValidity("");
    });
}