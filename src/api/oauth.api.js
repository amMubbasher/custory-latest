import serverInstance from ".";

export const googleOAuthRegisterAPI = (data)=>serverInstance.post('/oauth/google/register', data).then(res=>res.data);
export const googleOAuthLoginAPI = (data)=>serverInstance.post('/oauth/google/login', data).then(res=>res.data);