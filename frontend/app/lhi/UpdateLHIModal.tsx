import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillPlusSquareFill } from "react-icons/bs";

interface Kesesuaian {
  ID: number;
  jumlah_hari_surat: number;
  kesesuaian_surat: boolean;
  skor_surat: number;
  jumlah_hari_pelaksanaan: number;
  kesesuaian_pelaksanaan: boolean;
  skor_pelaksanaan: number;
  kesesuaian_sdm: boolean;
  skor_sdm: number;
  jumlah_hari_verifikasi: number;
  kesesuaian_verifikasi: boolean;
  skor_verifikasi: number;
  kesesuaian_iha: boolean;
  skor_iha: number;
  kesesuaian_bukti_tl: boolean;
  skor_bukti_tl: number;
  kesesuaian_selesai_audit: boolean;
  skor_selesai_audit: number;
  persentase_kesesuaian_dokumen: number;
}

interface Data {
  ID: number;
  auditan: string;
  kategori: string;
  no_surat_tugas: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  jumlah_orang: number;
  inspektur_hadir: boolean;
  tanggal_surat: string;
  tanggal_tindak_lanjut: string;
  tanggal_verifikasi: string;
  tanggal_ba_exit: string;
  tanggal_terbit_iha_lha: string;
  tanggal_selesai_tl: string;
  tanggal_surat_selesai: string;
  kesesuaian: Kesesuaian[];
  hari_libur_surat: number;
  hari_libur_verifikasi: number;
  hari_libur_iha: number;
  hari_libur_bukti_tl: number;
  hari_libur_selesai: number;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString();
};

