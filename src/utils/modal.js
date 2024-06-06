import DraftManager from "../components/DraftManger";
const draftManager = new DraftManager();

export function checkForDrafts(taskFormContainer) {
    let drafts = draftManager.loadDraftsFromLocal();
        if (drafts.length) {
            let viewDraft = document.createElement("button");
            viewDraft.textContent = "View Drafts";
            viewDraft.id = "view-drafts";
            viewDraft.addEventListener("click", () => {
                modal.style.display = "flex";
            });

            let modal = document.createElement("div");
            modal.id = "drafts-modal";
            modal.style.display = "none"; 
            modal.style.position = "fixed"; 
            modal.style.zIndex = "1000"; 
            modal.style.left = "0"; 
            modal.style.top = "0";
            modal.style.width = "100%";
            modal.style.height = "100%";
            modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; 

            modal.addEventListener("click", () => {
                modal.style.display = "none";
            });

            let content = document.createElement("div");
            content.style.position = "relative"; 
            content.style.margin = "auto"; 
            content.style.padding = "20px";
            content.style.backgroundColor = "white"; 
            content.style.maxWidth = "500px"; 
            content.style.minHeight = "200px"; 
            content.style.maxHeight = "80vh";
            content.style.overflow = "auto";

            content.innerHTML = drafts.map(draft => `
                <div style="border: 1px solid black; padding: 10px; margin-bottom: 10px;">
                    <div>
                        <h2>Title: ${draft.title}</h2>
                        <p>Description: ${draft.description}</p>
                        <p>Due Date: ${draft.due}</p>
                        <p>Priority: ${draft.priority}</p>
                    </div>
                    <button id="use-draft" data-id=${draft.id} type="button">Use Draft</button>
                    <button id="delete-draft" data-id=${draft.id} type="button">Delete Draft</button>
                </div>
                    `).join("");

            
            content.addEventListener("click", (event) => {
                event.stopPropagation();
            });

            content.querySelectorAll("#use-draft").forEach(button => {
                button.addEventListener("click", (e) => {
                    const draftId = e.currentTarget.dataset.id;
                    const draft = draftManager.getDraft(draftId);
                    const form = document.querySelector("form");
                    form.title.value = draft.title;
                    form.description.value = draft.description;
                    form.date.value = draft.due;
                    form.priority.value = draft.priority;
                    e.currentTarget.parentElement.remove();
                    modal.style.display = "none";
                    draftManager.removeDraft(draftId);
                    drafts = draftManager.loadDraftsFromLocal();
                    if (!drafts.length) {
                        taskFormContainer.removeChild(viewDraft);
                    }
                });
            });

            content.querySelectorAll("#delete-draft").forEach(button => {
            button.addEventListener("click", (e) => {
                const draftId = e.currentTarget.dataset.id;
                draftManager.removeDraft(draftId);
                e.currentTarget.parentElement.remove();
                drafts = draftManager.loadDraftsFromLocal();
                if (!drafts.length) {
                    modal.style.display = "none";
                    taskFormContainer.removeChild(viewDraft);
                }
            });
        });
    

            modal.appendChild(content);
            document.body.appendChild(modal);
            taskFormContainer.appendChild(viewDraft);
            
        }
}