import React, { useState, useEffect } from 'react';
import AddDocumentModal from './AddDocumentModal';
import UpdateDocumentModal from './UpdateDocumentModal';

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
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null
  );

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetchDocuments();
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
    }
  };

  const handleAddDocument = async (formData: FormData) => {
    try {
      const token = sessionStorage.getItem('token');
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
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleUpdateDocument = async (formData: FormData, id: number) => {
    try {
      const token = sessionStorage.getItem('token');
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
    } catch (error) {
      console.error('Error updating document:', error);
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
    } catch (error) {
      console.error('Error deleting document:', error);
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
              <td className="py-2 px-4 border-b">{doc.link}</td>
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
    </div>
  );
};

export default DaftarDokumen;

// import React, { useState } from 'react';
// import { Docs } from '@/data/index'; // Make sure the index.ts file path is correct
// import AddDocumentModal from './AddDocumentModal';
// import UpdateDocumentModal from './UpdateDocumentModal'; // Import UpdateDocumentModal

// const DaftarDokumen: React.FC = () => {
//   const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
//   const [documents, setDocuments] = useState<Doc[]>(Docs); // Using state to store documents
//   const [selectedDocument, setSelectedDocument] = useState<Doc | null>(null); // State to store the selected document for updating

//   // Function to handle adding a new document
//   const handleAddDocument = (formData: FormData) => {
//     // Simulate adding a document by appending to state
//     const newDocument: Doc = {
//       id: documents.length + 1, // Example temporary ID setting
//       thumbnail: URL.createObjectURL(formData.get('thumbnail') as Blob),
//       title: formData.get('title') as string,
//       description: formData.get('description') as string,
//       link: formData.get('link') as string,
//     };
//     setDocuments([...documents, newDocument]);
//     setIsAddModalOpen(false);
//   };

//   // Function to handle updating a document
//   const handleUpdateDocument = (formData: FormData) => {
//     const updatedDocuments = documents.map((doc) =>
//       doc.id === selectedDocument?.id
//         ? {
//             ...doc,
//             thumbnail: formData.get('thumbnail')
//               ? URL.createObjectURL(formData.get('thumbnail') as Blob)
//               : doc.thumbnail,
//             title: formData.get('title') as string,
//             description: formData.get('description') as string,
//             link: formData.get('link') as string,
//           }
//         : doc
//     );
//     setDocuments(updatedDocuments);
//     setIsUpdateModalOpen(false);
//   };

//   // Function to handle deleting a document
//   const handleDeleteDocument = (id: number) => {
//     const filteredDocuments = documents.filter((doc) => doc.id !== id);
//     setDocuments(filteredDocuments);
//   };

//   return (
//     <div className="overflow-x-auto mx-auto p-2">
//       <h2 className="text-2xl font-bold mb-4">Daftar Dokumen</h2>
//       <button
//         onClick={() => setIsAddModalOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
//       >
//         Tambah Dokumen
//       </button>
//       <table className="min-w-full bg-white border border-gray-200">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               ID
//             </th>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               Thumbnail
//             </th>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               Judul
//             </th>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               Link
//             </th>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               Deskripsi
//             </th>
//             <th className="border border-gray-200 px-6 py-3 text-left text-sm font-bold text-gray-700">
//               Aksi
//             </th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {documents.map((doc) => (
//             <tr key={doc.id}>
//               <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                 {doc.id}
//               </td>
//               <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                 <img
//                   src={doc.thumbnail}
//                   alt={doc.title}
//                   className="w-16 h-16 object-cover"
//                 />
//               </td>
//               <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                 {doc.title}
//               </td>
//               <td className="border border-gray-200 px-6 py-4 whitespace-nowrap">
//                 {doc.link}
//               </td>
//               <td className="border border-gray-200 px-6 py-4 whitespace-wrap">
//                 {doc.description}
//               </td>
//               <td className="border border-gray-200 px-6 py-4 whitespace-nowrap space-x-2">
//                 <button
//                   onClick={() => {
//                     setSelectedDocument(doc);
//                     setIsUpdateModalOpen(true);
//                   }}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDeleteDocument(doc.id)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                 >
//                   Hapus
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <AddDocumentModal
//         isOpen={isAddModalOpen}
//         onClose={() => setIsAddModalOpen(false)}
//         onAddDocument={handleAddDocument}
//       />
//       {selectedDocument && (
//         <UpdateDocumentModal
//           isOpen={isUpdateModalOpen}
//           initialData={selectedDocument}
//           onClose={() => setIsUpdateModalOpen(false)}
//           onUpdateDocument={handleUpdateDocument}
//         />
//       )}
//     </div>
//   );
// };

// export default DaftarDokumen;

// interface Doc {
//   id: number;
//   thumbnail: string;
//   title: string;
//   description: string;
//   link: string;
// }
