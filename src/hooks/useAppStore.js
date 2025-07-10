import { create } from "zustand";


const useAppStore = create((set, get) => ({

  // Cart states
  showCart: false,
  setShowCart: (state) => set({ showCart: state }),

  // Auth states
  isLoggedin: false,
  setIsLoggedin: (state) => set({ isLoggedin: state }),
  showAuthModal: false,
  setShowAuthModal: (state) => set({ showAuthModal: state }),
  user: null,
  setUser: (user) => set({ user }),
  view: false,
  setView: (state) => set({ view: state }),

  // Total state
  showTotal: false,
  setShowTotal: (state) => set({ showTotal: state }),

  // Current Editor product state
  currentEditorProduct: localStorage.getItem('editorProduct') || null, // Retrieve from localStorage
  setCurrentEditorProduct: (product) => {
    set({ currentEditorProduct: product });
    localStorage.setItem('editorProduct', product);
  },
  currentFront: localStorage.getItem('frontImage') || null, // Retrieve from localStorage
  setCurrentFront: (frontImage) => {
    set({ currentFront: frontImage });
    localStorage.setItem('frontImage', frontImage);
  },
  currentBack: localStorage.getItem('backImage') || null, // Retrieve from localStorage
  setCurrentBack: (backImage) => {
    set({ currentBack: backImage });
    localStorage.setItem('backImage', backImage);
  },

  // Shirt Product Detail page
  productDataUpdated: null,
  setProductDataUpdated: (data) => {
    set({ productDataUpdated: data })},
  totalPrice: 0,
  setTotalPrice: (price) => set({ totalPrice: price }),
  quantity: 0,
  setQuantity: (quantity) => set({ quantity: quantity }),
  supplierData: null,
  setSupplierData: (data) => set({ supplierData: data }),
  selectedSizes: [],
  setSelectedSizes: (sizes) => set({ selectedSizes: sizes }),
  minQuantity: 0,
  setMinQuantity: (minQuantity) => set({ minQuantity: minQuantity }),
  uploadedFiles: [],
  setUploadedFiles: (data) => {
    set(state => {
      const updatedFiles = [...state.uploadedFiles, ...data];
      return { uploadedFiles: updatedFiles };
    });
  },
  frontUploadedLogo: null,
  setFrontUploadedLogo: (image) => {set({ frontUploadedLogo: image })},
  backUploadedLogo: null,
  setBackUploadedLogo: (image) => set({ backUploadedLogo: image }),
  frontUploadedImage: null,
  setFrontUploadedImage: (image) => {set({ frontUploadedImage: image })},
  backUploadedImage: null,
  setBackUploadedImage: (image) => set({ backUploadedImage: image }),
  showMinQuantityWarning: false,
  setShowMinQuantityWarning: (show) => set({ showMinQuantityWarning: show }),
  selectedColorUpdated: null,
  setSelectedColorUpdated: (color) => set({ selectedColorUpdated: color }),


  selectedImage: "",
  setSelectedImage: (state) => set({ selectedImage: state }),

  // for dialog modal component
  handleDialogModal: { isColorClicked: false, openUploadDesign: false },
  setHandleDialogModal: (state) => set({ handleDialogModal: state }),
  openCustomEditor: false,
  setOpenCustomEditor: (state) => set({ openCustomEditor: state }),

  // to detech the design change
  hasUnsavedChanges : false,
  setHasUnsavedChanges: (state)=> set({ hasUnsavedChanges: state }),


  // discounts
  discounts: [],
  setDiscounts: (state)=> set({ discounts: state }),
  
  // Seller Portal OrderItems State

  orders : [],
  setOrders : (state)=> set({orders: state}),

  // Add Product Payload
  addProductPayload: null,
  setAddProductPayload: (addProductPayload) => set({ addProductPayload }),

  product: null,
  setProduct: (state) => set({ product: state }),
  clearCartDetails: () => {
    set({
      product: null,
      selectedImage: "",
      selectedProducts: [],
    });
  },
  selectedProducts: [],
  getProductQuantityById: (productId) => {
    let currentSelectedProducts = get().selectedProducts;
    let index = currentSelectedProducts.findIndex(
      (item) => item.product._id === productId
    );
    if (index === -1) return 0;
    return currentSelectedProducts[index].quantity;
  },
  updateProductContentById: (productId, json) => {
    let currentSelectedProducts = get().selectedProducts;
    let index = currentSelectedProducts.findIndex(
      (item) => item.product._id === productId
    );
    if (index === -1) return;
    currentSelectedProducts[index].content = json;
    return set({ selectedProducts: currentSelectedProducts });
  },
  updateSelectedProducts: ({ product, quantity, content }) =>
    set((state) => {
      let selectedProducts = [...state.selectedProducts];
      let index = selectedProducts.findIndex(
        (p) => p?.product?._id === product?._id
      );
      if (quantity === 0 && index != -1) {
        selectedProducts = selectedProducts?.filter(
          (item) => item.product?._id !== product?._id
        );
      } else if (index === -1) {
        selectedProducts.push({ product, quantity, content: content || [] });
      } else {
        selectedProducts = selectedProducts.map((item) => {
          if (item?.product?._id === product?._id)
            return { ...item, quantity, content: content || [] };
          return item;
        });
      }
      return { selectedProducts };
    }),
}));


export default useAppStore;
