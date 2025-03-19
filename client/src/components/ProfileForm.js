import React, { useState } from 'react';
import axios from 'axios';

export default function ProfileForm({ setResult }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Analyzing...');

    try {
      const res = await axios.post('/api/analyze', { url });
      setResult(res.data.data);
      setStatus('✅ Done!');
    } catch {
      setStatus('❌ Failed to analyze.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="LinkedIn Profile URL" required />
      <button type="submit">Analyze</button>
      <p>{status}</p>
    </form>
  );
}
