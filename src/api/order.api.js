import serverInstance from ".";

export const placeOrderAPI = ({data})=>serverInstance.post('/order', data).then(res=>res.data);
export const fetchOrdersAPI = ()=>serverInstance.get('/order').then(res=>res.data);
export const fetchOrderAPI = ({orderId})=>serverInstance.get(`/order/${orderId}`).then(res=>res.data);
export const stripeCheckoutSessionAPI = ({data})=>serverInstance.post('/order/create-checkout-session',data).then(res=>res.data);
export const getAdminOrderAPI = ({token})=>serverInstance.post(`/order/admin-order`, {token}).then(res=>res.data);
export const updateOrderAPI = ({data})=>serverInstance.patch('/order', data).then(res=>res.data);
export const fetchAdminOrdersAPI = ()=>serverInstance.get('/order/admin-orders').then(res=>res.data);
export const fetchPresignedUrlProduction = ({data})=>serverInstance.post('/order/production', data).then(res=>res.data);
export const stripeRefundAPI = ({data})=>serverInstance.post('/order/payment-refund',data).then(res=>res.data);