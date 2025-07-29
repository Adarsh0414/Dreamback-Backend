import React from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 text-gray-800">
      <h1 className="text-3xl font-bold text-center mb-6">DreamBack</h1>
      <MessageForm />
      <hr className="my-6" />
      <MessageList />
    </div>
  );
}

export default App;