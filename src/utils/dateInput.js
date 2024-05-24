export async function dateInput() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    document.querySelector("input[name='date']").min = formattedDate;
    document.querySelector("input[name='date']").value = formattedDate;}