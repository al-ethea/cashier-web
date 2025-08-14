import { Button } from '@/components/ui/button';
import useAdminProducts from '@/features/admin/products/useAdminProducts';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import * as React from 'react';

export interface IProductImageUploadButton {
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
  onClickUpload?: () => void;
  onClose?: () => void;
  buttonText: string;
}

export default function ProductImageUpload(props: IProductImageUploadButton) {
  const {setDialogOpen} = useAdminProducts()
  return (
    <div>
      <CldUploadWidget
        uploadPreset='products-image'
        signatureEndpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/cloudinary/signed-upload`}
        onSuccess={props.onSuccess}
        options={{
          maxFiles: 1,
          sources: ['local', 'url', 'camera', 'google_drive'],
        }}>
        {({ open }) => (
          <Button type='button' onClick={() => {
            open()
            setDialogOpen(false)
          }
          }>
            {props.buttonText}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
