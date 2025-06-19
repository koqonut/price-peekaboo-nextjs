// app/auth-result/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

export default function AuthResultPage() {
  const [message, setMessage] = useState('Processing login...');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (token) {
      // You can also store the token in localStorage or context
        localStorage.setItem('authToken', token);

      setMessage('Login successful! Token received.');
    } else if (error) {
      setMessage(`Login failed: ${error}`);
    } else {
      setMessage('Unknown login state.');
    }
  }, []);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Authentication Result</h1>
      <p>{message}</p>
    </div>
  );
}
