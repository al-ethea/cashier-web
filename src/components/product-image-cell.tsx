// ProductImageCell.tsx
'use client';
import React from 'react';
import Image from 'next/image';

interface Props {
  src?: string | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

function ProductImageCellInner({ src, alt, width = 50, height = 50, className }: Props) {
  // keep markup minimal so memo can skip expensive work
  return (
    <Image src={src || '/placeholder.png'} alt={alt || 'product'} width={width} height={height} className={className} />
  );
}

// only re-render when src or alt changes
export const ProductImageCell = React.memo(ProductImageCellInner, (prev, next) => {
  return prev.src === next.src && prev.alt === next.alt && prev.width === next.width && prev.height === next.height;
});
