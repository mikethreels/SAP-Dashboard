import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div>
      <header>
        <h1>Admin Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout