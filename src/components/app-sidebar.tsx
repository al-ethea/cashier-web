"use client";

import * as React from "react";
import {
  IconBubbleTea,
  IconDashboard,
  IconReport,
  IconUserDollar,
  IconHelp,
  IconSearch,
  IconSettings,
  IconInnerShadowTop,
  IconShoppingCartDollar,
  IconCashRegister,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import authStore from "@/zustand/authStore";

const navItems = {
  admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: IconBubbleTea,
    },
    {
      title: "Cashiers",
      url: "/admin/cashiers",
      icon: IconUserDollar,
    },
    {
      title: "Reports",
      url: "/admin/reports",
      icon: IconReport,
    },
  ],
  cashier: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Products",
      url: "/products",
      icon: IconBubbleTea,
    },
    {
      title: "Cart",
      url: "/cart",
      icon: IconShoppingCartDollar,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: IconCashRegister,
    },
  ],
};

const navSecondary = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
  {
    title: "Search",
    url: "#",
    icon: IconSearch,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { adminId, cashierId, email } = authStore((state) => state);

  // Decide which menu to show
  const roleMenu = adminId ? navItems.admin : navItems.cashier;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Fore POS App</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={roleMenu} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: adminId ? "Admin User" : "Cashier User",
            email: email || "no-email@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
