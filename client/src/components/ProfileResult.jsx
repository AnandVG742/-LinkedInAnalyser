import React from 'react';

export default function ProfileResult({ result }) {
  if (!result) return null;

  return (
    <div id="profile-result">
      <h2>Name: {result.name}</h2>
      <p>Headline: {result.headline}</p>
      <p>Location: {result.location}</p>
      <p><strong>About:</strong> {result.about}</p>
      <p><strong>Experience:</strong> {result.experiences.join(', ')}</p>
      <p><strong>Skills:</strong> {result.skills.join(', ')}</p>
      <h3>Profile Score: {result.score}%</h3>
    </div>
  );
}
