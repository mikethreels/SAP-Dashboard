import DashboardPage from "@/components/DashboardPage";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const ManagerPage = () => (
  <RoleBasedLayout requiredRole="manager">
    <DashboardPage role="manager" />;
  </RoleBasedLayout>
)

export default ManagerPage;