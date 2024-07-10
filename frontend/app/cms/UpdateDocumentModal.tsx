// components/UpdateDocumentModal.tsx

import React, { useState, useEffect } from 'react';

interface UpdateDocumentModalProps {
  isOpen: boolean;
  initialData: {
    id: number;
    thumbnail: string;
    title: string;
    link: string;
    description: string;
  } | null;
  onClose: () => void;
  onUpdateDocument: (formData: FormData) => void;
}

const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({ isOpen, initialData, onClose, onUpdateDocument }) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setLink(initialData.link);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setThumbnail(event.target.files[0]);
    }
  };

  const handleUpdateDocument = () => {
    const formData = new FormData();
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    formData.append('title', title);
    formData.append('link', link);
    formData.append('description', description);

    onUpdateDocument(formData);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-10">
        <h2 className="text-xl font-bold mb-4">Update Dokumen</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <input
              type="file"
              onChange={handleThumbnailChange}
              accept="image/*"
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
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
              onClick={handleUpdateDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Simpan Perubahan
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

export default UpdateDocumentModal;
