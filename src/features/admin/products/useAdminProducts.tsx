import apiInstance from '@/utils/api/apiInstance';
import * as React from 'react';

export default function useAdminProducts() {
  // Filter dropdown
  const [filterDropdownOpen, setFilterDropdownOpen] = React.useState(false);
  const handleAdminProductsFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const [imageUploaded, setImageUploaded] = React.useState({
      productImgUrl: '',
      cldPublicId: '',
  });
  
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [allProducts, setAllProducts] = React.useState([]);
  const fetchAllProducts = async () => {
    try {
      const response = await apiInstance.get('/products/all');
      console.log(response.data.products);
      setAllProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchAllProducts();
  }, []);

  return {
    filterDropdownOpen,
    handleAdminProductsFilterDropdown,
    dialogOpen,
    setDialogOpen,
    allProducts,
    setAllProducts
  }
}
