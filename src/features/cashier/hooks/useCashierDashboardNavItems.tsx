export interface NavItem {
  name: string;
  path: string;
}

export const useCashierDashboardNavItems = (): NavItem[] => {
  return [
    { name: "Dashboard", path: "/" },
    { name: "Product Stock", path: "/product-stock" },
    { name: "Cart", path: "/cart" },
    { name: "History", path: "/history" },
  ];
};
