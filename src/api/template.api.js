import serverInstance from ".";

export const createTemplateAPI = ({data})=>serverInstance.post('/template', data).then(res=>res.data);
export const getTemplatesAPI = ()=>serverInstance.get('/template').then(res=>res.data);