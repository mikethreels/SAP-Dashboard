import React from 'react'

const ManagementLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <header>
        <h1>Management overview</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default ManagementLayout