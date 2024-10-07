'use client';

import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold text-gray-800">ActionEye</span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
            <li><Link href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</Link></li>
            <li><Link href="/analytics" className="text-gray-600 hover:text-gray-800">Analytics</Link></li>
            <li><Link href="/settings" className="text-gray-600 hover:text-gray-800">Settings</Link></li>
          </ul>
        </nav>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
