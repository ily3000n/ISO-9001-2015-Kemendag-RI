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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// interface data {
//   category: string;
//   auditan: string;
//   nomorSurat: string;
//   stTanggalMulai: string;
//   stTanggalSelesai: string;
//   tanggalSuratPemberitahuan: string;
//   inspektur: string;
//   jumlahOrang: string;
//   tanggalTindakLanjut: string;
//   tanggalVerifikasi: string;
//   kesesuaianVerifikasi: string;
//   skorVerifikasi: string;
//   tanggalBAExit: string;
//   tanggalTerbitIHA: string;
//   tanggalTerbitLHA: string;
//   kesesuaianIHALHA: string;
//   skorIHALHA: string;
//   tanggalSelesaiTL: string;
//   kesesuaianTL: string;
//   skorTL: string;
//   tanggalSelesaiAudit: string;
//   kesesuaianAudit: string;
//   skorAudit: string;
// }

// const AuditTable: React.FC = () => {
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     category: '',
//     auditan: '',
//     nomorSurat: '',
//     stTanggalMulai: '',
//     stTanggalSelesai: '',
//     tanggalSuratPemberitahuan: '',
//     inspektur: '',
//     jumlahOrang: '',
//     tanggalTindakLanjut: '',
//     tanggalVerifikasi: '',
//     tanggalBAExit: '',
//     tanggalTerbitIHA: '',
//     tanggalTerbitLHA: '',
//     tanggalSelesaiTL: '',
//     tanggalSuratSelesai: '',
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     // Replace with your API endpoint
//     const result = await axios.get('/api/endpoint');
//     setData(result.data);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newData = {
//       ...formData,
//       // Add other data from the API or calculations here
//     };
//     setData([...data, newData]);
//     setIsModalOpen(false);
//   };

//   const renderTable = (category) => (
//     <table className="min-w-full bg-white border-collapse border border-gray-400 mb-8">
//       <thead>
//         <tr>
//           <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
//             No
//           </th>
//           <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
//             Auditan
//           </th>
//           <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
//             Nomor Surat
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={2}>
//             ST Tanggal
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={4}>
//             1. Surat Pemberitahuan Audit
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={3}>
//             2. Jumlah hari pelaksanaan Audit
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={4}>
//             3. Jumlah Sumber Daya Manusia
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={4}>
//             4. Verifikasi Tindak Lanjut
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={5}>
//             5. Penyelesaian IHA dan LHA
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={4}>
//             6. Penyampaian bukti TL
//           </th>
//           <th className="py-2 px-4 border border-gray-400" colSpan={4}>
//             7. Surat Selesai Audit
//           </th>
//           <th className="py-2 px-4 border border-gray-400" rowSpan={2}>
//             Persentase Kesesuaian
//           </th>
//         </tr>
//         <tr>
//           <th className="py-2 px-4 border border-gray-400">Mulai</th>
//           <th className="py-2 px-4 border border-gray-400">Selesai</th>
//           <th className="py-2 px-4 border border-gray-400">Tanggal Surat</th>
//           <th className="py-2 px-4 border border-gray-400">Jumlah Hari</th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">Jumlah Hari</th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">Inspektur</th>
//           <th className="py-2 px-4 border border-gray-400">Jumlah Orang</th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Tindak Lanjut
//           </th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Verifikasi
//           </th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Terbit IHA
//           </th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Terbit LHA
//           </th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Selesai TL
//           </th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Selesai TL
//           </th>
//           <th className="py-2 px-4 border border-gray-400">
//             Tanggal Selesai Audit
//           </th>
//           <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
//           <th className="py-2 px-4 border border-gray-400">Skor</th>
//         </tr>
//       </thead>
//       <tbody>
//         {data
//           .filter((item) => item.category === category)
//           .map((item, index) => (
//             <tr key={index}>
//               <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.auditan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.nomorSurat}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.stTanggalMulai}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.stTanggalSelesai}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalSuratPemberitahuan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.jumlahHariPemberitahuan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianPemberitahuan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorPemberitahuan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.jumlahHariPelaksanaan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianPelaksanaan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorPelaksanaan}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.inspektur}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.jumlahOrang}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianOrang}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorOrang}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalTindakLanjut}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalVerifikasi}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianVerifikasi}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorVerifikasi}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalBAExit}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalTerbitIHA}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalTerbitLHA}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianIHALHA}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorIHALHA}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalBAExit}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalSelesaiTL}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianTL}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorTL}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalSelesaiTL}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.tanggalSelesaiAudit}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.kesesuaianAudit}
//               </td>
//               <td className="py-2 px-4 border border-gray-400">
//                 {item.skorAudit}
//               </td>
//             </tr>
//           ))}
//       </tbody>
//     </table>
//   );

