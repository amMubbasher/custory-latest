import serverInstance from ".";

export const calculateShippingCostAPI = ({data}) => serverInstance.post('/shipping/cost', data).then(res => res.data);