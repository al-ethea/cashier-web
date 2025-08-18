'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { SquarePen, X } from 'lucide-react';
import { motion } from 'framer-motion';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { EditProductForm } from './edit-product-form';

export function EditProductModal({ id, onRefresh }: { id: string; onRefresh?: () => void }) {
  const { editProductDialogOpen,setEditProductDialogOpen, fetchProductById, currentProduct } = useAdminProducts();
  

  const handleFormSuccess = () => {
    setEditProductDialogOpen(false);
  };
  return (
    <>
      <Button className='bg-blue-500 hover:bg-blue-600 text-white'
        onClick={() => {
          setEditProductDialogOpen(true);
          fetchProductById(id);
        }}>
        Edit <SquarePen />
      </Button>
      {editProductDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='border bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b'>
              <div className='flex flex-col gap-y-1'>
                <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Update Product Data</h1>
                <p className='text-gray-500 dark:text-gray-400 font-medium text-sm'>
                  Edit product data, click updates when done
                </p>
              </div>
              <Button variant={'ghost'} size={'sm'} onClick={() => setEditProductDialogOpen(false)} className='p-2'>
                <X className='w-6 h-6' />
              </Button>
            </div>
            <div className='p-4 md:p-6 overflow-y-auto flex-1'>
              <EditProductForm id={id} product={currentProduct} onSuccess={handleFormSuccess} onRefresh={onRefresh}/>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
