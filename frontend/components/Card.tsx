import React, { useEffect, useState } from 'react';
import { Button } from './ui/moving-border';
import Image from 'next/image';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Document {
  id: number;
  file_name: string;
  description: string;
  link: string;
  image_path: string;
}

const Card: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); // State for current page
  const itemsPerPage = 6; // Number of items per page
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/documents`);
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data: Document[] = await response.json();
        setDocs(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [backendUrl]);

  // Pagination logic
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate pagination range
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="py-20 px-4 bg-gray-100" id="exp">
      <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
        Daftar&nbsp;
        <span className="text-cyan-500">Dokumen</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {docs.slice(startIndex, endIndex).map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderColor="#22c55e"
            borderRadius="1.75rem"
            className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-cyan-500 bg-white shadow-lg"
          >
            <div className="flex flex-col lg:flex-row items-center p-6 gap-6">
              <div className="flex-shrink-0 w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-48">
                <Image
                  src={`${backendUrl}/${card.image_path}`}
                  alt={card.file_name}
                  width={300}
                  height={300}
                  className="object-cover rounded-lg"
                />  
              </div>
              <div className="flex-1 lg:ml-5">
                <div className='text-lg md:text-2xl lg:text-xl font-extrabold text-blue-950'>
                  {card.file_name}
                </div>
                <div className='text-sm md:text-base text-gray-700 mt-2 mb-11'>
                  {card.description}
                </div>
                <div>
                  <Button className='bg-cyan-500 p-2 '>
                    <a href={card.link} target='blank'>Akses Dokumen Ini</a>
                  </Button>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination
          count={Math.ceil(docs.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default Card;
