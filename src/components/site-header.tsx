"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AdminBreadcrumb } from "./layout/admin/AdminBreadcrumb";
import { CashierBreadcrumb } from "./layout/cashier/CashierBreadcrumb";
import authStore from "@/zustand/authStore";

export function SiteHeader() {
  const { adminId, cashierId } = authStore((state: any) => state);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Render breadcrumb by role */}
        {adminId ? <AdminBreadcrumb /> : <CashierBreadcrumb />}
      </div>
    </header>
  );
}
