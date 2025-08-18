'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { SquarePen, X } from 'lucide-react';
import { EditCashierForm } from './edit-cashier-form';
import { motion } from 'framer-motion';
import useAdminCashiers from '@/features/admin/cashiers/useAdminCashiers';

export function EditCashierModal({ id, onRefresh }: { id: string; onRefresh?: () => void }) {
  const { editCashierDialogOpen, setEditCashierDialogOpen, fetchCashierById, currentCashier } = useAdminCashiers({ id });
  

  const handleFormSuccess = () => {
    setEditCashierDialogOpen(false);
  };
  return (
    <>
      <Button className='bg-blue-500 hover:bg-blue-600 text-white'
        onClick={() => {
          setEditCashierDialogOpen(true);
          fetchCashierById();
        }}>
        Edit <SquarePen />
      </Button>
      {editCashierDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-background/30 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
          <div className='border bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col'>
            <div className='flex items-center justify-between p-4 border-b'>
              <div className='flex flex-col gap-y-1'>
                <h1 className='text-2xl font-semibold text-gray-900 dark:text-gray-100'>Update Cashier Data</h1>
                <p className='text-gray-500 dark:text-gray-400 font-medium text-sm'>
                  Edit cashier personal data, click updates when done
                </p>
              </div>
              <Button variant={'ghost'} size={'sm'} onClick={() => setEditCashierDialogOpen(false)} className='p-2'>
                <X className='w-6 h-6' />
              </Button>
            </div>
            <div className='p-4 md:p-6 overflow-y-auto flex-1'>
              <EditCashierForm id={id} cashier={currentCashier} onSuccess={handleFormSuccess} onRefresh={onRefresh}/>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
