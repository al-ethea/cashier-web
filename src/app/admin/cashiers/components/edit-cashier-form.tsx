'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod'

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { CloudinaryUploadWidgetResults } from 'next-cloudinary';
import apiInstance from '@/utils/api/apiInstance';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { EGender, EShiftSession, ICashier } from '@/types/cashier.type';
import CashierAvatarImageUpload from './cashier-image-upload';
import useAdminCashiers from '@/features/admin/cashiers/useAdminCashiers';

const editCashierFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z.string().optional(),
  email: z.email({message: 'Invalid email address.'}),
  password: z.string().refine(val => val === '' || val.length >= 6, {
    message: 'Password must be at least 6 characters if provided.'
  }),
  phoneNumber: z.string().optional(),
  gender: z.string().optional(),
  avatarImgUrl: z.string().optional(),
  cldPublicId: z.string().optional(),
  shift: z.string()
});

interface EditCashierFormProps {
  onSuccess?: () => void;
  onClickUpload?: () => void;
  onImageUploadSuccess?: (result: CloudinaryUploadWidgetResults) => void;
  initialImageData?: CloudinaryUploadWidgetResults | null;
  id: string;
  cashier?: ICashier | null;
  onRefresh?: () => void
}

export function EditCashierForm({ onSuccess, onImageUploadSuccess, initialImageData, id, cashier, onRefresh }: EditCashierFormProps) {
  

  const [imageUploaded, setImageUploaded] = React.useState({
    avatarImgUrl: (initialImageData?.info && typeof initialImageData.info === 'object' && 'secure_url' in initialImageData.info) ? initialImageData.info.secure_url : '',
    cldPublicId: (initialImageData?.info && typeof initialImageData.info === 'object' && 'public_id' in initialImageData.info) ? initialImageData.info.public_id : '',
  });
  const handleImageUploadSuccess: (result: CloudinaryUploadWidgetResults) => void = (result) => {
    if (result.info && typeof result.info === 'object' && 'secure_url' in result.info && 'public_id' in result.info) {
      setImageUploaded({
        avatarImgUrl: result.info.secure_url,
        cldPublicId: result.info.public_id,
      });
    }
    onImageUploadSuccess?.(result);
  };


  const form = useForm<z.infer<typeof editCashierFormSchema>>({
    resolver: zodResolver(editCashierFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      gender: '',
      avatarImgUrl: '',
      cldPublicId: '',
      shift: '',
    },
  });

  React.useEffect(() => {
    if (cashier) {
      form.reset({
        firstName: cashier.firstName || '',
        lastName: cashier.lastName || '',
        email: cashier.email || '',
        password: '',
        phoneNumber: cashier.phoneNumber || '',
        gender: cashier.gender?.toString() || '',
        avatarImgUrl: cashier.avatarImgUrl || '',
        cldPublicId: cashier.cldPublicId || '',
        shift: cashier.shift?.toString() || '',
      });
      setImageUploaded({
        avatarImgUrl: cashier.avatarImgUrl || '',
        cldPublicId: cashier.cldPublicId || '',
      });
    }
  }, [cashier, form]);

  const formFields = [
    { name: 'firstName' as const, label: 'First Name', placeholder: 'Enter First name', type: 'text' },
    { name: 'lastName' as const, label: 'Last Name', placeholder: 'Enter Last name', type: 'text' },
    { name: 'email' as const, label: 'Email', placeholder: 'Enter Email', type: 'email' },
    { name: 'password' as const, label: 'Password', placeholder: 'Type New Password or Leave Blank to Keep Current', type: 'password' },
    { name: 'phoneNumber' as const, label: 'Phone Number', placeholder: 'Enter Phone Number', type: 'text' },
    { name: 'gender' as const, label: 'Gender', placeholder: 'Enter Gender', type: 'select' },
    { name: 'shift' as const, label: 'Shift', placeholder: 'Enter Shift', type: 'select' },
  ];

  const genderOptions = Object.values(EGender)
    .filter(value => typeof value === 'string')
    .map(value => ({
      value: value,
      label: value
    }));

  const shiftOptions = Object.values(EShiftSession)
    .filter((value) => typeof value === 'string')
    .map((value) => ({
      value: value,
      label: value,
    }));

  async function onSubmit(values: z.infer<typeof editCashierFormSchema>) {
    try {
      const submitData = {
        ...values,
        avatarImgUrl: imageUploaded.avatarImgUrl,
        cldPublicId: imageUploaded.cldPublicId,
      };
      const response = await apiInstance.put('/cashier/update/' + id, submitData);
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
          {imageUploaded.avatarImgUrl ? (
            <Image src={imageUploaded.avatarImgUrl} alt='Product Image' width={150} height={150} />
          ) : (
            <Skeleton className='w-[150px] h-[150px] rounded-md border' />
          )}
          <CashierAvatarImageUpload buttonText='Upload Avatar Image' onSuccess={handleImageUploadSuccess} />
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
                  ):fieldConfig.name === 'shift' ? (
                    <select
                      {...field}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Select Shift</option>
                      {shiftOptions.map((shift: { value: EShiftSession|string; label: EShiftSession|string}, index) => (
                        <option key={index} value={shift.value}>
                          {shift.label}
                        </option>
                      ))}
                    </select>
                  ) :fieldConfig.name === 'gender' ? (
                    <select
                      {...field}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                      <option value=''>Select Gender</option>
                      {genderOptions.map((gender: { value: EGender|string; label: EGender|string }, index) => (
                        <option key={index} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </select>
                  ) :(                   <Input
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
        <Button type='submit'>Update Cashier Data</Button>
      </form>
    </Form>
  );
}
