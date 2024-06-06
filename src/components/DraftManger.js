class DraftManager {
  constructor() {
    this.draftsKey = 'drafts';
  }

  saveDraftsToLocal(drafts) {
    localStorage.setItem(this.draftsKey, JSON.stringify(drafts));
  }

  loadDraftsFromLocal() {
    const drafts = localStorage.getItem(this.draftsKey);
    return drafts ? JSON.parse(drafts) : [];
  }

  addDraft(draft) {
    const drafts = this.loadDraftsFromLocal();
    drafts.push(draft);
    this.saveDraftsToLocal(drafts);
  }

  removeDraft(draftId) {
    let drafts = this.loadDraftsFromLocal();
    drafts = drafts.filter(draft => draft.id != draftId);
    this.saveDraftsToLocal(drafts);
  }

  getDraft(draftId) {
    const drafts = this.loadDraftsFromLocal();
    return drafts.find(draft => draft.id == draftId);
  }
}

export default DraftManager;
