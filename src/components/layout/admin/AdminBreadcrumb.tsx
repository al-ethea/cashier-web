'use client';
import * as React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export function AdminBreadcrumb() {
  const pathName = usePathname().replace('/admin', '');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage>Admin</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathName.split('/').filter(item => item).map((item, index, array) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                {index === array.length - 1 ? (
                  <BreadcrumbPage>{item.charAt(0).toUpperCase() + item.slice(1)}</BreadcrumbPage>
                ) : (
                  <Link href={`/${item}`}>{item.charAt(0).toUpperCase() + item.slice(1)}</Link>
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index < array.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
