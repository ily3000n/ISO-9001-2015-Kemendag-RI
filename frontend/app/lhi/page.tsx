'use client'
import { useState, useEffect } from 'react';
import Modal from './Modal';

interface Document {
  nomor: number;
  namaDokumen: string;
  tanggalSurat: string;
  tanggalPelaksanaan: string;
  skor: number;
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedDocuments = localStorage.getItem('documents');
    if (storedDocuments) {
      setDocuments(JSON.parse(storedDocuments));
    }
  }, []);

  const addDocument = (doc: Document) => {
    const newDocuments = [...documents, doc];
    setDocuments(newDocuments);
    localStorage.setItem('documents', JSON.stringify(newDocuments));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Document Management</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add Document
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={addDocument} />
      <table className="min-w-full bg-white mt-4">
        <thead>
          <tr>
            <th className="py-2">Nomor</th>
            <th className="py-2">Nama Dokumen</th>
            <th className="py-2">Tanggal Surat</th>
            <th className="py-2">Tanggal Pelaksanaan</th>
            <th className="py-2">Skor</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{doc.nomor}</td>
              <td className="border px-4 py-2">{doc.namaDokumen}</td>
              <td className="border px-4 py-2">{doc.tanggalSurat}</td>
              <td className="border px-4 py-2">{doc.tanggalPelaksanaan}</td>
              <td className="border px-4 py-2">{doc.skor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
