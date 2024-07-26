'use client';
import React, { useState, useEffect, useRef } from 'react';
import AuditTable from './AuditTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Home = () => {
  const [percentages, setPercentages] = useState<{
    [key: string]: string | null;
  }>({
    Surat: null,
    Pelaksanaan: null,
    SDM: null,
    Verifikasi: null,
    IHA: null,
    'Bukti TL': null,
    'Selesai Audit': null,
  });
  const [domesticPercentage, setDomesticPercentage] = useState<string | null>(
    null
  );
  const [foreignPercentage, setForeignPercentage] = useState<string | null>(
    null
  );

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const tableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      window.location.href =
        'https://iso-9001-2015-kemendag-ri.vercel.app/login';
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchPercentages = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const headers = {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        };

        const handleFetchError = (response: Response) => {
          if (response.status === 401) {
            sessionStorage.removeItem('token');
            window.location.href =
              'https://iso-9001-2015-kemendag-ri.vercel.app/login';
          }
        };

        const domesticResponse = await fetch(
          'https://iso-server-production.up.railway.app/api/audit/persentase-kategori/Domestik',
          { headers }
        );
        if (!domesticResponse.ok) {
          handleFetchError(domesticResponse);
          throw new Error('Domestic fetch error');
        }
        const domesticData = await domesticResponse.json();
        setDomesticPercentage(domesticData.persentase_kesesuaian.toString());

        const foreignResponse = await fetch(
          'https://iso-server-production.up.railway.app/api/audit/persentase-kategori/Luar Negeri',
          { headers }
        );
        if (!foreignResponse.ok) throw new Error('Foreign fetch error');
        const foreignData = await foreignResponse.json();
        setForeignPercentage(foreignData.persentase_kesesuaian.toString());

        const points = [
          'Surat',
          'Pelaksanaan',
          'SDM',
          'Verifikasi',
          'IHA',
          'Bukti TL',
          'Selesai Audit',
        ];

        const fetchComponentPercentages = async (point: string) => {
          try {
            const response = await fetch(
              `https://iso-server-production.up.railway.app/api/audit/persentase-poin-audit/${point}`,
              { headers }
            );
            if (!response.ok) throw new Error(`${point} fetch error`);
            const data = await response.json();
            console.log(`Fetched ${point}:`, data); // Debugging log
            setPercentages((prev) => ({
              ...prev,
              [data.poin_audit]: data.persentase_kesesuaian.toString(),
            }));
          } catch (error) {
            console.error(`Error fetching percentage for ${point}:`, error);
          }
        };

        for (const point of points) {
          await fetchComponentPercentages(point);
        }
      } catch (error) {
        console.error('Error fetching percentages:', error);
      }
    };

    fetchPercentages();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  const components = [
    'Surat Pemberitahuan Audit dikirim minimal 10 hari kerja sebelum audit dilaksanakan',
    'Jumlah hari pelaksanaan Audit',
    'Jumlah Sumber Daya Manusia dalam Pelaksanaan Audit',
    'Verifikasi Tindak Lanjut Hasil Audit dilaksanakan maksimal 7 hari kerja',
    'Penyelesaian IHA dan LHA maksimal 10 hari kerja setelah BA Exit',
    'Unit Kerja menyampaikan bukti TL pada Aplikasi SI PINTAR maksimal 40 hari kerja setelah BA Exit',
    'Sekretariat Itjen membuat Surat Selesai Audit maksimal 7 hari kerja setelah Seluruh TL dinyatakan selesai',
  ];

  const domainData = [
    { nomor: 1, type: 'Dana Dekonsentrasi', persentase: domesticPercentage },
    { nomor: 2, type: 'Perwakilan Perdagangan', persentase: foreignPercentage },
  ];

  const downloadPDF = async () => {
    if (tableRef.current) {
      const canvas = await html2canvas(tableRef.current, {
        scale: 2, // Optional: Increase scale for better quality
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4'); // A4 size in landscape
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('audit-table.pdf');
    }
  };

  return (
    <div className="container px-2">
      <h1 className="text-2xl font-bold mb-4">Audit Table</h1>
      <div ref={tableRef}>
        
      </div>
      <AuditTable />
      <button
        onClick={downloadPDF}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Download PDF
      </button>

      <h1 className="text-2xl font-bold mt-8 mb-4">PERSENTASE KOMPONEN DANA DEKONSENTRASI</h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr  className='bg-blue-950 text-white'>
            <th className="py-2 px-4 border border-gray-400">No</th>
            <th className="py-2 px-4 border border-gray-400">Komponen</th>
            <th className="py-2 px-4 border border-gray-400">Persentase</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => {
            const point = [
              'Surat',
              'Pelaksanaan',
              'SDM',
              'Verifikasi',
              'IHA',
              'Bukti TL',
              'Selesai Audit',
            ][index];
            return (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-400">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-gray-400">
                  {component}
                </td>
                <td className="py-2 px-4 border border-gray-400">
                  {percentages[point] ? `${percentages[point]}%` : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h1 className="text-2xl font-bold mt-8 mb-4">PERSENTASE KOMPONEN PERWAKILAN PERDAGANGAN  </h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className='bg-blue-950 text-white'>
            <th className="py-2 px-4 border border-gray-400">No</th>
            <th className="py-2 px-4 border border-gray-400">Komponen</th>
            <th className="py-2 px-4 border border-gray-400">Persentase</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => {
            const point = [
              'Surat',
              'Pelaksanaan',
              'SDM',
              'Verifikasi',
              'IHA',
              'Bukti TL',
              'Selesai Audit',
            ][index];
            return (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-400">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-gray-400">
                  {component}
                </td>
                <td className="py-2 px-4 border border-gray-400">
                  {percentages[point] ? `${percentages[point]}%` : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold mt-8 mb-4">
        PERSENTASE DANA DEKONSENTRASI DAN PERWAKILAN PERDAGANGAN
      </h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr  className='bg-blue-950 text-white'>
            <th className="py-2 px-4 border border-gray-400">No</th>
            <th className="py-2 px-4 border border-gray-400">Jenis Anggaran</th>
            <th className="py-2 px-4 border border-gray-400">Persentase</th>
          </tr>
        </thead>
        <tbody>
          {domainData.map((data, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-400">{data.nomor}</td>
              <td className="py-2 px-4 border border-gray-400">{data.type}</td>
              <td className="py-2 px-4 border border-gray-400">
                {data.persentase ? `${data.persentase}%` : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import AuditTable from './AuditTable';

// const Home = () => {
//   const [percentages, setPercentages] = useState<{
//     [key: string]: string | null;
//   }>({
//     Surat: null,
//     Pelaksanaan: null,
//     SDM: null,
//     Verifikasi: null,
//     IHA: null,
//     'Bukti TL': null,
//     'Selesai Audit': null,
//   });
//   const [domesticPercentage, setDomesticPercentage] = useState<string | null>(
//     null
//   );
//   const [foreignPercentage, setForeignPercentage] = useState<string | null>(
//     null
//   );

//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       window.location.href =
//         'https://iso-9001-2015-kemendag-ri.vercel.app/login';
//     } else {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isLoggedIn) return;

//     const fetchPercentages = async () => {
//       try {
//         const token = sessionStorage.getItem('token');
//         if (!token) {
//           console.error('No token found');
//           return;
//         }

//         const headers = {
//           Authorization: `${token}`,
//           'Content-Type': 'application/json',
//         };

//         // Fetch domestic percentage
//         const domesticResponse = await fetch(
//           'https://iso-server-production.up.railway.app/api/audit/persentase-kategori/Domestik',
//           { headers }
//         );
//         if (!domesticResponse.ok) throw new Error('Domestic fetch error');
//         const domesticData = await domesticResponse.json();
//         setDomesticPercentage(domesticData.persentase_kesesuaian.toString());

//         // Fetch foreign percentage
//         const foreignResponse = await fetch(
//           'https://iso-server-production.up.railway.app/api/audit/persentase-kategori/Luar Negeri',
//           { headers }
//         );
//         if (!foreignResponse.ok) throw new Error('Foreign fetch error');
//         const foreignData = await foreignResponse.json();
//         setForeignPercentage(foreignData.persentase_kesesuaian.toString());

//         // Fetch component percentages
//         const points = [
//           'Surat',
//           'Pelaksanaan',
//           'SDM',
//           'Verifikasi',
//           'IHA',
//           'Bukti TL',
//           'Selesai Audit',
//         ];

//         const fetchComponentPercentages = async (point: string) => {
//           try {
//             const response = await fetch(
//               `https://iso-server-production.up.railway.app/api/audit/persentase-poin-audit/${point}`,
//               { headers }
//             );
//             if (!response.ok) throw new Error(`${point} fetch error`);
//             const data = await response.json();
//             console.log(`Fetched ${point}:`, data); // Debugging log
//             setPercentages((prev) => ({
//               ...prev,
//               [data.poin_audit]: data.persentase_kesesuaian.toString(),
//             }));
//           } catch (error) {
//             console.error(`Error fetching percentage for ${point}:`, error);
//           }
//         };

//         for (const point of points) {
//           await fetchComponentPercentages(point);
//         }
//       } catch (error) {
//         console.error('Error fetching percentages:', error);
//       }
//     };

//     fetchPercentages();
//   }, [isLoggedIn]);

//   if (!isLoggedIn) {
//     return null;
//   }

//   const components = [
//     'Surat Pemberitahuan Audit dikirim minimal 10 hari kerja sebelum audit dilaksanakan',
//     'Jumlah hari pelaksanaan Audit',
//     'Jumlah Sumber Daya Manusia dalam Pelaksanaan Audit',
//     'Verifikasi Tindak Lanjut Hasil Audit dilaksanakan maksimal 7 hari kerja',
//     'Penyelesaian IHA dan LHA maksimal 10 hari kerja setelah BA Exit',
//     'Unit Kerja menyampaikan bukti TL pada Aplikasi SI PINTAR maksimal 40 hari kerja setelah BA Exit',
//     'Sekretariat Itjen membuat Surat Selesai Audit maksimal 7 hari kerja setelah Seluruh Tl dinyatakan selesai',
//   ];

//   const domainData = [
//     { nomor: 1, type: 'Dana Dekonsentrasi', persentase: domesticPercentage },
//     { nomor: 2, type: 'Perwakilan Perdagangan', persentase: foreignPercentage },
//   ];

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Audit Table</h1>
//       <AuditTable />

//       <h1 className="text-2xl font-bold mt-8 mb-4">PERSENTASE KOMPONEN</h1>
//       <table className="min-w-full border-collapse border border-gray-400">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border border-gray-400">No</th>
//             <th className="py-2 px-4 border border-gray-400">Komponen</th>
//             <th className="py-2 px-4 border border-gray-400">Persentase</th>
//           </tr>
//         </thead>
//         <tbody>
//           {components.map((component, index) => {
//             const point = [
//               'Surat',
//               'Pelaksanaan',
//               'SDM',
//               'Verifikasi',
//               'IHA',
//               'Bukti TL',
//               'Selesai Audit',
//             ][index];
//             return (
//               <tr key={index}>
//                 <td className="py-2 px-4 border border-gray-400">
//                   {index + 1}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-400">
//                   {component}
//                 </td>
//                 <td className="py-2 px-4 border border-gray-400">
//                   {percentages[point] ? `${percentages[point]}%` : '-'}
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <h1 className="text-2xl font-bold mt-8 mb-4">PERSENTASE DOMAIN</h1>
//       <table className="min-w-full border-collapse border border-gray-400">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border border-gray-400">Nomor</th>
//             <th className="py-2 px-4 border border-gray-400">Domain</th>
//             <th className="py-2 px-4 border border-gray-400">Persentase</th>
//           </tr>
//         </thead>
//         <tbody>
//           {domainData.map((domain, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4 border border-gray-400">
//                 {domain.nomor}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {domain.type}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {domain.persentase ? `${domain.persentase}%` : '-'}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Home;
