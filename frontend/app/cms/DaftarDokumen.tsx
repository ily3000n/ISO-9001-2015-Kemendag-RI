import React, { useState } from 'react';
import { Docs } from '@/data/index'; // Make sure the index.ts file path is correct
import AddDocumentModal from './AddDocumentModal';
import UpdateDocumentModal from './UpdateDocumentModal'; // Import UpdateDocumentModal

const DaftarDokumen: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Doc[]>(Docs); // Using state to store documents
  const [selectedDocument, setSelectedDocument] = useState<Doc | null>(null); // State to store the selected document for updating

  // Function to handle adding a new document
  const handleAddDocument = (formData: FormData) => {
    // Simulate adding a document by appending to state
    const newDocument: Doc = {
      id: documents.length + 1, // Example temporary ID setting
      thumbnail: URL.createObjectURL(formData.get('thumbnail') as Blob),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      link: formData.get('link') as string,
    };
    setDocuments([...documents, newDocument]);
    setIsAddModalOpen(false);
  };

  // Function to handle updating a document
  const handleUpdateDocument = (formData: FormData) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === selectedDocument?.id
        ? {
            ...doc,
            thumbnail: formData.get('thumbnail')
              ? URL.createObjectURL(formData.get('thumbnail') as Blob)
              : doc.thumbnail,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            link: formData.get('link') as string,
          }
        : doc
    );
    setDocuments(updatedDocuments);
    setIsUpdateModalOpen(false);
  };

  // Function to handle deleting a document
  const handleDeleteDocument = (id: number) => {
    const filteredDocuments = documents.filter((doc) => doc.id !== id);
    setDocuments(filteredDocuments);
  };

  return (
    <div className="overflow-x-auto mx-auto p-2">
      <h2 className="text-2xl font-bold mb-4">Daftar Dokumen</h2>
      <button
        onClick={() => setIsAddModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
      >
        Tambah Dokumen
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              ID
            </th>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              Thumbnail
            </th>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              Judul
            </th>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              Link
            </th>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              Deskripsi
            </th>
            <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                {doc.id}
              </td>
              <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                <img
                  src={doc.thumbnail}
                  alt={doc.title}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                {doc.title}
              </td>
              <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
                {doc.link}
              </td>
              <td className="border border-gray-200 px-6 py-4 whitespace-wrap">
                {doc.description}
              </td>
              <td className="border border-gray-200 px-6 py-4 whitespace-nowrap space-x-2">
                <button
                  onClick={() => {
                    setSelectedDocument(doc);
                    setIsUpdateModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddDocument={handleAddDocument}
      />
      {selectedDocument && (
        <UpdateDocumentModal
          isOpen={isUpdateModalOpen}
          initialData={selectedDocument}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateDocument={handleUpdateDocument}
        />
      )}
    </div>
  );
};

export default DaftarDokumen;

interface Doc {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  link: string;
}
