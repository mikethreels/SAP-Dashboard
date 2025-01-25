import React, { ReactNode } from "react";
import RoleBasedLayout from "../../components/RoleBasedLayout";

const SalesLayout = ({ children }: { children: ReactNode }) => {
  return <RoleBasedLayout requiredRole="sales">{children}</RoleBasedLayout>;
};

export default SalesLayout;