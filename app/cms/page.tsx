'use client'
import React, { useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2";
import DaftarDokumen from './DaftarDokumen'; // Pastikan path sesuai dengan struktur folder Anda

const CMSPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'documents' | 'logout'>('dashboard');

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold mb-4">Konten Utama Dashboard</h2>
            <p>Ini adalah area konten utama untuk halaman Dashboard Anda.</p>
          </div>
        );
      case 'documents':
        return <DaftarDokumen />;
      case 'logout':
        return (
          <div className="flex-1 p-8">
            <h2 className="text-2xl font-bold mb-4">Anda telah keluar.</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-2xl font-bold">Admin ITJEN</h1>
        </div>
        <nav className="flex-1 px-4 py-8">
          <ul className="space-y-4">
            <li className="flex items-center">
              <AiOutlineDashboard className="text-xl mr-2" />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setCurrentPage('dashboard')}>
                Dashboard
              </a>
            </li>
            <li className="flex items-center">
              <IoDocumentTextOutline className='text-xl mr-2' />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setCurrentPage('documents')}>
                Documents
              </a>
            </li>
            <li className="flex items-center">
              <HiArrowLeftEndOnRectangle className='text-xl mr-2' />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setCurrentPage('logout')}>
                Keluar
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {renderContent()}
    </div>
  );
};

export default CMSPage;
