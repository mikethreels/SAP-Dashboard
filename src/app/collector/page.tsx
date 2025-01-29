import DashboardPage from "@/components/dashboard/page";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const CollectorPage = () => (
  <RoleBasedLayout requiredRole="collector">
    <DashboardPage role="collector" />;
  </RoleBasedLayout>
)

export default CollectorPage;