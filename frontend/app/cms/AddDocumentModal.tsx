import React, { useState } from 'react';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDocument: (formData: FormData) => void;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  isOpen,
  onClose,
  onAddDocument,
}) => {
  const [imagePath, setImagePath] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleImagePathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagePath(event.target.files[0]);
    }
  };

  const handleAddDocument = () => {
    const formData = new FormData();
    if (imagePath) {
      formData.append('image', imagePath);
    }
    formData.append('file_name', fileName);
    formData.append('link', link);
    formData.append('description', description);

    onAddDocument(formData);
    resetForm(); // Reset form values after adding document
    onClose();
  };

  const resetForm = () => {
    setImagePath(null); // Reset imagePath to null
    setFileName('');
    setLink('');
    setDescription('');

    // Reset input type="file" value to null
    const fileInput = document.getElementById(
      'imagePathInput'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-10">
        <h2 className="text-xl font-bold mb-4">Tambah Dokumen Baru</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Image Path
            </label>
            <input
              id="imagePathInput"
              type="file"
              onChange={handleImagePathChange}
              accept="image/*"
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
              rows={4}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-gray-600 hover:text-gray-800"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;

// // components/AddDocumentModal.tsx

// import React, { useState } from 'react';

// interface AddDocumentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddDocument: (formData: FormData) => void;
// }

// const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose, onAddDocument }) => {
//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const [title, setTitle] = useState<string>('');
//   const [link, setLink] = useState<string>('');
//   const [description, setDescription] = useState<string>('');

//   const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setThumbnail(event.target.files[0]);
//     }
//   };

//   const handleAddDocument = () => {
//     const formData = new FormData();
//     if (thumbnail) {
//       formData.append('thumbnail', thumbnail);
//     }
//     formData.append('title', title);
//     formData.append('link', link);
//     formData.append('description', description);

//     onAddDocument(formData);
//     resetForm(); // Reset form values after adding document
//     onClose();
//   };

//   const resetForm = () => {
//     setThumbnail(null); // Reset thumbnail to null
//     setTitle('');
//     setLink('');
//     setDescription('');

//     // Reset input type="file" value to null
//     const fileInput = document.getElementById('thumbnailInput') as HTMLInputElement;
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   return (
//     <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="bg-white p-8 rounded-lg z-10">
//         <h2 className="text-xl font-bold mb-4">Tambah Dokumen Baru</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
//             <input
//               id="thumbnailInput"
//               type="file"
//               onChange={handleThumbnailChange}
//               accept="image/*"
//               className="border border-gray-300 px-3 py-2 w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Judul</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 px-3 py-2 w-full" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Link</label>
//             <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="border border-gray-300 px-3 py-2 w-full" />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
//             <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 px-3 py-2 w-full" rows={4}></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button type="button" onClick={handleAddDocument} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Simpan</button>
//             <button type="button" onClick={onClose} className="ml-2 text-gray-600 hover:text-gray-800">Batal</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDocumentModal;
