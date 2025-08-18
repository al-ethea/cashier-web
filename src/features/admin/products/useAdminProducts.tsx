import { IProduct } from '@/types/product.type';
import apiInstance from '@/utils/api/apiInstance';
import { axiosErrorResponse } from '@/utils/axios-error/axiosErrorResponse';
import { AxiosError } from 'axios';
import * as React from 'react';
import { toast } from 'react-toastify';

export default function useAdminProducts() {
  // Filter dropdown
  const [filterDropdownOpen, setFilterDropdownOpen] = React.useState(false);
  
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [allProducts, setAllProducts] = React.useState([]);
  const fetchAllProducts = async () => {
    try {
      const response = await apiInstance.get('/products/all');
      setAllProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  const [categories, setCategories] = React.useState([]);
    const fetchCategories = async () => {
      try {
        const response = await apiInstance.get('/products/categories');
        setCategories(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    React.useEffect(() => {
      fetchCategories();
    }, []);

  const [editProductDialogOpen, setEditProductDialogOpen] = React.useState(false);

  const [currentProduct, setCurrentProduct] = React.useState<IProduct | null>(null);

  const fetchProductById = async (id: string) => {
    try {
      const response = await apiInstance.get(`/products/id/${id}`); 
      console.log(response.data.product);
      setCurrentProduct(response.data.product);

    } catch (error) {
      console.error(axiosErrorResponse(error));
    }
  }

   const handleDeleteProduct = async (id: string, password?: string) => {
     try {
       const response = await apiInstance.delete(`/products/delete/${id}`);
       toast.warning(response.data.message);
       fetchAllProducts();
     } catch (error) {
       const errResponse = error as AxiosError<{ message: string }>;
       console.error(errResponse.response?.data.message);
     }
   };



  return {
    filterDropdownOpen,
    dialogOpen,
    setDialogOpen,
    allProducts,
    setAllProducts,
    fetchAllProducts,
    categories,
    setCategories,
    fetchCategories,
    editProductDialogOpen,
    setEditProductDialogOpen,
    currentProduct,
    setCurrentProduct,
    fetchProductById,
    handleDeleteProduct
  }
}
