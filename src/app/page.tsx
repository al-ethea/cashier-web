// // pages/index.tsx

import { LoginForm } from "@/components/login-form";

export default function CashierLoginPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm role="cashier" />
      </div>
    </div>
  );
}

// "use client";
// import Link from "next/link";
// import { useCashierDashboardNavItems } from "@/features/cashier/hooks/useCashierDashboardNavItems";

// export default function Home() {
//   const navItems = useCashierDashboardNavItems();

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#00af81] text-white p-6">
//         <div className="text-2xl font-bold mb-8">Kasir Pintar</div>

//         {/* Navigation */}
//         <nav className="flex flex-col space-y-2">
//           {navItems.map((item) => (
//             <Link href={item.path} key={item.name}>
//               <div className="px-4 py-2 rounded hover:bg-[#66cbb0] hover:bg-opacity-20 cursor-pointer transition">
//                 {item.name}
//               </div>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 p-10">
//         <h2 className="text-3xl font-semibold mb-4">Welcome</h2>
//         <p>This is the main content area.</p>
//       </div>
//     </div>
//   );
// }
