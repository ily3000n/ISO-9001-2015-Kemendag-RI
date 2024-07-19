'use client'
import React, { useState } from 'react';

interface DataRow {
  nama_auditan: string;
  nomor_surat_tugas: string;
  start_date: string;
  end_date: string;
  reference_date: string;
  value_1: number;
  status_1: string;
  flag_1: string;
  value_2: number;
  value_3: number;
  status_2: string;
  flag_2: string;
  value_4: number;
  value_5: number;
  value_6: number;
  status_3: string;
  flag_3: string;
  value_7: number;
  status_4: string;
  status_5: string;
  status_6: string;
  flag_4: string;
  value_8: number;
  status_7: string;
  status_8: string;
  status_9: string;
  status_10: string;
  flag_5: string;
  value_9: string;
  status_11: string;
  status_12: string;
  status_13: string;
  flag_6: string;
  value_10: number;
  status_14: string;
  status_15: string;
  status_16: string;
  flag_7: string;
  value_11: string;
  percentage_1: string;
  percentage_2: string;
}

const initialData: DataRow[] = [
  // Add initial empty data or pre-filled data if needed
];

const DataTable: React.FC = () => {
  const [data, setData] = useState<DataRow[]>(initialData);

  const handleInputChange = (index: number, field: keyof DataRow, value: string | number) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    setData(newData);
  };

  const addRow = () => {
    setData([...data, {
      nama_auditan: '',
      nomor_surat_tugas: '',
      start_date: '',
      end_date: '',
      reference_date: '',
      value_1: 0,
      status_1: '',
      flag_1: '',
      value_2: 0,
      value_3: 0,
      status_2: '',
      flag_2: '',
      value_4: 0,
      value_5: 0,
      value_6: 0,
      status_3: '',
      flag_3: '',
      value_7: 0,
      status_4: '',
      status_5: '',
      status_6: '',
      flag_4: '',
      value_8: 0,
      status_7: '',
      status_8: '',
      status_9: '',
      status_10: '',
      flag_5: '',
      value_9: '',
      status_11: '',
      status_12: '',
      status_13: '',
      flag_6: '',
      value_10: 0,
      status_14: '',
      status_15: '',
      status_16: '',
      flag_7: '',
      value_11: '',
      percentage_1: '',
      percentage_2: ''
    }]);
  };

  return (
    <div className="overflow-x-auto">
      <button onClick={addRow} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Add Row</button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 border border-black">
          <tr>
            <th className="border border-black px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Auditan</th>
            <th className="border border-blackpx-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nomor Surat Tugas</th>
            <th colSpan={2} className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ST Tanggal</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Surat Pemberitahuan</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Hari</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Hari Audit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran Inspektur</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Orang</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keseuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Tindak Lanjut</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Verifikasi</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal BA Exit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terbit IHA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Terbit LHA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal BA Exit</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Selesai TL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Selesai TL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal Surat Selesai</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validasi Auditor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase Kesesuaian</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Persentase Kesesuaian</th>
          </tr>
          <tr>
            <th colSpan={2} className="px-6 py-3"></th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
            <th colSpan={39} className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.nama_auditan}
                  onChange={(e) => handleInputChange(index, 'nama_auditan', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.nomor_surat_tugas}
                  onChange={(e) => handleInputChange(index, 'nomor_surat_tugas', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="date"
                  value={row.start_date}
                  onChange={(e) => handleInputChange(index, 'start_date', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="date"
                  value={row.end_date}
                  onChange={(e) => handleInputChange(index, 'end_date', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="date"
                  value={row.reference_date}
                  onChange={(e) => handleInputChange(index, 'reference_date', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_1}
                  onChange={(e) => handleInputChange(index, 'value_1', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_1}
                  onChange={(e) => handleInputChange(index, 'status_1', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_1}
                  onChange={(e) => handleInputChange(index, 'flag_1', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_2}
                  onChange={(e) => handleInputChange(index, 'value_2', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_3}
                  onChange={(e) => handleInputChange(index, 'value_3', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_2}
                  onChange={(e) => handleInputChange(index, 'status_2', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_2}
                  onChange={(e) => handleInputChange(index, 'flag_2', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_4}
                  onChange={(e) => handleInputChange(index, 'value_4', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_5}
                  onChange={(e) => handleInputChange(index, 'value_5', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_6}
                  onChange={(e) => handleInputChange(index, 'value_6', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_3}
                  onChange={(e) => handleInputChange(index, 'status_3', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_3}
                  onChange={(e) => handleInputChange(index, 'flag_3', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_7}
                  onChange={(e) => handleInputChange(index, 'value_7', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_4}
                  onChange={(e) => handleInputChange(index, 'status_4', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_5}
                  onChange={(e) => handleInputChange(index, 'status_5', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_6}
                  onChange={(e) => handleInputChange(index, 'status_6', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_4}
                  onChange={(e) => handleInputChange(index, 'flag_4', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_8}
                  onChange={(e) => handleInputChange(index, 'value_8', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_7}
                  onChange={(e) => handleInputChange(index, 'status_7', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_8}
                  onChange={(e) => handleInputChange(index, 'status_8', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_9}
                  onChange={(e) => handleInputChange(index, 'status_9', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_10}
                  onChange={(e) => handleInputChange(index, 'status_10', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_5}
                  onChange={(e) => handleInputChange(index, 'flag_5', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.value_9}
                  onChange={(e) => handleInputChange(index, 'value_9', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_11}
                  onChange={(e) => handleInputChange(index, 'status_11', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_12}
                  onChange={(e) => handleInputChange(index, 'status_12', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_13}
                  onChange={(e) => handleInputChange(index, 'status_13', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_6}
                  onChange={(e) => handleInputChange(index, 'flag_6', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="number"
                  value={row.value_10}
                  onChange={(e) => handleInputChange(index, 'value_10', parseFloat(e.target.value))}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_14}
                  onChange={(e) => handleInputChange(index, 'status_14', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_15}
                  onChange={(e) => handleInputChange(index, 'status_15', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.status_16}
                  onChange={(e) => handleInputChange(index, 'status_16', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.flag_7}
                  onChange={(e) => handleInputChange(index, 'flag_7', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.value_11}
                  onChange={(e) => handleInputChange(index, 'value_11', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.percentage_1}
                  onChange={(e) => handleInputChange(index, 'percentage_1', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="text"
                  value={row.percentage_2}
                  onChange={(e) => handleInputChange(index, 'percentage_2', e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
