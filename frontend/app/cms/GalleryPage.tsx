import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Gallery {
  id: number;
  image_path: string;
  
}

const GalleryPage: React.FC = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
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

           
            {/* Add additional fields or actions as needed */}
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default GalleryPage;
