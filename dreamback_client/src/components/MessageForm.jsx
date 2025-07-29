import React, { useState } from 'react';
import axios from 'axios';

function MessageForm() {
  const [userName, setUserName] = useState('');
  const [content, setContent] = useState('');
  const [unlockAt, setUnlockAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/messages', {
        userName, content, unlockAt
      });
      alert('Message saved!');
      setUserName('');
      setContent('');
      setUnlockAt('');
    } catch (err) {
      console.error(err);
      alert('Failed to save message.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
      <input type="text" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} className="w-full p-2 border rounded" required />
      <textarea placeholder="Write your message..." value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border rounded" rows="4" required />
      <input type="datetime-local" value={unlockAt} onChange={e => setUnlockAt(e.target.value)} className="w-full p-2 border rounded" required />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}

export default MessageForm;