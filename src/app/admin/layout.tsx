"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathName = usePathname();

  if (pathName === "/admin/login") return <>{children}</>;
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="md:p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
