import serverInstance from ".";

export const updateDiscountAPI = ({data})=>serverInstance.patch('/discount', data).then(res=>res.data);
export const getDiscountsAPI = ()=>serverInstance.get('/discount').then(res=>res.data);
export const deleteDiscountAPI = ()=>serverInstance.delete('/discount').then(res=>res.data);
export const addItemToDiscountAPI = (data) => {
    return new Promise((resolve, reject) => {
      serverInstance.post('/discount', data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
// delete a discount item by id
export const deleteDiscountByIdAPI = (id) => {
  return new Promise((resolve, reject) => {
    serverInstance.delete(`/discount/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
