'use client'
import apiInstance from '@/utils/api/apiInstance';
import * as React from 'react';

export default function useAllProductCategories() {
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

  return {
    categories,
    setCategories,
  };
}