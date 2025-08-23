export interface NavItem {
  name: string;
  path: string;
}

export const useCashierDashboardNavItems = (): NavItem[] => {
  return [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
    { name: "History", path: "/history" },
  ];
};
