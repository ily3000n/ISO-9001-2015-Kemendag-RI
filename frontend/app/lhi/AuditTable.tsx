import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
  tanggal_terbit_iha: string;
  tanggal_terbit_lha: string;
  tanggal_selesai_tl: string;
  tanggal_surat_selesai: string;
  kesesuaian: Kesesuaian[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString(); // Mengonversi ke format 2006-01-02T15:04:05Z07:00
};

const formatDateReadable = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
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
    tanggal_terbit_iha: '',
    tanggal_terbit_lha: '',
    tanggal_selesai_tl: '',
    tanggal_surat_selesai: '',
  });

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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');

    // Konversi format tanggal
    const formattedData = {
      ...formData,
      tanggal_mulai: formatDate(formData.tanggal_mulai),
      tanggal_selesai: formatDate(formData.tanggal_selesai),
      tanggal_surat: formatDate(formData.tanggal_surat),
      tanggal_tindak_lanjut: formatDate(formData.tanggal_tindak_lanjut),
      tanggal_verifikasi: formatDate(formData.tanggal_verifikasi),
      tanggal_ba_exit: formatDate(formData.tanggal_ba_exit),
      tanggal_terbit_iha: formatDate(formData.tanggal_terbit_iha),
      tanggal_terbit_lha: formatDate(formData.tanggal_terbit_lha),
      tanggal_selesai_tl: formatDate(formData.tanggal_selesai_tl),
      tanggal_surat_selesai: formatDate(formData.tanggal_surat_selesai),
      jumlah_orang: parseInt(formData.jumlah_orang as any, 10),
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
        console.log('Delete successful');
        setData(data.filter((item) => item.ID !== id));
      }
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };
  const renderTable = (category: string) => (
    
      <table className="min-w-full bg-white border-collapse border border-gray-400 mb-8 shadow-lg">
        <thead className="bg-blue-950">
          <tr className='text-white'>
            <th className="py-2 px-4 border border-gray-400 text-center" rowSpan={2}>
              No
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" rowSpan={2}>
              Auditan
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={2}>
              Tanggal
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={3}>
              1. Surat Pemberitahuan Audit
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={2}>
              2. Jumlah hari pelaksanaan Audit
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={3}>
              3. Jumlah Sumber Daya Manusia
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={3}>
              4. Verifikasi Tindak Lanjut
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={4}>
              5. Penyelesaian IHA dan LHA
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={2}>
              6. Penyampaian bukti TL
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" colSpan={2}>
              7. Surat Selesai Audit
            </th>
            <th className="py-2 px-4 border border-gray-400 text-center" rowSpan={2}>
              Persentase Kesesuaian
            </th>
            <th className="py-2 px-4 text-center" rowSpan={2}>
             
            </th>
          </tr>
          <tr className='text-white'>
            <th className="py-2 px-4 border border-gray-400 text-center">Mulai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Selesai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Surat</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Jumlah Hari</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Jumlah Hari</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Inspektur</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Jumlah Orang</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Tindak Lanjut</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Verifikasi</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal BA Exit</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Terbit IHA</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Terbit LHA</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Selesai TL</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Tanggal Selesai Audit</th>
            <th className="py-2 px-4 border border-gray-400 text-center">Sesuai</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) => item.kategori === category)
            .map((item, index) => (
              <tr key={item.ID} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-gray-100'}>
                <td className="py-2 px-4 border border-gray-400 text-center">{index + 1}</td>
                <td className="py-2 px-4 border border-gray-400">{item.auditan}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_mulai)}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_selesai)}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_surat)}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].jumlah_hari_surat}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_surat ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].jumlah_hari_pelaksanaan}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_pelaksanaan ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400">{item.inspektur_hadir ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400">{item.jumlah_orang}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_sdm ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_tindak_lanjut)}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_verifikasi)}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_verifikasi ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_ba_exit)}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_terbit_iha)}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_terbit_lha)}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_iha ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_selesai_tl)}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_bukti_tl ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400 text-nowrap">{formatDateReadable(item.tanggal_surat_selesai)}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].kesesuaian_selesai_audit ? 'Ya' : 'Tidak'}</td>
                <td className="py-2 px-4 border border-gray-400">{item.kesesuaian[0].persentase_kesesuaian_dokumen}%</td>
                <td className="py-2 px-4 border border-gray-400 bg-blue-950">
                  <button className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600" onClick={() => handleDelete(item.ID)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
    
 
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Data Audit</h1>
      <button
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Tambah Data
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-4">Dana Dekonsentrasi</h2>
      {renderTable('Domestik')}

      <h2 className="text-xl font-semibold mt-8 mb-4">
        Perwakilan Perdagangan
      </h2>
      {renderTable('Luar Negeri')}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700">Auditan:</label>
                  <input
                    type="text"
                    name="auditan"
                    value={formData.auditan}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Kategori:</label>
                  <select
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Domestik">Domestik</option>
                    <option value="Luar Negeri">Luar Negeri</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">Tanggal Mulai:</label>
                  <input
                    type="date"
                    name="tanggal_mulai"
                    value={formData.tanggal_mulai}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Selesai:
                  </label>
                  <input
                    type="date"
                    name="tanggal_selesai"
                    value={formData.tanggal_selesai}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Jumlah Orang:</label>
                  <input
                    type="number"
                    name="jumlah_orang"
                    value={formData.jumlah_orang}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Inspektur Hadir:
                  </label>
                  <input
                    type="checkbox"
                    name="inspektur_hadir"
                    checked={formData.inspektur_hadir}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        inspektur_hadir: e.target.checked,
                      })
                    }
                    className="border border-gray-300 p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Tanggal Surat:</label>
                  <input
                    type="date"
                    name="tanggal_surat"
                    value={formData.tanggal_surat}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Tindak Lanjut:
                  </label>
                  <input
                    type="date"
                    name="tanggal_tindak_lanjut"
                    value={formData.tanggal_tindak_lanjut}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Verifikasi:
                  </label>
                  <input
                    type="date"
                    name="tanggal_verifikasi"
                    value={formData.tanggal_verifikasi}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal BA Exit:
                  </label>
                  <input
                    type="date"
                    name="tanggal_ba_exit"
                    value={formData.tanggal_ba_exit}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Terbit IHA:
                  </label>
                  <input
                    type="date"
                    name="tanggal_terbit_iha"
                    value={formData.tanggal_terbit_iha}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Terbit LHA:
                  </label>
                  <input
                    type="date"
                    name="tanggal_terbit_lha"
                    value={formData.tanggal_terbit_lha}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Selesai TL:
                  </label>
                  <input
                    type="date"
                    name="tanggal_selesai_tl"
                    value={formData.tanggal_selesai_tl}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Tanggal Surat Selesai:
                  </label>
                  <input
                    type="date"
                    name="tanggal_surat_selesai"
                    value={formData.tanggal_surat_selesai}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-2 w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-4 bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuditTable;
