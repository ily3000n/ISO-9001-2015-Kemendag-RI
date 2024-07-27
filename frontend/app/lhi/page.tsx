'use client';
import React, { useState, useEffect, useRef } from 'react';
import AuditTable from './AuditTable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Home = () => {
  const [domesticPercentages, setDomesticPercentages] = useState<{
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
  const [foreignPercentages, setForeignPercentages] = useState<{
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

  const [percentagesData, setPercentagesData] = useState<{
    domestik: string | null;
    luar_negeri: string | null;
  }>({ domestik: null, luar_negeri: null });

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
            return;
          }
        };

        const points = [
          'Surat',
          'Pelaksanaan',
          'SDM',
          'Verifikasi',
          'IHA',
          'Bukti TL',
          'Selesai Audit',
        ];

        const fetchComponentPercentages = async (
          point: string,
          category: string
        ) => {
          try {
            const response = await fetch(
              `https://iso-server-production.up.railway.app/api/audit/persentase/poin/${point}/kategori/${category}`,
              { headers }
            );
            if (!response.ok) throw new Error(`${point} fetch error`);
            const data = await response.json();
            return data.persentase_kesesuaian.toString();
          } catch (error) {
            console.error(
              `Error fetching percentage for ${point} in category ${category}:`,
              error
            );
            return null;
          }
        };

        const fetchCategoryPercentages = async (category: string) => {
          try {
            const response = await fetch(
              `https://iso-server-production.up.railway.app/api/audit/persentase-kategori/${category}`,
              { headers }
            );
            if (!response.ok) throw new Error(`${category} fetch error`);
            const data = await response.json();
            return data.persentase_kesesuaian.toString();
          } catch (error) {
            console.error(
              `Error fetching percentage for category ${category}:`,
              error
            );
            return null;
          }
        };

        const domesticPercentagesTemp: { [key: string]: string | null } = {};
        const foreignPercentagesTemp: { [key: string]: string | null } = {};

        for (const point of points) {
          domesticPercentagesTemp[point] = await fetchComponentPercentages(
            point,
            'Domestik'
          );
          foreignPercentagesTemp[point] = await fetchComponentPercentages(
            point,
            'Luar Negeri'
          );
        }

        const domestikPercentage = await fetchCategoryPercentages('Domestik');
        const luarNegeriPercentage = await fetchCategoryPercentages(
          'Luar Negeri'
        );

        setDomesticPercentages(domesticPercentagesTemp);
        setForeignPercentages(foreignPercentagesTemp);
        setPercentagesData({
          domestik: domestikPercentage,
          luar_negeri: luarNegeriPercentage,
        });
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
    {
      nomor: 1,
      type: 'Dana Dekonsentrasi',
      persentase: percentagesData.domestik,
    },
    {
      nomor: 2,
      type: 'Perwakilan Perdagangan',
      persentase: percentagesData.luar_negeri,
    },
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
        <AuditTable />
      </div>
      <button
        onClick={downloadPDF}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Download PDF
      </button>

      <h1 className="text-2xl font-bold mt-8 mb-4">
        PERSENTASE KOMPONEN DANA DEKONSENTRASI
      </h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-blue-950 text-white">
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
                  {domesticPercentages[point]
                    ? `${domesticPercentages[point]}%`
                    : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h1 className="text-2xl font-bold mt-8 mb-4">
        PERSENTASE KOMPONEN PERWAKILAN PERDAGANGAN
      </h1>
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-blue-950 text-white">
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
                  {foreignPercentages[point]
                    ? `${foreignPercentages[point]}%`
                    : '-'}
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
          <tr className="bg-blue-950 text-white">
            <th className="py-2 px-4 border border-gray-400">No</th>
            <th className="py-2 px-4 border border-gray-400">Type</th>
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
