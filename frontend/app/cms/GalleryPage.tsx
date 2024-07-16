import React, { useState } from 'react';

interface Image {
  id: number;
  src: string;
  title: string;
  description: string;
}

const sampleImages: Image[] = [
  {
    id: 1,
    src: 'https://via.placeholder.com/150',
    title: 'Image 1',
    description: 'Description of Image 1',
  },
  {
    id: 2,
    src: 'https://via.placeholder.com/150',
    title: 'Image 2',
    description: 'Description of Image 2',
  },
  {
    id: 3,
    src: 'https://via.placeholder.com/150',
    title: 'Image 3',
    description: 'Description of Image 3',
  },
];

const GalleryPage: React.FC = () => {
  const [images, setImages] = useState<Image[]>(sampleImages);

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">Galeri</h2>
      <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="border p-4 rounded shadow-sm">
            <img src={image.src} alt={image.title} className="w-full h-48 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{image.title}</h3>
            <p className="text-sm text-gray-600">{image.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
