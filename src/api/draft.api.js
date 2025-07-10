import serverInstance from ".";

export const addDraftAPI = ({data})=>serverInstance.post('/draft', data).then(res=>res.data);
export const updateDraftAPI = ({data,draftId})=>serverInstance.patch(`/draft/${draftId}`, data).then(res=>res.data);
export const getDraftsAPI = ()=>serverInstance.get('/draft').then(res=>res.data);
export const deleteDraftAPI = ({draftId})=>serverInstance.delete(`/draft/${draftId}`).then(res=>res.data);
export const getDraftAPI = ({draftId})=>serverInstance.get(`/draft/${draftId}`).then(res=>res.data);