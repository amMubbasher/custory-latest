import React, { useCallback, useEffect, useState } from 'react'
import { IoSearchOutline, IoFilterSharp } from "react-icons/io5";
import { useDeleteProduct, useFetchAllProducts, useFetchSupplierProduct } from '../hooks/useProducts';
import { APP_AUTH_KEY } from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteFolderWithItemsFromS3 } from '../utils/functions/S3Functions';
import { useFetchCategories } from '../hooks/useCategory';
import BasicModal from '../components/common/BasicModal';
import { IconButton, TextField, Button } from "@mui/material";
import { Close } from '@mui/icons-material';


const Product = ({product, deleteProduct, role}) =>{
    const [selectedColor, setSelectedColor] = useState(product?.colours[0]);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const sizes = product?.sizes.map((size)=> size?.sizeName);
    const printingType = product?.printingType.map((type)=> type?.printingType);
    const prices = product?.price.map(item => item.pricePerUnit);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    return (
        <div className='border border-[#9F9F9F] rounded-lg w-full flex'>
            <div className='px-2.5 w-[35%] align-top flex items-center gap-[11px] py-2'>
                <div className='w-[80px] min-w-[80px] h-[80px]'>
                    <img className="w-full h-full object-contain" src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${product?.id}/${product?.colours[0]}/front.jpg`} alt="Image"/>
                </div>
                <div className='flex flex-col items-start gap-1 max-2xl:gap-0'>
                    <p className='text-[14px] font-bold'>{product?.title}</p>
                    <p className='text-[14px]'>{product?.category?.name}</p>
                    <p className='text-[14px]'>{product?.materialType}</p>
                    <p className='text-[14px]'>{product?.weight * 1000} g</p>
                    <p className='text-[14px] uppercase'>{sizes.join(' | ')}</p>
                    <div className="flex flex-1 items-center gap-2 flex-wrap">
                        {product?.colours?.map((color, index) => {
                            const borderColor = color.startsWith("#") ? color : `#${color}`;
                            return (
                                <button
                                    key={index}
                                    className="w-5 h-5 rounded-full border outline-none"
                                    style={{backgroundColor: `#${color}`, border: `1px solid ${borderColor}`,}}
                                    onClick={()=> setSelectedColor(color)}
                                >                                  
                                </button>
                            );
                        })}
                    </div>
                    <p className='text-[13px]'>{printingType.join(' | ')}</p>
                    <p className='text-[13px]'>Double Side Printable</p>                            
                    <p className='text-[13px] capitalize'>Supplier : <b>{product?.supplier?.name}</b></p>                            
                </div>
            </div>
            <div className="p-2.5 w-[15%] align-top">
                ${minPrice/100} - ${maxPrice/100}
            </div>
            <div className='py-2.5 w-[20%] align-top flex flex-col items-start gap-3'>
                <div className='w-[100px] min-w-[100px] h-[90px]'>
                    <img className="w-full h-full object-contain" src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${product?.id}/${selectedColor}/front.jpg`} alt="Front Image"/>
                </div>
                <div className='w-[100px] min-w-[100px] h-[90px]'>
                    <img className="w-full h-full object-contain" src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${product?.id}/${selectedColor}/back.jpg`} alt="Back Image"/>
                </div>
            </div>
            <div className="p-2.5 w-[15%] align-top">
                <p className='text-[14px]'>$215.10</p>
                <p className='text-[14px]'>26 Items</p>
                <p className='text-[14px] text-custoryPrimary'>6 Active Orders</p>
            </div>
            <div className="p-2.5 w-[15%] flex flex-col gap-2">
                <button type="button" className='bg-[#09AA00] text-white text-[14px] block font-semibold py-1.5 px-3 rounded-lg outline-none' 
                    onClick={()=>{
                        navigate(`/${role == 'admin' ? 'adminPortal' : 'sellerPortal'}/addproducts/${product?.id}`)
                    }}
                >
                    Edit
                </button>
                <button type="button" className='bg-[#EC1C24] text-white text-[14px] block font-semibold py-1.5 px-3 rounded-lg outline-none'
                    onClick={()=> setIsOpen(true)}
                >
                    Delete
                </button>
            </div>
            <BasicModal open={isOpen} handleClose={()=> setIsOpen(false)}>
                <div className="w-[500px] max-w-sm sm:w-[90vw] bg-white px-6 py-5 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between text-black">
                    <h2 className="text-xl font-semibold max-sm:text-xl">Confirmation</h2>
                    <IconButton onClick={()=> setIsOpen(false)} sx={{ padding: 0 }}>
                        <Close />
                    </IconButton>
                    </div>

                    <div className="w-full mt-5 text-gray-700 text-lg">
                        Are you sure you want to delete this product?
                    </div>

                    <div className="flex items-center justify-end pt-5 gap-3">
                    <Button variant="contained" color="error" onClick={()=> setIsOpen(false)}>
                        Decline
                    </Button>
                    <Button 
                        variant="contained" 
                        color="success"
                        onClick={() => {
                            {product?.colours?.forEach((color) => {
                                deleteFolderWithItemsFromS3('custorybucket',`Products/${product?.id}/${color}/`);
                            })}
                            if(product?.sizingChart) {deleteFolderWithItemsFromS3('custorybucket',`Sizes/${product?.id}/`);}
                            deleteProduct.mutate({
                                productId : product?.id
                            })
                            setIsOpen(false)
                        }}
                    >
                        Proceed
                    </Button>
                    </div>
                </div>
            </BasicModal>
        </div>
    )
}

