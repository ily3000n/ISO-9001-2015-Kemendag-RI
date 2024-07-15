import React, { useEffect, useState } from 'react';
import { Button } from './ui/moving-border';
import Image from 'next/image';
import Pagination from '@mui/material/Pagination';
import Particles from '@/components/magicui/particles';
import Stack from '@mui/material/Stack';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegCopy } from 'react-icons/fa';

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
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="relative py-20 px-4 bg-gray-100" id="exp">
      <Particles className="absolute inset-1 z-1" quantity={1000} color="#22c55e" />
      <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl relative z-10">
        Daftar&nbsp;
        <span className="text-cyan-500">Dokumen</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {docs.slice(startIndex, endIndex).map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderColor="#22c55e"
            borderRadius="1.75rem"
            className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-cyan-500 bg-white shadow-lg relative z-10"
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
                <div className="flex items-center gap-2">
                  <Button className='bg-cyan-500 p-2'>
                    <a href={card.link} target='blank'>Akses Dokumen Ini</a>
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(card.link);
                      toast.info('Link copied to clipboard!');
                    }}
                    className="bg-cyan-500 text-white py-2 px-3 rounded-md hover:bg-cyan-600 flex items-center gap-2"
                  >
                    <FaRegCopy />
                  </Button>
                </div>
              </div>
            </div>
          </Button>
        ))}
      </div>
      <div className="flex justify-center mt-8 relative z-10">
        <Pagination
          count={Math.ceil(docs.length / itemsPerPage)}
          page={page}
          onChange={handleChange}
          shape="rounded"
          variant="outlined"
          color="primary"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
