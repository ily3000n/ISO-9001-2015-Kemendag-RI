'use client'
import React, { useState } from 'react';
import { differenceInBusinessDays } from 'date-fns';

interface Dokumen {
  nomor: number;
  namaDokumen: string;
  tanggalSurat: string;
  tanggalPelaksanaan: string;
  skor: number;
}

const Page = () => {
  const [data, setData] = useState<Dokumen[]>([
    { nomor: 1, namaDokumen: 'Dokumen A', tanggalSurat: '', tanggalPelaksanaan: '', skor: 0 },
    { nomor: 2, namaDokumen: 'Dokumen B', tanggalSurat: '', tanggalPelaksanaan: '', skor: 0 },
    // Tambahkan data lainnya di sini
  ]);

  const handleInputChange = (index: number, field: keyof Dokumen, value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: value
    };

    // Menghitung skor berdasarkan tanggal
    const tanggalSurat = newData[index].tanggalSurat;
    const tanggalPelaksanaan = newData[index].tanggalPelaksanaan;
    
    if (tanggalSurat && tanggalPelaksanaan) {
      const diffDays = differenceInBusinessDays(new Date(tanggalPelaksanaan), new Date(tanggalSurat));
      newData[index].skor = diffDays > 10 ? 0 : 1;
    }

    setData(newData);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold my-4">Daftar Dokumen</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nomor</th>
            <th className="py-2 px-4 border-b">Nama Dokumen</th>
            <th className="py-2 px-4 border-b">Tanggal Surat Pemberitahuan</th>
            <th className="py-2 px-4 border-b">Tanggal Pelaksanaan</th>
            <th className="py-2 px-4 border-b">Skor</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.nomor}>
              <td className="py-2 px-4 border-b text-center">{item.nomor}</td>
              <td className="py-2 px-4 border-b">{item.namaDokumen}</td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="date"
                  className="border p-1"
                  value={item.tanggalSurat}
                  onChange={(e) => handleInputChange(index, 'tanggalSurat', e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <input
                  type="date"
                  className="border p-1"
                  value={item.tanggalPelaksanaan}
                  onChange={(e) => handleInputChange(index, 'tanggalPelaksanaan', e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b text-center">{item.skor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
