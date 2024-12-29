import React from 'react'

const SalesLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <header>
        <h1>Sales Dashboard</h1>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default SalesLayout