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

const AuditTable: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    auditan: '',
    kategori: '',
    no_surat_tugas: '',
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
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/audit/audit-with-kesesuaian`,
        formData,
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

  const renderTable = (category: string) => (
    <table className="min-w-full bg-white border-collapse border border-gray-400 mb-8">
      <thead>
        <tr>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
            No
          </th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
            Auditan
          </th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
            Nomor Surat Tugas
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={2}>
            Tanggal
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>
            1. Surat Pemberitahuan Audit
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={3}>
            2. Jumlah hari pelaksanaan Audit
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>
            3. Jumlah Sumber Daya Manusia
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>
            4. Verifikasi Tindak Lanjut
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={5}>
            5. Penyelesaian IHA dan LHA
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>
            6. Penyampaian bukti TL
          </th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>
            7. Surat Selesai Audit
          </th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
            Persentase Kesesuaian
          </th>
        </tr>
        <tr>
          <th className="py-2 px-4 border border-gray-400">Mulai</th>
          <th className="py-2 px-4 border border-gray-400">Selesai</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Surat</th>
          <th className="py-2 px-4 border border-gray-400">Jumlah Hari</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Jumlah Hari</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Inspektur</th>
          <th className="py-2 px-4 border border-gray-400">Jumlah Orang</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Tindak Lanjut
          </th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Verifikasi
          </th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Terbit IHA
          </th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Terbit LHA
          </th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Selesai TL
          </th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">
            Tanggal Selesai Audit
          </th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter((d) => d.kategori === category)
          .map((row, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
              <td className="py-2 px-4 border border-gray-400">
                {row.auditan}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.no_surat_tugas}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_mulai).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_selesai).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_surat).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].jumlah_hari_surat}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_surat ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_surat}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].jumlah_hari_pelaksanaan}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_pelaksanaan ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_pelaksanaan}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.inspektur_hadir ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.jumlah_orang}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_sdm ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_sdm}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_tindak_lanjut).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_verifikasi).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_verifikasi ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_verifikasi}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_ba_exit).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_terbit_iha).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_terbit_lha).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_iha ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_iha}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_selesai_tl).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_bukti_tl ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_bukti_tl}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {new Date(row.tanggal_surat_selesai).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].kesesuaian_selesai_audit ? 'Ya' : 'Tidak'}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].skor_selesai_audit}
              </td>
              <td className="py-2 px-4 border border-gray-400">
                {row.kesesuaian[0].persentase_kesesuaian_dokumen}%
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Tambah Audit
      </button>

      {renderTable('Domestik')}
      {renderTable('Luar Negeri')}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-md">
            <form onSubmit={handleSubmit}>
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
                <label className="block text-gray-700">
                  Nomor Surat Tugas:
                </label>
                <input
                  type="text"
                  name="no_surat_tugas"
                  value={formData.no_surat_tugas}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 w-full"
                />
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
                <label className="block text-gray-700">Tanggal Selesai:</label>
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
                <label className="block text-gray-700">Inspektur Hadir:</label>
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
                  className="border border-gray-300 p-2 w-full"
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
                <label className="block text-gray-700">Tanggal BA Exit:</label>
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

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
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

