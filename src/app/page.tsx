import React from 'react';
import Link from 'next/link'

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Your Next.js Application!</h1>
      <p>
        This is the root page of your app. You can navigate to different sections below:
      </p>
      <ul>
        <li>
          <Link href="/sales">Sales Dashboard</Link>
        </li>
        <li>
          <Link href="/collectors">Collector's Page</Link>
        </li>
        <li>
          <Link href="/management">Management Dashboard</Link>
        </li>
      </ul>

    </div>
  );
};

export default HomePage;
