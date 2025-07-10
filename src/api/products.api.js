import serverInstance from ".";

export const fetchProductsAPI = () => serverInstance.get('/product').then(res => res.data);
export const fetchSupplierProductsAPI = (userId) => serverInstance.get(`/product/supplier-products/${userId}`).then(res => res.data);
export const deleteProductAPI = ({productId})=>serverInstance.delete(`/product/${productId}`).then(res=>res.data);
export const updateProductAPI = ({data, productId})=>serverInstance.patch(`/product/${productId}`, data).then(res=>res.data);
export const fetchProductAPI = async (productId) => {
    try {
        const response = await serverInstance.get(`/product/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
};
export const addProductAPI = (data) => {
    return new Promise((resolve, reject) => {
      serverInstance.post('/product/admin/add-product', data)
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
};