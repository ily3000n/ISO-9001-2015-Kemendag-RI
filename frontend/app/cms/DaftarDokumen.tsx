import React, { useState, useEffect } from 'react';
import AddDocumentModal from './AddDocumentModal';
import UpdateDocumentModal from './UpdateDocumentModal';
import { Button } from '../../components/ui/moving-border';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Document {
  ID: number;
  file_name: string;
  description: string;
  link: string;
  image_path: string;
}
const DaftarDokumen: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetchDocuments();
    
    const interval = setInterval(fetchDocuments, 2000); // Poll every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/documents`);
      if (!response.ok) {
        throw new Error('Failed to fetch documents');
      }
      const data: Document[] = await response.json();
      console.log('Fetched documents:', data);
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Error fetching documents');
    }
  };
  const handleAddDocument = async (formData: FormData) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await fetch(`${backendUrl}/api/document`, {
        method: 'POST',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add document');
      }
      const newDocument: Document = await response.json();
      setDocuments([...documents, newDocument]);
      setIsAddModalOpen(false);
      toast.success('Document added successfully');
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Error adding document');
    }
  };
  const handleUpdateDocument = async (formData: FormData, id: number) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      formData.append('id', id.toString());
      const response = await fetch(`${backendUrl}/api/document`, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to update document');
      }
      const updatedDocument: Document = await response.json();
      const updatedDocuments = documents.map((doc) =>
        doc.ID === updatedDocument.ID ? updatedDocument : doc
      );
      setDocuments(updatedDocuments);
      setIsUpdateModalOpen(false);
      toast.success('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Error updating document');
    }
  };
  const handleDeleteDocument = async (id: number | undefined) => {
    try {
      if (id === undefined) {
        console.error('Document ID is undefined');
        return;
      }
      console.log('Deleting document with ID:', id);
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }
      const response = await fetch(`${backendUrl}/api/document/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete document: ${errorMessage}`);
      }
      const filteredDocuments = documents.filter((doc) => doc.ID !== id);
      setDocuments(filteredDocuments);
      toast.success('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Error deleting document');
    }
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
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.ID}>
              <td className="py-2 px-4 border-b">{doc.ID}</td>
              <td className="py-2 px-4 border-b">{doc.file_name}</td>
              <td className="py-2 px-4 border-b">{doc.description}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center">
                  <Button className="bg-cyan-500 p-2 hover:bg-cyan-600">
                    <a href={doc.link} className="text-white" target="_blank" rel="noopener noreferrer">
                      Akses Dokumen Ini
                    </a>
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(doc.link);
                      toast.info('Link copied to clipboard!');
                    }}
                    className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600"
                  >
                    Copy Link
                  </Button>
                </div>
              </td>
              <td className="py-2 px-4 border-b">
                <img
                  src={`${backendUrl}/${doc.image_path}`}
                  alt={doc.file_name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setSelectedDocument(doc);
                    setIsUpdateModalOpen(true);
                  }}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteDocument(doc.ID)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAddModalOpen && (
        <AddDocumentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddDocument={handleAddDocument}
        />
      )}
      {isUpdateModalOpen && selectedDocument && (
        <UpdateDocumentModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdateDocument={handleUpdateDocument}
          initialData={selectedDocument}
        />
      )}
      <ToastContainer />
    </div>
  );
};
export default DaftarDokumen;