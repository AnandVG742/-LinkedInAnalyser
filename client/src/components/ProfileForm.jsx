import React, { useState } from 'react';
import axios from 'axios';

export default function ProfileForm({ setResult }) {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Analyzing...');

    try {
      const res = await axios.post('https://linkedinanalyser.onrender.com/api/analyze', { url });
      setResult(res.data.data);
      setStatus('✅ Analysis Complete!');
    } catch (error) {
      console.error('API error:', error);
      setStatus('❌ Failed to analyze. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste LinkedIn Profile URL"
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Analyze
      </button>
      {status && <p className="text-sm text-gray-200 mt-2">{status}</p>}
    </form>
  );
}
