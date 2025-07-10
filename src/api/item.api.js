import serverInstance from ".";

export const updateItemAPI = ({data})=>serverInstance.patch('/item', data).then(res=>res.data);
