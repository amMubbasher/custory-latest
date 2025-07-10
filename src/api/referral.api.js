import serverInstance from ".";

export const getReferralPersonsAPI = ()=>serverInstance.get('/referral').then(res=>res.data);
export const addReferralPersonAPI = (data) => {
    return new Promise((resolve, reject) => {
      serverInstance.post('/referral', data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
};

