export async function notify(tasks) {
    const today = new Date();
    const pastDue = tasks.filter(task => new Date(task.due) < today && !task.completed);
    if (pastDue.length > 0) {
        if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return;
        }
        const notification = new Notification("Past Due Tasks", {
            body: `You have ${pastDue.length} tasks past due.`
        });
        setTimeout(() => notification.close(), 5000);
    }
}