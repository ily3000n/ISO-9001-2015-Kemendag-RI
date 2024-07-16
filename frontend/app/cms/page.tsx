'use client';
import React, { useEffect, useState } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoDocumentTextOutline, IoHomeOutline } from 'react-icons/io5';
import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';
import { GrGallery } from 'react-icons/gr';
import DaftarDokumen from './DaftarDokumen'; 
import GalleryPage from './GalleryPage'; // Import the new GalleryPage component

const CMSPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<
    'dashboard' | 'documents' | 'gallery' | 'logout'
  >('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href = 'https://iso-9001-2015-kemendag-ri.vercel.app/login';
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = 'https://iso-9001-2015-kemendag-ri.vercel.app/login';
  };

  if (!isLoggedIn) {
    return null; // Render nothing or a loading spinner while checking login status
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
        return <GalleryPage />; // Render the GalleryPage component
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
      <aside className="w-64 bg-gray-800 text-white flex flex-col items-center justify-center">
        <div className="flex items-center justify-center h-16">
          <h1 className="text-2xl font-bold">Admin ITJEN</h1>
        </div>
        <nav className="flex-1 px-4 py-8 flex flex-col items-center">
          <ul className="space-y-4 w-full">
            <li className="flex items-center justify-start w-full">
              <AiOutlineDashboard className="text-xl mr-2" />
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </a>
            </li>
            <li className="flex items-center justify-start w-full">
              <IoDocumentTextOutline className="text-xl mr-2" />
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                onClick={() => setCurrentPage('documents')}
              >
                Documents
              </a>
            </li>
            <li className="flex items-center justify-start w-full">
              <IoHomeOutline className="text-xl mr-2" />
              <a
                href="/"
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                Home
              </a>
            </li>
            <li className="flex items-center justify-start w-full">
              <GrGallery className="text-xl mr-2" />
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                onClick={() => setCurrentPage('gallery')}
              >
                Gallery
              </a>
            </li>
            <li className="flex items-center justify-start w-full">
              <HiArrowLeftEndOnRectangle className="text-xl mr-2" />
              <a
                href="#"
                className="block py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
                onClick={handleLogout}
              >
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
