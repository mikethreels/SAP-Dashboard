import DashboardPage from "@/components/DashboardPage";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const CollectorPage = () => (
  <RoleBasedLayout requiredRole="collector">
    <DashboardPage role="collector" />;
  </RoleBasedLayout>
)

export default CollectorPage;