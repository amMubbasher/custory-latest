import serverInstance from ".";

export const fetchSupplierAPI = async (supplierId) => {
    try {
        const response = await serverInstance.get(`/supplier/${supplierId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching supplier:', error);
    }
};