//   return (
//     <div>
//       <button
//         onClick={() => setIsModalOpen(true)}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Tambah Data
//       </button>
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-8 rounded w-11/12 max-h-full overflow-y-auto">
//             <h2 className="text-xl font-bold mb-4">Tambah Data Audit</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700">Kategori</label>
//                 <select
//                   name="category"
//                   value={formData.category}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded"
//                 >
//                   <option value="domestik">Domestik</option>
//                   <option value="luar negeri">Luar Negeri</option>
//                 </select>
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">Bagian 1: Auditan</h3>
//                 <label className="block text-gray-700">Auditan</label>
//                 <input
//                   type="text"
//                   name="auditan"
//                   value={formData.auditan}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">Nomor Surat Tugas</label>
//                 <input
//                   type="text"
//                   name="nomorSurat"
//                   value={formData.nomorSurat}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">ST Tanggal Mulai</label>
//                 <input
//                   type="date"
//                   name="stTanggalMulai"
//                   value={formData.stTanggalMulai}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   ST Tanggal Selesai
//                 </label>
//                 <input
//                   type="date"
//                   name="stTanggalSelesai"
//                   value={formData.stTanggalSelesai}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 2: Surat Pemberitahuan Audit
//                 </h3>
//                 <label className="block text-gray-700">
//                   Tanggal Surat Pemberitahuan
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalSuratPemberitahuan"
//                   value={formData.tanggalSuratPemberitahuan}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 3: Jumlah Sumber Daya Manusia
//                 </h3>
//                 <label className="block text-gray-700">
//                   Inspektur (Hadir/Tidak Hadir)
//                 </label>
//                 <input
//                   type="text"
//                   name="inspektur"
//                   value={formData.inspektur}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">Jumlah Orang</label>
//                 <input
//                   type="number"
//                   name="jumlahOrang"
//                   value={formData.jumlahOrang}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 4: Verifikasi Tindak Lanjut
//                 </h3>
//                 <label className="block text-gray-700">
//                   Tanggal Tindak Lanjut
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalTindakLanjut"
//                   value={formData.tanggalTindakLanjut}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   Tanggal Verifikasi
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalVerifikasi"
//                   value={formData.tanggalVerifikasi}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 5: Penyelesaian IHA dan LHA
//                 </h3>
//                 <label className="block text-gray-700">Tanggal BA Exit</label>
//                 <input
//                   type="date"
//                   name="tanggalBAExit"
//                   value={formData.tanggalBAExit}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   Tanggal Terbit IHA
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalTerbitIHA"
//                   value={formData.tanggalTerbitIHA}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   Tanggal Terbit LHA
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalTerbitLHA"
//                   value={formData.tanggalTerbitLHA}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 6: Penyampaian Bukti TL
//                 </h3>
//                 <label className="block text-gray-700">Tanggal BA Exit</label>
//                 <input
//                   type="date"
//                   name="tanggalBAExit"
//                   value={formData.tanggalBAExit}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   Tanggal Selesai TL
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalSelesaiTL"
//                   value={formData.tanggalSelesaiTL}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <div className="mb-4">
//                 <h3 className="text-lg font-bold mb-2">
//                   Bagian 7: Surat Selesai Audit
//                 </h3>
//                 <label className="block text-gray-700">
//                   Tanggal Selesai TL
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalSelesaiTL"
//                   value={formData.tanggalSelesaiTL}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//                 <label className="block text-gray-700">
//                   Tanggal Surat Selesai
//                 </label>
//                 <input
//                   type="date"
//                   name="tanggalSuratSelesai"
//                   value={formData.tanggalSuratSelesai}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-400 p-2 rounded mb-2"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-green-500 text-white rounded"
//               >
//                 Tambah
//               </button>
//             </form>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded"
//             >
//               Tutup
//             </button>
//           </div>
//         </div>
//       )}
//       <h2 className="text-2xl font-bold mb-4">Tabel Audit Domestik</h2>
//       {renderTable('domestik')}
//       <h2 className="text-2xl font-bold mb-4">Tabel Audit Luar Negeri</h2>
//       {renderTable('luar negeri')}
//     </div>
//   );
// };

// export default AuditTable;
