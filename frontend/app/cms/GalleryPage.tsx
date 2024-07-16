import React, { useState, useEffect } from 'react';

interface GalleryImage {
  ID: number;
  image_path: string;
}

interface UpdateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateGalleryImage: (formData: FormData, id: number) => void;
  initialData: GalleryImage;
}

const UpdateGalleryModal: React.FC<UpdateGalleryModalProps> = ({
  isOpen,
  onClose,
  onUpdateGalleryImage,
  initialData,
}) => {
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setImage(null); // Reset image state when the modal is closed
    }
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }
    const formData = new FormData();
    formData.append('image', image);
    onUpdateGalleryImage(formData, initialData.ID);
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Update Gallery Image</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="image-upload"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Image
            </label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UpdateGalleryModal;
