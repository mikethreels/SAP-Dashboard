import React, { ReactNode } from "react";
import RoleBasedLayout from "../../components/RoleBasedLayout";

const CollectorLayout = ({ children }: { children: ReactNode }) => {
  return <RoleBasedLayout requiredRole="collector">{children}</RoleBasedLayout>;
};

export default CollectorLayout;