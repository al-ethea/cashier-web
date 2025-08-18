import { Button } from '@/components/ui/button';
import useAdminCashiers from '@/features/admin/cashiers/useAdminCashiers';
import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import * as React from 'react';

export interface IProductImageUploadButton {
  onSuccess: (result: CloudinaryUploadWidgetResults) => void;
  onClickUpload?: () => void;
  onClose?: () => void;
  buttonText: string;
}

export default function CashierAvatarImageUpload(props: IProductImageUploadButton) {
  const {setAddCashierDialogOpen} = useAdminCashiers()
  return (
    <div>
      <CldUploadWidget
        uploadPreset='cashier-avatar'
        signatureEndpoint={`${process.env.NEXT_PUBLIC_API_BASE_URL}/cloudinary/signed-upload`}
        onSuccess={props.onSuccess}
        options={{
          maxFiles: 1,
          sources: ['local', 'url', 'camera', 'google_drive'],
        }}>
        {({ open }) => (
          <Button type='button' onClick={() => {
            open()
            setAddCashierDialogOpen(false)
          }
          }>
            {props.buttonText}
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
}
