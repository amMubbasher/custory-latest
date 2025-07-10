import serverInstance from ".";

export const getAllCategories = ()=>serverInstance.get('/category').then(res=>res.data);
