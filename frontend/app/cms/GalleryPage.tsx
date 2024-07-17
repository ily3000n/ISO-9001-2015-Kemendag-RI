import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Gallery {
  id: number;
  image_path: string;
}

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-1/3 relative">
        <button
          className="absolute top-2 right-2 text-gray-600"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

const GalleryPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log('Backend URL:', backendUrl);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    if (!backendUrl) {
      toast.error('Backend URL is not defined');
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/api/gallery`);
      if (!response.ok) {
        throw new Error('Failed to fetch galleries');
      }
      const data = await response.json();
      console.log('Fetched gallery:', data);
      const formattedData = data.map((item: any) => ({
        id: item.ID,
        image_path: item.image_path,
      }));
      setGalleries(formattedData);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Error fetching galleries');
    }
  };

  const openModal = (gallery: Gallery) => {
    console.log('Opening modal for gallery:', gallery);
    setSelectedGallery(gallery);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedGallery(null);
    setNewImage(null);
    setModalIsOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleUpdateGallery = async () => {
    if (!selectedGallery || !newImage) {
      toast.error('Please select a new image');
      return;
    }

    console.log('Selected gallery:', selectedGallery);
    console.log('New image:', newImage);

    const formData = new FormData();
    formData.append('image', newImage);
    formData.append('id', selectedGallery.id.toString());

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await fetch(`${backendUrl}/api/galleries/${selectedGallery.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update gallery');
      }

      const updatedGallery: Gallery = await response.json();
      const updatedGalleries = galleries.map((gallery) =>
        gallery.id === updatedGallery.id ? updatedGallery : gallery
      );
      setGalleries(updatedGalleries);
      setModalIsOpen(false);
      toast.success('Gallery updated successfully');
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error('Error updating gallery');
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-3 gap-4">
        {galleries.map((gallery) => (
          <div key={gallery.id} className="border p-4 rounded shadow-sm">
            <img
              src={`${backendUrl}/${gallery.image_path}`}
              width={200}
              height={200}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <button
              onClick={() => openModal(gallery)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />

      <Modal isOpen={modalIsOpen} onClose={closeModal}>
        <h2 className="text-xl mb-4">Edit Gallery</h2>
        <input type="file" onChange={handleImageChange} />
        <div className="mt-4">
          <button
            onClick={handleUpdateGallery}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
