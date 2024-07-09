
import React, { useState, useEffect } from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';

interface Document {
  id: number;
  name: string;
  link: string;
}

const CMSPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    // Load documents when component mounts (client-side)
    setDocuments([
      { id: 1, name: 'Document 1', link: 'http://document1.com' },
      { id: 2, name: 'Document 2', link: 'http://document2.com' },
      { id: 3, name: 'Document 3', link: 'http://document3.com' },
    ]);
  }, []);

  const handleDeleteDocument = (id: number) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
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
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Dashboard</a>
            </li>
            <li className="flex items-center">
              <IoDocumentTextOutline className="text-xl mr-2" />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Documents</a>
            </li>
            <li className="flex items-center">
              <HiArrowLeftEndOnRectangle className="text-xl mr-2" />
              <a href="#" className="block py-2 px-4 rounded hover:bg-gray-700">Keluar</a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Daftar Dokumen</h2>
        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Tambah Dokumen
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama Dokumen</th>
              <th className="py-2 px-4">Link Dokumen</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={doc.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{doc.name}</td>
                <td className="py-2 px-4">{doc.link}</td>
                <td className="py-2 px-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default useClient(CMSPage); // Marking component as client-side
