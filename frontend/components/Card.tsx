import React, { useEffect, useState } from 'react';
import { Button } from './ui/moving-border';
import Image from 'next/image';

interface Document {
  id: number;
  file_name: string;
  description: string;
  link: string;
  image_path: string;
}

const Card = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/documents');
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data: Document[] = await response.json();
        setDocs(data);
      } catch (err) {
        // Periksa tipe dari error
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="py-20 px-4 bg-gray-100" id="exp">
      <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
        Daftar&nbsp;
        <span className="text-cyan-500">Dokumen</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {docs.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderColor="#32CD32"
            borderRadius="1.75rem"
            className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-gray-300 bg-white shadow-lg"
          >
            <div className="flex flex-col lg:flex-row items-center p-6 gap-6">
              <div className="flex-shrink-0 w-32 h-32 md:w-36 md:h-36 lg:w-48 lg:h-48">
                <Image
                  src={`http://localhost:8080/${card.image_path}`}
                  alt={card.file_name}
                  layout="responsive"
                  width={200}
                  height={200}
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 lg:ml-5">
                <h1 className="text-lg md:text-2xl lg:text-xl font-extrabold text-blue-950">
                  {card.file_name}
                </h1>
                <p className="text-sm md:text-base text-gray-700 mt-2">
                  {card.description}
                </p>
                <p className="text-sm md:text-base text-gray-700 mt-2">
                  {card.link}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Card;

// import { Docs } from '@/data/index';
// import React from 'react';
// import { Button } from './ui/moving-border';
// import Image from 'next/image';

// const Card = () => {
//   return (
//     <div className="py-20 px-4 bg-gray-100" id="exp">
//       <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
//         Daftar&nbsp;
//         <span className="text-cyan-500">Dokumen</span>
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {Docs.map((card) => (
//           <Button
//             key={card.id}
//             duration={Math.floor(Math.random() * 10000) + 10000}
//             borderColor="#32CD32"
//             borderRadius="1.75rem"
//             className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-gray-300 bg-white shadow-lg"
//           >
//             <div className="flex flex-col lg:flex-row items-center p-6 gap-6">
//               <div className="flex-shrink-0 w-32 h-32 md:w-36 md:h-36 lg:w-48 lg:h-48">
//                 <Image
//                   src={card.thumbnail}
//                   alt={card.title}
//                   layout="responsive"
//                   width={200}
//                   height={200}
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//               <div className="flex-1 lg:ml-5">
//                 <h1 className="text-lg md:text-2xl lg:text-xl font-extrabold text-blue-950">
//                   {card.title}
//                 </h1>
//                 <p className="text-sm md:text-base text-gray-700 mt-2">
//                   {card.description}
//                 </p>
//                 <p className="text-sm md:text-base text-gray-700 mt-2">
//                   {card.link}
//                 </p>
//               </div>
//             </div>
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Card;
