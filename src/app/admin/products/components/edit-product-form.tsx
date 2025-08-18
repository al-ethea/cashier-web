'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ProductImageUpload from './product-image-upload';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import apiInstance from '@/utils/api/apiInstance';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IProduct } from '@/types/product.type';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { on } from 'events';

const editProductFormSchema = z.object({
  name: z.string().min(2, { message: 'Product name must be at least 2 characters.' }),
  price: z.number(),
  productCategoryId: z.number(),
  description: z.string().optional(),
  productImgUrl: z.string().optional(),
  cldPublicId: z.string().optional(),
});

interface EditProductFormProps {
  id: string;
  onSuccess?: () => void;
  onImageUploadSuccess?: (result: CloudinaryUploadWidgetResults) => void;
  initialImageData?: CloudinaryUploadWidgetResults | null;
  product?: IProduct | null
  onRefresh?: () => void
}

export function EditProductForm({ onSuccess, onImageUploadSuccess, initialImageData, id, product, onRefresh }: EditProductFormProps) {
  const [imageUploaded, setImageUploaded] = React.useState({
    productImgUrl: (initialImageData?.info && typeof initialImageData.info === 'object' && 'secure_url' in initialImageData.info) ? initialImageData.info.secure_url : '',
    cldPublicId: (initialImageData?.info && typeof initialImageData.info === 'object' && 'public_id' in initialImageData.info) ? initialImageData.info.public_id : '',
  });
  const handleImageUploadSuccess: (result: CloudinaryUploadWidgetResults) => void = (result) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info && 'public_id' in result.info) {
      setImageUploaded({
        productImgUrl: result.info.secure_url,
        cldPublicId: result.info.public_id,
      });
    }
    onImageUploadSuccess?.(result);
  };

  const {categories} = useAdminProducts();

  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: '',
      price: 0,
      productCategoryId: 0,
      description: '',
    },
  });

  React.useEffect(() => {
    if (product) {
      form.setValue('name', product.name);
      form.setValue('price', product.price);
      form.setValue('productCategoryId', Number(product.productCategoryId));
      form.setValue('description', product.description);
      setImageUploaded({
        productImgUrl: product.productImgUrl,
        cldPublicId: product.cldPublicId
      })
    }
  }, [product]);

  const formFields = [
    { name: 'name' as const, label: 'Product Name', placeholder: 'Enter product name', type: 'text' },
    { name: 'price' as const, label: 'Price', placeholder: '0', type: 'number' },
    { name: 'productCategoryId' as const, label: 'Category ID', placeholder: 'Enter category ID', type: 'select' },
    { name: 'description' as const, label: 'Description', placeholder: 'Enter product description', type: 'textarea' },
  ];

  async function onSubmit(values: z.infer<typeof editProductFormSchema>) {
    try {
      const submitData = {
        ...values,
        productImgUrl: imageUploaded.productImgUrl,
        cldPublicId: imageUploaded.cldPublicId,
      };
      const response = await apiInstance.put('/products/update/'+id, submitData);
      onRefresh?.()
      toast.success(response.data.message);
      onSuccess?.();
    } catch (error) {
      console.log(error);
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(axiosError.response?.data.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex flex-col gap-4 items-center'>
          {imageUploaded.productImgUrl ? (
            <Image src={imageUploaded.productImgUrl} alt='Product Image' width={150} height={150} />
          ) : (
            <Skeleton className='w-[150px] h-[150px] rounded-md border' />
          )}
          <ProductImageUpload buttonText='Upload Product Image' onSuccess={handleImageUploadSuccess} />
        </div>
        {formFields.map((fieldConfig) => (
          <FormField
            key={fieldConfig.name}
            control={form.control}
            name={fieldConfig.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  {fieldConfig.type === 'textarea' ? (
                    <Textarea placeholder={fieldConfig.placeholder} {...field} />
                  ) : fieldConfig.type === 'select' ? (
                    <select
                      {...field}
                      onChange={(e) => field.onChange(+e.target.value)}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Select Product Category</option>
                      {categories.map((category: { id: number; name: string }) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={fieldConfig.type}
                      placeholder={fieldConfig.placeholder}
                      {...field}
                      onChange={fieldConfig.type === 'number' ? (e) => field.onChange(+e.target.value) : field.onChange}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>Update Product Data</Button>
      </form>
    </Form>
  );
}
