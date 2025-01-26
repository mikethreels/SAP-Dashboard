export type Role = "admin" | "sales" | "manager" | "collector";

export const permissions: Record<Role, { canViewClients: boolean; canViewAllClients: boolean }> = {
  admin: { canViewClients: true, canViewAllClients: true }, // Admins have full access
  sales: { canViewClients: true, canViewAllClients: false }, // Sales only view their region
  manager: { canViewClients: true, canViewAllClients: true }, // Managers view all clients
  collector: { canViewClients: false, canViewAllClients: false }, // Collectors do not have access to clients
};