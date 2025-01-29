import DashboardPage from "@/components/dashboard/page";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const SalesPage = () => (
  <RoleBasedLayout requiredRole="sales">
    <DashboardPage role="sales" />;
  </RoleBasedLayout>
);

export default SalesPage;