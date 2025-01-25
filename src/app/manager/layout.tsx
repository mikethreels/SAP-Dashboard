import React, { ReactNode } from "react";
import RoleBasedLayout from "../../components/RoleBasedLayout";

const ManagerLayout = ({ children }: { children: ReactNode }) => {
  return <RoleBasedLayout requiredRole="manager">{children}</RoleBasedLayout>;
};

export default ManagerLayout;