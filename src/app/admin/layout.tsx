import React, { ReactNode } from "react";
import RoleBasedLayout from "../../components/RoleBasedLayout";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return <RoleBasedLayout requiredRole="admin">{children}</RoleBasedLayout>;
};

export default AdminLayout;