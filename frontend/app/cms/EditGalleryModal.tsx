import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Gallery } from './GalleryPage'; // Adjust the path if necessary

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  gallery: Gallery;
  onSave: (updatedGallery: Gallery, newImageFile: File | null) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, gallery, onSave }) => {
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const handleSave = () => {
    if (!newImageFile) {
      toast.error('Please select an image to upload');
      return;
    }

    onSave(gallery, newImageFile);
    onClose();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setNewImageFile(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
