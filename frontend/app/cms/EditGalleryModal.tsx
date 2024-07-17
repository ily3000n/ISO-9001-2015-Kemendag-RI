import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Gallery } from './GalleryPage'; // Adjust the path if necessary

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  gallery: Gallery;
  onSave: (updatedGallery: Gallery) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, gallery, onSave }) => {
  const [imagePath, setImagePath] = useState(gallery.image_path);

  const handleSave = () => {
    if (!imagePath) {
      toast.error('Image path cannot be empty');
      return;
    }

    const updatedGallery = { ...gallery, image_path: imagePath };
    onSave(updatedGallery);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Edit Image</h2>
        <input
          type="text"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter image path"
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
