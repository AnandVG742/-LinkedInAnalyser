import React, { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import ProfileResult from './components/ProfileResult';

export default function App() {
  const [result, setResult] = useState(null);
  return (
    <div>
      <h1>LinkedIn Profile Analyzer</h1>
      <ProfileForm setResult={setResult} />
      <ProfileResult result={result} />
    </div>
  );
}
