'use client'
import React from 'react';
import AuditTable from './AuditTable';


const Home = () => {
  const components = [
    "Surat Pemberitahuan Audit dikirim minimal 10 hari kerja sebelum audit dilaksanakan",
    "Jumlah hari pelaksanaan Audit",
    "Jumlah Sumber Daya Manusia dalam Pelaksanaan Audit",
    "Verifikasi Tindak Lanjut Hasil Audit dilaksanakan maksimal 7 hari kerja",
    "Penyelesaian IHA dan LHA maksimal 10 hari kerja setelah BA Exit",
    "Unit Kerja menyampaikan bukti TL pada Aplikasi SI PINTAR maksimal 40 hari kerja setelah BA Exit",
    "Sekretariat Itjen membuat Surat Selesai Audit maksimal 7 hari kerja setelah Seluruh Tl dinyatakan selesai",
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Audit Table</h1>
      <AuditTable  />
      
      <h1 className="text-2xl font-bold mt-8 mb-4">PERSENTASE KOMPONEN</h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-400">No</th>
            <th className="py-2 px-4 border border-gray-400">Komponen</th>
            <th className="py-2 px-4 border border-gray-400">Persentase</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-400">{component}</td>
              <td className="py-2 px-4 border border-gray-400"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
