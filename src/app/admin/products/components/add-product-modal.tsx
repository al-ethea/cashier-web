'use client';


import { Button } from '@/components/ui/button';
import { CirclePlus, X } from 'lucide-react';
import { AddProductForm } from './add-product-form';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { motion } from 'framer-motion';

export function AddProductModal({ onRefresh }: { onRefresh?: () => void }) {
  const { dialogOpen, setDialogOpen } = useAdminProducts();
  const handleFormSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        Add Product <CirclePlus />
      </Button>
      {dialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='gap-4 border bg-background rounded-lg shadow-lg w-full max-w-md md:mx-0 overflow-auto'>
            <div className='sticky top-0 left-0 right-0 h-fit w-full bg-background z-50'>
              <div className='flex items-center justify-between py-4 px-4'>
                <div className='flex flex-col mb-4 gap-y-2'>
                  <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Add New Product</h1>
                  <p className='text-gray-500 dark:text-gray-400 font-medium text-[1rem]'>
                    Create new product, save changes when done
                  </p>
                </div>
                <Button variant={'ghost'} size={'sm'} onClick={() => setDialogOpen(false)} className='p-2'>
                  <X className='w-6 h-6' />
                </Button>
              </div>
            </div>
            <div className='p-8 w-full'>
              <AddProductForm onSuccess={handleFormSuccess} onRefresh={onRefresh}/>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