const formatDateReadable = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AuditTable: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    auditan: '',
    kategori: '',
    no_surat_tugas: '12345',
    tanggal_mulai: '',
    tanggal_selesai: '',
    jumlah_orang: 0,
    inspektur_hadir: false,
    tanggal_surat: '',
    tanggal_tindak_lanjut: '',
    tanggal_verifikasi: '',
    tanggal_ba_exit: '',
    tanggal_terbit_iha_lha: '',
    tanggal_selesai_tl: '',
    tanggal_surat_selesai: '',
    hari_libur_surat: 0,
    hari_libur_verifikasi: 0,
    hari_libur_iha: 0,
    hari_libur_bukti_tl: 0,
    hari_libur_selesai: 0,
  });
  
  // State for editing
  const [editItem, setEditItem] = useState<Data | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audits`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      setData(result.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
  
    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    
    const formattedData = {
      ...formData,
      tanggal_mulai: formatDate(formData.tanggal_mulai),
      tanggal_selesai: formatDate(formData.tanggal_selesai),
      tanggal_surat: formatDate(formData.tanggal_surat),
      tanggal_tindak_lanjut: formatDate(formData.tanggal_tindak_lanjut),
      tanggal_verifikasi: formatDate(formData.tanggal_verifikasi),
      tanggal_ba_exit: formatDate(formData.tanggal_ba_exit),
      tanggal_terbit_iha_lha: formatDate(formData.tanggal_terbit_iha_lha),
      tanggal_selesai_tl: formatDate(formData.tanggal_selesai_tl),
      tanggal_surat_selesai: formatDate(formData.tanggal_surat_selesai),
      jumlah_orang: parseInt(formData.jumlah_orang as any, 10),
      hari_libur_surat: parseInt(formData.hari_libur_surat as any, 10),
      hari_libur_verifikasi: parseInt(formData.hari_libur_verifikasi as any, 10),
      hari_libur_iha: parseInt(formData.hari_libur_iha as any, 10),
      hari_libur_bukti_tl: parseInt(formData.hari_libur_bukti_tl as any, 10),
      hari_libur_selesai: parseInt(formData.hari_libur_selesai as any, 10),
    };

    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit/audit-with-kesesuaian`,
        formattedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setData([...data, result.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error submitting data', error);
    }
  };

  const handleDelete = async (id: number) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (response.status === 200) {
        setData(data.filter((item) => item.ID !== id));
      }
    } catch (error) {
      console.error('Error deleting data', error);
    }
    window.location.reload();
  };

  const openEditModal = (item: Data) => {
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    
    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setEditItem(prev => prev ? { ...prev, [name]: checked } : null);
    } else {
      setEditItem(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editItem) return;

    const token = sessionStorage.getItem('token');
    
    const formattedData = {
      ...editItem,
      tanggal_mulai: formatDate(editItem.tanggal_mulai),
      tanggal_selesai: formatDate(editItem.tanggal_selesai),
      tanggal_surat: formatDate(editItem.tanggal_surat),
      tanggal_tindak_lanjut: formatDate(editItem.tanggal_tindak_lanjut),
      tanggal_verifikasi: formatDate(editItem.tanggal_verifikasi),
      tanggal_ba_exit: formatDate(editItem.tanggal_ba_exit),
      tanggal_terbit_iha_lha: formatDate(editItem.tanggal_terbit_iha_lha),
      tanggal_selesai_tl: formatDate(editItem.tanggal_selesai_tl),
      tanggal_surat_selesai: formatDate(editItem.tanggal_surat_selesai),
      jumlah_orang: parseInt(editItem.jumlah_orang as any, 10),
      hari_libur_surat: parseInt(editItem.hari_libur_surat as any, 10),
      hari_libur_verifikasi: parseInt(editItem.hari_libur_verifikasi as any, 10),
      hari_libur_iha: parseInt(editItem.hari_libur_iha as any, 10),
      hari_libur_bukti_tl: parseInt(editItem.hari_libur_bukti_tl as any, 10),
      hari_libur_selesai: parseInt(editItem.hari_libur_selesai as any, 10),
    };

    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit/${editItem.ID}`,
        formattedData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setData(data.map(item => item.ID === editItem.ID ? result.data : item));
      closeEditModal();
    } catch (error) {
      console.error('Error updating data', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <button
        className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        <BsFillPlusSquareFill className="inline-block mr-2" />
        Tambah Data
      </button>
      
      <table className="min-w-full bg-white border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-blue-950 text-white">
            <th className="py-2 px-4 border border-gray-400">Auditan</th>
            <th className="py-2 px-4 border border-gray-400">Kategori</th>
            <th className="py-2 px-4 border border-gray-400">No Surat Tugas</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Mulai</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Selesai</th>
            <th className="py-2 px-4 border border-gray-400">Jumlah Orang</th>
            <th className="py-2 px-4 border border-gray-400">Inspektur Hadir</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Surat</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Tindak Lanjut</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Verifikasi</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Terbit IHA/LHA</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Selesai TL</th>
            <th className="py-2 px-4 border border-gray-400">Tanggal Surat Selesai</th>
            <th className="py-2 px-4 border border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID} className="bg-gray-100 border-b border-gray-300">
              <td className="py-2 px-4 border border-gray-400">{item.auditan}</td>
              <td className="py-2 px-4 border border-gray-400">{item.kategori}</td>
              <td className="py-2 px-4 border border-gray-400">{item.no_surat_tugas}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_mulai)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_selesai)}</td>
              <td className="py-2 px-4 border border-gray-400">{item.jumlah_orang}</td>
              <td className="py-2 px-4 border border-gray-400">{item.inspektur_hadir ? 'Yes' : 'No'}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_surat)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_tindak_lanjut)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_verifikasi)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_ba_exit)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_terbit_iha_lha)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_selesai_tl)}</td>
              <td className="py-2 px-4 border border-gray-400">{formatDateReadable(item.tanggal_surat_selesai)}</td>
              <td className="py-2 px-4 border border-gray-400">
                <button
                  className="bg-sky-500 text-white rounded-lg p-2 hover:bg-sky-600"
                  onClick={() => openEditModal(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600 ml-2"
                  onClick={() => handleDelete(item.ID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Data Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Tambah Data</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">
                Auditan:
                <input
                  type="text"
                  name="auditan"
                  value={formData.auditan}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Kategori:
                <input
                  type="text"
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              {/* Repeat for other fields */}
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Audit</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2">
                Auditan:
                <input
                  type="text"
                  name="auditan"
                  value={editItem.auditan}
                  onChange={handleEditInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Kategori:
                <input
                  type="text"
                  name="kategori"
                  value={editItem.kategori}
                  onChange={handleEditInputChange}
                  className="border border-gray-300 rounded p-2 w-full"
                />
              </label>
              {/* Repeat for other fields */}
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-gray-500 text-white rounded-lg p-2 hover:bg-gray-600 ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTable;
