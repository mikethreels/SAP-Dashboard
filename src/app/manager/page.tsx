import DashboardPage from "@/components/dashboard/page";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const ManagerPage = () => (
  <RoleBasedLayout requiredRole="manager">
    <DashboardPage role="manager" />;
  </RoleBasedLayout>
)

export default ManagerPage;