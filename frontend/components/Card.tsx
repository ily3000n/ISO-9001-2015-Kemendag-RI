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

const Card: React.FC = () => {
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                    <a href={card.link}>Akses Dokumen Ini</a>
                    
                  </Button>
                </div>
                
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

// interface Document {
//   id: number;
//   file_name: string;
//   description: string;
//   link: string;
//   image_path: string;
// }

// const Card: React.FC = () => {
//   const [docs, setDocs] = useState<Document[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       try {
//         const response = await fetch(`${backendUrl}/api/documents`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch documents');
//         }
//         const data: Document[] = await response.json();
//         setDocs(data);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError('An unknown error occurred');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDocuments();
//   }, [backendUrl]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//   return (
//     <div className="py-20 px-4 bg-gray-100" id="exp">
//       <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
//         Daftar&nbsp;
//         <span className="text-cyan-500">Dokumen</span>
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//         {docs.map((card) => (
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
//                   src={`${backendUrl}/${card.image_path}`}
//                   alt={card.file_name}
//                   layout="responsive"
//                   width={200}
//                   height={200}
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//               <div className="flex-1 lg:ml-5">
//                 <h1 className="text-lg md:text-2xl lg:text-xl font-extrabold text-blue-950">
//                   {card.file_name}
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

// // import { Docs } from '@/data/index';
// // import React from 'react';
// // import { Button } from './ui/moving-border';
// // import Image from 'next/image';

// // const Card = () => {
// //   return (
// //     <div className="py-20 px-4 bg-gray-100" id="exp">
// //       <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
// //         Daftar&nbsp;
// //         <span className="text-cyan-500">Dokumen</span>
// //       </h1>
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
// //         {Docs.map((card) => (
// //           <Button
// //             key={card.id}
// //             duration={Math.floor(Math.random() * 10000) + 10000}
// //             borderColor="#32CD32"
// //             borderRadius="1.75rem"
// //             className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-gray-300 bg-white shadow-lg"
// //           >
// //             <div className="flex flex-col lg:flex-row items-center p-6 gap-6">
// //               <div className="flex-shrink-0 w-32 h-32 md:w-36 md:h-36 lg:w-48 lg:h-48">
// //                 <Image
// //                   src={card.thumbnail}
// //                   alt={card.title}
// //                   layout="responsive"
// //                   width={200}
// //                   height={200}
// //                   className="object-cover rounded-lg"
// //                 />
// //               </div>
// //               <div className="flex-1 lg:ml-5">
// //                 <h1 className="text-lg md:text-2xl lg:text-xl font-extrabold text-blue-950">
// //                   {card.title}
// //                 </h1>
// //                 <p className="text-sm md:text-base text-gray-700 mt-2">
// //                   {card.description}
// //                 </p>
// //                 <p className="text-sm md:text-base text-gray-700 mt-2">
// //                   {card.link}
// //                 </p>
// //               </div>
// //             </div>
// //           </Button>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;
// import { Docs } from '@/data/index';
// import React from 'react';
// import { Button } from './ui/moving-border';
// import Image from 'next/image';
// import { faker } from '@faker-js/faker';

// const Card = () => {
//   return (
//     <div className="py-10 px-4 bg-gray-100" id="exp">
//       <h1 className="heading text-gray-900 text-center mb-8 font-poppins font-extrabold text-4xl">
//         Daftar&nbsp;
//         <span className="text-cyan-500">Dokumen</span>
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Docs.map((card) => (
//           <Button
//             key={card.id}
//             duration={Math.floor(Math.random() * 10000) + 10000}
//             borderColor="#32CD32"
//             borderRadius="1.75rem"
//             className="transform transition-transform hover:scale-105 flex-1 text-gray-900 border-gray-300 bg-white shadow-lg"
//           >
//             <div className="flex flex-col lg:flex-row items-center p-4 gap-4">
//               <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36">
//                 <Image
//                   src={faker.image.imageUrl(200, 200, 'nature', true)} // generates a random nature image
//                   alt={card.title}
//                   layout="responsive"
//                   width={144}
//                   height={144}
//                   className="object-cover rounded-lg"
//                 />
//               </div>
//               <div className="flex-1 lg:ml-4">
//                 <h1 className="text-lg md:text-xl lg:text-lg font-extrabold text-blue-950">
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
