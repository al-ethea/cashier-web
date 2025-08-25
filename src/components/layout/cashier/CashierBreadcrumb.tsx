"use client";
import * as React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export function CashierBreadcrumb() {
  const pathName = usePathname(); // e.g. "/dashboard/cart"

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root label */}
        <BreadcrumbItem>
          <BreadcrumbLink>
            <BreadcrumbPage>Cashier</BreadcrumbPage>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {/* Render subpaths */}
        {pathName
          .split("/")
          .filter((item) => item) // remove empty strings
          .map((item, index, array) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  {index === array.length - 1 ? (
                    <BreadcrumbPage>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </BreadcrumbPage>
                  ) : (
                    <Link href={`/${array.slice(0, index + 1).join("/")}`}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
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
