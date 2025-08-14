'use client';

import * as React from 'react';
import ProductImageUpload from '../admin/products/components/product-image-upload';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <ProductImageUpload buttonText='Upload Product Image' onSuccess={()=>{}} />
    </div>
  );
}