const ProductsViewPage = () => {
    const [sortFilter, setSortFilter] = useState({ creationValue: 'newest to oldest', expiryValue: 'reset-expiry-sort' });
    const [sortCategoryFilter, setSortCategoryFilter] = useState({ filteredValue: 'all', expiryFilteredValue: 'reset-Category-sort' });
    const [inputFilterValue, setInputFilterValue] = useState({ supplierName: '', itemName: '' });
    const [allProducts, setAllProducts] = useState([]);
    const [productsForSupplierName, setProductsForSupplierName] = useState([]);
    const [productsForCategoryName, setProductsForCategoryName] = useState([]);
    const location = useLocation();
    const parsedAuth = JSON.parse(localStorage.getItem(APP_AUTH_KEY)) || {};
    const userId = parsedAuth?.user?.id;
    const fetchProducts = location.pathname === "/adminPortal/inventory" ?  useFetchAllProducts().fetchProducts : useFetchSupplierProduct({userId})?.fetchProducts;
    const {data, refetch} = fetchProducts || {};
    const {fetchCategories: {data: categories}} = useFetchCategories();
    const {deleteProduct} = useDeleteProduct({
        placeOrderSuccessCallback: async (data) => {
            const filteredProducts = allProducts.filter((item)=> item?.id !== data?.product?.id);
            setAllProducts(filteredProducts);
        }      
    });

    useEffect(()=>{
        refetch();
    },[location.pathname, deleteProduct])

    useEffect(()=>{
        setAllProducts(data);
        setProductsForCategoryName(data);
    },[data])

    const handleFilteration = ({ target: { name, value } }) => {
        setInputFilterValue((prev) => ({...prev, [name]: value}));
        const searchTerm = value.toLowerCase();
        
        if(location.pathname === "/adminPortal/inventory"){        
            let filteredProducts = [];

            if (name === 'supplierName' && inputFilterValue?.itemName == '') {
                filteredProducts = productsForCategoryName.filter(item => item?.supplier?.name?.toLowerCase().includes(searchTerm || ''));
                setProductsForSupplierName(filteredProducts.length ? filteredProducts : []);
            } else if (name === 'supplierName' && inputFilterValue?.itemName !== ''){
                filteredProducts = productsForCategoryName.filter(item => item?.supplier?.name?.toLowerCase().includes(searchTerm || ''));
                setProductsForSupplierName(filteredProducts.length ? filteredProducts : []);
                filteredProducts = filteredProducts.filter(item => item.title.toLowerCase().includes(inputFilterValue?.itemName.toLowerCase() || ''));
            } else if (name === 'itemName' && productsForSupplierName.length) {
                filteredProducts = productsForSupplierName.filter(item => item.title.toLowerCase().includes(searchTerm || ''));
            } else {
                filteredProducts = productsForCategoryName.filter(item => item.title.toLowerCase().includes(searchTerm || ''));
            }           
            setAllProducts(filteredProducts);
        } else {
            const filteredByItemName = productsForCategoryName.filter(item => item.title.toLowerCase().includes(searchTerm || ''));
            setAllProducts(filteredByItemName || []);
        }
    };  
    
  return (
    <div className="p-3 font-poppins max-sm:p-1">
        <p className="text-[20px] py-[10px]">Products</p>
        <hr />
        <div className="flex flex-col items-start gap-[10px] w-full my-[10px]">
            <label className="text-[16px] font-normal" htmlFor="search">Item</label>
            <div className='w-full flex items-center gap-2'>
                {location.pathname === "/adminPortal/inventory" ? 
                    <div className="relative w-full">
                        <input className='w-full border-2 py-[10px] px-[14px] rounded-lg outline-none' type="text" id="search" name='supplierName' value={inputFilterValue?.supplierName} placeholder="Search by Supplier Name" onChange={(e)=> handleFilteration(e)}/>
                        <span className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"><IoSearchOutline size={21}/></span>
                    </div> : 
                    null
                }
                <div className="relative w-full">
                    <input className='w-full border-2 py-[10px] px-[14px] rounded-lg outline-none' type="text" id="search" name='itemName' value={inputFilterValue?.itemName} placeholder="Search Item Name" onChange={(e)=> handleFilteration(e)}/>
                    <span className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"><IoSearchOutline size={21}/></span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3 w-full max-sm:flex-wrap">
            <div className="py-[10px]">
                <span className="relative p-[5px] pl-7 rounded-[27px] bg-[#F9E5CA] text-black">
                <IoFilterSharp size={20} className="absolute top-[4px] left-[10px]"/>
                <select className="bg-[#F9E5CA] px-2 outline-none" value={sortFilter.creationValue}
                    onChange={({ target }) => {
                        setSortFilter({ creationValue: target.value, expiryValue: "reset-expiry-sort" });
                        const sortedProducts = [...productsForCategoryName].sort((a, b) => {
                            if (target.value === "oldest to newest") {
                            return new Date(a.createdAt) - new Date(b.createdAt);
                            } else if (target.value === "newest to oldest") {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                            }
                            return 0;
                        });
                        if(sortedProducts?.length){
                            setAllProducts(sortedProducts);
                        }
                    }}
                >
                    <option value="reset-creation-sort">Sort on Creation Date</option>
                    <option value="oldest to newest">Oldest to Newest</option>
                    <option value="newest to oldest">Newest to Oldest</option>
                </select>
                </span>
            </div>
            <div className="py-[10px]">
                <span className="relative p-[5px] pl-7 rounded-[27px] bg-[#F9E5CA] text-black">
                <IoFilterSharp size={20} className="absolute top-[4px] left-[10px]"/>
                    <select className="bg-[#F9E5CA] px-2 outline-none" value={sortCategoryFilter.filteredValue}
                        onChange={({ target }) => {
                            const selectedValue = target.value;
                            setSortCategoryFilter({filteredValue: selectedValue, expiryFilteredValue: "reset-Category-sort"});

                            if (selectedValue !== "all" && selectedValue !== "Search by Category") {
                                const filteredProducts = data.filter((item) => item?.category?.name?.toLowerCase() == selectedValue.toLowerCase());

                                if (filteredProducts.length) {
                                    const filteredSupplierProducts = filteredProducts.filter(item => item?.supplier?.name?.toLowerCase().includes(inputFilterValue?.supplierName?.toLowerCase() || "")).filter(item => item.title.toLowerCase().includes(inputFilterValue?.itemName?.toLowerCase() || ""));
                            
                                    setProductsForSupplierName(filteredSupplierProducts);
                                    setAllProducts(filteredSupplierProducts);
                                    setProductsForCategoryName(filteredProducts);
                                } else {
                                    setAllProducts([]);
                                    setProductsForCategoryName([]);
                                }
                            } else {
                                const filteredSupplierProducts = data.filter(item => item?.supplier?.name?.toLowerCase().includes(inputFilterValue?.supplierName?.toLowerCase() || "")).filter(item => item.title.toLowerCase().includes(inputFilterValue?.itemName?.toLowerCase() || ""));
                                setAllProducts(filteredSupplierProducts);
                                setProductsForCategoryName(data);
                            }                            
                        }}
                    >
                        <option value="all" selected>All</option>
                        {categories?.map((item, index) => (
                            <option key={index} value={item?.name}>
                            {item?.name}
                            </option>
                        ))}
                    </select>
                </span>
            </div>
        </div>
        <div className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border my-2.5 max-sm:hidden">
            <table className="w-full table-fixed">
                <tbody>
                <tr>
                    <td className="pl-2.5 w-[35%]"> Item(s) </td>
                    <td className="pl-2.5 w-[15%]"> Pricing </td>
                    <td className="pl-2.5 w-[20%]"> Images </td>
                    <td className="pl-2.5 w-[15%]"> Total Sold </td>
                    <td className="pl-2.5 w-[15%] text-center"> Action </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div className='flex flex-col gap-3'>
            {allProducts?.map((item, index)=>(
                <React.Fragment key={index}>
                    <Product product = {item} deleteProduct={deleteProduct} role={parsedAuth?.user?.role}/>
                </React.Fragment>
            ))}
        </div>
    </div>
  )
}

export default ProductsViewPage