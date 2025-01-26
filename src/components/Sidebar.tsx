"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

const roleMenus: Record<string, { name: string; path: string }[]> = {
  admin: [
    { name: "Dashboard", path: "/admin" },
    { name: "Manage Users", path: "/admin/users" },
    { name: "Settings", path: "/admin/settings" },
  ],
  sales: [
    { name: "Dashboard", path: "/sales" },
    { name: "Leads", path: "/sales/leads" },
    { name: "Reports", path: "/sales/reports" },
  ],
  manager: [
    { name: "Dashboard", path: "/manager" },
    { name: "Team Overview", path: "/manager/team" },
    { name: "Analytics", path: "/manager/analytics" },
  ],
  collector: [
    { name: "Dashboard", path: "/collector" },
    { name: "Collections", path: "/collector/collections" },
    { name: "Invoices", path: "/collector/invoices" },
  ],
};

const Sidebar = () => {
  const { data: session } = useSession();
  const role = session?.user?.role;

  if (!role || !roleMenus[role]) return null; // If no role, don't show sidebar

  return (
    <nav className="w-64 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-bold mb-4 capitalize">{role} Panel</h2>
      <ul>
        {roleMenus[role].map(({ name, path }) => (
          <li key={path} className="mb-2">
            <Link href={path} className="hover:bg-gray-700 block p-2 rounded">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;