'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { data: session } = useSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect based on the user's role if already logged in
    console.log("Session data: ", session);
    if (session?.user?.role) {
      switch (session.user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'sales':
          router.push('/sales');
          break;
        case 'collector':
          router.push('/collector');
          break;
        case 'manager':
          router.push('/manager');
          break;
        default:
          router.push('/');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // Prevent automatic redirection
      username,
      password,
    });

    if (result?.error) {
      setError('Invalid credentials. Please try again.');
    } else {
      setError(null);
      // The session is updated; the useEffect will handle redirection
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}