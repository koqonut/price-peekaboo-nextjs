// app/login/page.tsx
'use client';

import { DEV_URL, GOOGLE_AUTH_ENDPOINT, PROD_URL } from '@/src/utils/Constants';
import React from 'react';

export default function LoginPage() {
  const handleLogin = () => {
    // Redirect to Lambda's Google login endpoint
    window.location.href = DEV_URL + GOOGLE_AUTH_ENDPOINT;
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Login Page</h1>
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
        Login with Google
      </button>
    </div>
  );
}
