// pages/documents.tsx
import React, { useState } from 'react';

interface Document {
  namaDokumen: string;
  tanggalPelaksanaan: string;
  tanggalDokumenMasuk: string;
}

const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [namaDokumen, setNamaDokumen] = useState('');
  const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState('');
  const [tanggalDokumenMasuk, setTanggalDokumenMasuk] = useState('');

  const handleAddDocument = () => {
    const newDocument: Document = {
      namaDokumen,
      tanggalPelaksanaan,
      tanggalDokumenMasuk,
    };
    setDocuments([...documents, newDocument]);
    setNamaDokumen('');
    setTanggalPelaksanaan('');
    setTanggalDokumenMasuk('');
  };

  const calculateScore = (docDate: string, eventDate: string): number => {
    const docDateObj = new Date(docDate);
    const eventDateObj = new Date(eventDate);
    const diffTime = eventDateObj.getTime() - docDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 7 ? 1 : 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Dokumen</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Nama Dokumen"
          className="border p-2 mb-2 w-full"
          value={namaDokumen}
          onChange={(e) => setNamaDokumen(e.target.value)}
        />
        <input
          type="date"
          placeholder="Tanggal Pelaksanaan"
          className="border p-2 mb-2 w-full"
          value={tanggalPelaksanaan}
          onChange={(e) => setTanggalPelaksanaan(e.target.value)}
        />
        <input
          type="date"
          placeholder="Tanggal Dokumen Masuk"
          className="border p-2 mb-2 w-full"
          value={tanggalDokumenMasuk}
          onChange={(e) => setTanggalDokumenMasuk(e.target.value)}
        />
        <button
          onClick={handleAddDocument}
          className="bg-blue-500 text-white p-2"
        >
          Tambah Dokumen
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Nomor</th>
              <th className="py-2">Nama Dokumen</th>
              <th className="py-2">Tanggal Pelaksanaan</th>
              <th className="py-2">Tanggal Dokumen Masuk</th>
              <th className="py-2">Skor</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td className="py-2 text-center">{index + 1}</td>
                <td className="py-2">{doc.namaDokumen}</td>
                <td className="py-2 text-center">{doc.tanggalPelaksanaan}</td>
                <td className="py-2 text-center">{doc.tanggalDokumenMasuk}</td>
                <td className="py-2 text-center">
                  {calculateScore(doc.tanggalDokumenMasuk, doc.tanggalPelaksanaan)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentsPage;
