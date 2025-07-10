import serverInstance from ".";

export const updateCartAPI = ({data})=>serverInstance.patch('/cart', data).then(res=>res.data);
export const getCartAPI = ()=>serverInstance.get('/cart').then(res=>res.data);
export const deleteCartAPI = ()=>serverInstance.delete('/cart').then(res=>res.data);
export const addItemToCartAPI = (data) => {
    return new Promise((resolve, reject) => {
      serverInstance.post('/cart', data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
// delete a cart item by id
export const deleteCartItemAPI = (id) => {
  return new Promise((resolve, reject) => {
    serverInstance.delete(`/cart/${id}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
