import serverInstance from ".";

export const addQuotationAPI = ({data})=>serverInstance.post('/quotation',data).then(res=>res?.data);
export const getQuotationsAPI = ()=>serverInstance.get('/quotation').then(res=>res.data);