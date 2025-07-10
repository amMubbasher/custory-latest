import serverInstance from ".";

export const loginUserAPI = ({data})=>serverInstance.post('/auth/login',data).then(res=>res?.data);
export const registerUserAPI = ({data})=>serverInstance.post('/auth/signup',data).then(res=>res?.data);
export const googleAuthAPI = ()=>serverInstance.get('/auth/login/success', {withCredentials : true}).then(res=>res?.data);
export const verifyResetPasswordTokenAPI = ({data})=>serverInstance.post('/auth/verify-reset-token', data).then(res=>res.data);
export const resetPasswordAPI = ({data})=>serverInstance.post('/auth/reset-password',data).then(res=>res.data);
export const forgotPasswordAPI = ({data})=>serverInstance.post('/auth/forgot-password', data).then(res=>res.data);
export const editUserAPI = ({data})=>serverInstance.patch('/user', data).then(res=>res.data);
export const fetchUserAPI = (userId)=>serverInstance.get(`/user/${userId}`).then(res=>res.data);
export const editUserPassword = ({data})=>serverInstance.patch('/user/password', data).then(res=>res.data);