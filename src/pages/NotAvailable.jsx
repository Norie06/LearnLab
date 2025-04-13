import React from 'react';
import '../App.css';
import './NotAvailable.css'; // Import your CSS file for styling

function NotAvailable() {
  return (
    <div id="not_available_page" className="flex flex-col items-center justify-center h-screen">
      <header className="hero">
        <h1 className="text-4xl font-bold mb-4">Coming Soon!</h1>
        <p className="text-lg">This page is not available yet. Stay tuned!</p>
      </header>
    </div>
  );
}

export default NotAvailable;