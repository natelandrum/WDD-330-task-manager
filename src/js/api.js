const API_URL = import.meta.env.VITE_API_URL;


export const getTasks = async () => {
    const response = await fetch(`${API_URL}/task`);
    if (response.status === 200) {
        return response.json();
    }
};

export const getTask = async (id) => {
    const response = await fetch(`${API_URL}/task/${id}`);
    if (response.status === 200) {
        return response.json();
    }
}

export const createTask = async (task) => {
    await fetch(`${API_URL}/task`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
};

export const updateTask = async (id, task) => {
    await fetch(`${API_URL}/task/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
};

export const deleteTask = async (id) => {
    await fetch(`${API_URL}/task/${id}`, {
        method: "DELETE"
    });
};
