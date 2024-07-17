'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoDocumentTextOutline, IoHomeOutline } from 'react-icons/io5';
import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';
import { GrGallery } from 'react-icons/gr';
import DaftarDokumen from './DaftarDokumen';
import GalleryPage from './GalleryPage';

type PageType = 'dashboard' | 'documents' | 'gallery' | 'logout';

const CMSPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = 'http://localhost:3000/login';
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = 'http://localhost:3000/login';
  };

  if (!isLoggedIn) {
    return null;
  }

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
      case 'gallery':
        return <GalleryPage />;
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

  const NavItem: React.FC<{
    icon: JSX.Element;
    label: string;
    onClick: () => void;
  }> = ({ icon, label, onClick }) => (
    <li className="flex items-center justify-start w-full">
      {icon}
      <a
        href="#"
        className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
        onClick={onClick}
        aria-label={label}
      >
        {label}
      </a>
    </li>
  );

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-2xl font-bold">Admin ITJEN</h1>
        </div>
        <nav className="flex-1 px-4 py-8 flex flex-col items-center">
          <ul className="space-y-4 w-full">
            <NavItem
              icon={<AiOutlineDashboard className="text-xl mr-2" />}
              label="Dashboard"
              onClick={() => setCurrentPage('dashboard')}
            />
            <NavItem
              icon={<IoDocumentTextOutline className="text-xl mr-2" />}
              label="Documents"
              onClick={() => setCurrentPage('documents')}
            />
            <NavItem
              icon={<IoHomeOutline className="text-xl mr-2" />}
              label="Home"
              onClick={() => (window.location.href = '/')}
            />
            <NavItem
              icon={<GrGallery className="text-xl mr-2" />}
              label="Gallery"
              onClick={() => setCurrentPage('gallery')}
            />
            <NavItem
              icon={<HiArrowLeftEndOnRectangle className="text-xl mr-2" />}
              label="Keluar"
              onClick={handleLogout}
            />
          </ul>
        </nav>
      </aside>
      {renderContent()}
    </div>
  );
};

export default CMSPage;
