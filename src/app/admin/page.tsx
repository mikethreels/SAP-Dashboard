import DashboardPage from "@/components/dashboard/page";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const AdminPage = () => (
  <RoleBasedLayout requiredRole="admin">
    <DashboardPage role="admin" />;
  </RoleBasedLayout>
);

export default AdminPage;