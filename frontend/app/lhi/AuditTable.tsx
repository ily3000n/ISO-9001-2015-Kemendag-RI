import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface AuditData {
  category: string;
  auditan: string;
  nomorSurat: string;
  stTanggalMulai: string;
  stTanggalSelesai: string;
  tanggalSuratPemberitahuan: string;
  inspektur: string;
  jumlahOrang: string;
  tanggalTindakLanjut: string;
  tanggalVerifikasi: string;
  kesesuaianVerifikasi: string;
  skorVerifikasi: string;
  tanggalBAExit: string;
  tanggalTerbitIHA: string;
  tanggalTerbitLHA: string;
  kesesuaianIHALHA: string;
  skorIHALHA: string;
  tanggalSelesaiTL: string;
  kesesuaianTL: string;
  skorTL: string;
  tanggalSelesaiAudit: string;
  kesesuaianAudit: string;
  skorAudit: string;
}

const AuditTable: React.FC = () => {
  const [data, setData] = useState<AuditData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<AuditData>>({
    category: '',
    auditan: '',
    nomorSurat: '',
    stTanggalMulai: '',
    stTanggalSelesai: '',
    tanggalSuratPemberitahuan: '',
    inspektur: '',
    jumlahOrang: '',
    tanggalTindakLanjut: '',
    tanggalVerifikasi: '',
    tanggalBAExit: '',
    tanggalTerbitIHA: '',
    tanggalTerbitLHA: '',
    tanggalSelesaiTL: '',
    tanggalSelesaiAudit: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Replace with your API endpoint
    const result = await axios.get<AuditData[]>('/api/endpoint');
    setData(result.data);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = {
      ...formData,
    } as AuditData;
    setData([...data, newData]);
    setIsModalOpen(false);
  };

  const renderTable = (category: string) => (
    <table className="min-w-full bg-white border-collapse border border-gray-400 mb-8">
      <thead>
        <tr>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>No</th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>Auditan</th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>Nomor Surat</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={2}>ST Tanggal</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>1. Surat Pemberitahuan Audit</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={3}>2. Jumlah hari pelaksanaan Audit</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>3. Jumlah Sumber Daya Manusia</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>4. Verifikasi Tindak Lanjut</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={5}>5. Penyelesaian IHA dan LHA</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>6. Penyampaian bukti TL</th>
          <th className="py-2 px-4 border border-gray-400" colSpan={4}>7. Surat Selesai Audit</th>
          <th className="py-2 px-4 border border-gray-400" rowSpan={2}>Persentase Kesesuaian</th>
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
          <th className="py-2 px-4 border border-gray-400">Tanggal Tindak Lanjut</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Verifikasi</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Terbit IHA</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Terbit LHA</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal BA Exit</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Selesai TL</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Selesai TL</th>
          <th className="py-2 px-4 border border-gray-400">Tanggal Selesai Audit</th>
          <th className="py-2 px-4 border border-gray-400">Kesesuaian</th>
          <th className="py-2 px-4 border border-gray-400">Skor</th>
        </tr>
      </thead>
      <tbody>
        {data.filter(item => item.category === category).map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border border-gray-400">{index + 1}</td>
            <td className="py-2 px-4 border border-gray-400">{item.auditan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.nomorSurat}</td>
            <td className="py-2 px-4 border border-gray-400">{item.stTanggalMulai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.stTanggalSelesai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSuratPemberitahuan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.inspektur}</td>
            <td className="py-2 px-4 border border-gray-400">{item.jumlahOrang}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTindakLanjut}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalVerifikasi}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalBAExit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTerbitIHA}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTerbitLHA}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSelesaiTL}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSelesaiAudit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto">
      <button
        className="bg-blue-500 text-white p-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Tambah Data
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="border border-gray-400 rounded p-2 w-full"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Domestic">Domestic</option>
                  <option value="International">International</option>
                </select>
              </div>
              {/* Add other form fields similarly */}
              <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Simpan
              </button>
            </form>
          </div>
        </div>
      )}
      <div>
        <h2 className="text-xl font-bold mb-4">Domestic</h2>
        {renderTable('Domestic')}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">International</h2>
        {renderTable('International')}
      </div>
    </div>
  );
};

export default AuditTable;
