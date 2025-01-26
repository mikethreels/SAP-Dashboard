import DashboardPage from "@/components/DashboardPage";
import RoleBasedLayout from "@/components/RoleBasedLayout";

const AdminPage = () => (
  <RoleBasedLayout requiredRole="admin">
    <DashboardPage role="admin" />;
  </RoleBasedLayout>
);

export default AdminPage;