import React from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoDocumentTextOutline } from "react-icons/io5";
import { HiArrowLeftEndOnRectangle } from "react-icons/hi2"

const CMSPage: React.FC = () => {
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
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
            </li >
            <li className="flex items-center">
            <IoDocumentTextOutline className='text-xl mr-2' />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Documents</a>
            </li>
            <li className="flex items-center">
            <HiArrowLeftEndOnRectangle className='text-xl mr-2' />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Keluar</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Konten Utama</h2>
        <p>Ini adalah area konten utama untuk halaman CMS Anda.</p>
      </main>
    </div>
  );
};

export default CMSPage;