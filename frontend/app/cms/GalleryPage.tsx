import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditModal from './EditGalleryModal';

export interface Gallery {
  id: number;
  image_path: string;
}

const GalleryPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
      const response = await fetch(`${backendUrl}/api/galleries`);
      if (!response.ok) {
        throw new Error('Failed to fetch galleries');
      }
      const data: Gallery[] = await response.json();
      console.log('Fetched galleries:', data);
      setGalleries(data);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Error fetching galleries');
    }
  };

  const handleEditClick = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedGallery: Gallery, newImageFile: File | null) => {
    if (!newImageFile) {
      toast.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', newImageFile);
    formData.append('id', updatedGallery.id.toString());

    try {
      const response = await fetch(`${backendUrl}/api/galleries/${updatedGallery.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update gallery');
      }

      const updatedImageData = await response.json();
      setGalleries((prevGalleries) =>
        prevGalleries.map((gallery) =>
          gallery.id === updatedGallery.id ? updatedImageData : gallery
        )
      );
      toast.success('Gallery updated successfully');
    } catch (error) {
      console.error('Error updating gallery:', error);
      toast.error('Error updating gallery');
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">Galeri</h2>
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
              onClick={() => handleEditClick(gallery)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      {selectedGallery && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          gallery={selectedGallery}
          onSave={handleSave}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default GalleryPage;
