import React, { useState } from 'react';

interface AuditFormProps {
  onClose: () => void;
}

const AuditForm: React.FC<AuditFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    auditan: '',
    nomorSurat: '',
    stTanggalMulai: '',
    stTanggalSelesai: '',
    tanggalSuratPemberitahuan: '',
    jumlahHariPemberitahuan: '',
    kesesuaianPemberitahuan: false,
    skorPemberitahuan: '',
    jumlahHariAudit: '',
    kesesuaianAudit: false,
    skorAudit: '',
    inspekturHadir: false,
    jumlahOrang: '',
    kesesuaianSDM: false,
    skorSDM: '',
    tanggalTindakLanjut: '',
    tanggalVerifikasi: '',
    kesesuaianTindakLanjut: false,
    skorTindakLanjut: '',
    tanggalBAExit: '',
    tanggalTerbitIHA: '',
    tanggalTerbitLHA: '',
    kesesuaianIHA: false,
    skorIHA: '',
    tanggalSelesaiTL: '',
    tanggalSelesaiAudit: '',
    kesesuaianAuditSelesai: false,
    skorAuditSelesai: '',
    persentaseKesesuaian: '',
    kategori: 'domestik',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement | HTMLSelectElement;

    // Handle specific types
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form data to API and update table
    console.log('Form data submitted:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Auditan</h3>
        <label className="block mb-2">
          Auditan:
          <input
            type="text"
            name="auditan"
            value={formData.auditan}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Nomor Surat Tugas:
          <input
            type="text"
            name="nomorSurat"
            value={formData.nomorSurat}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          ST Tanggal Mulai:
          <input
            type="date"
            name="stTanggalMulai"
            value={formData.stTanggalMulai}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          ST Tanggal Selesai:
          <input
            type="date"
            name="stTanggalSelesai"
            value={formData.stTanggalSelesai}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Surat Pemberitahuan Audit</h3>
        <label className="block mb-2">
          Tanggal Surat Pemberitahuan:
          <input
            type="date"
            name="tanggalSuratPemberitahuan"
            value={formData.tanggalSuratPemberitahuan}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Jumlah Sumber Daya Manusia</h3>
        <label className="block mb-2">
          Inspektur Hadir:
          <input
            type="checkbox"
            name="inspekturHadir"
            checked={formData.inspekturHadir}
            onChange={handleChange}
            className="border rounded p-2"
          />
        </label>
        <label className="block mb-2">
          Jumlah Orang:
          <input
            type="number"
            name="jumlahOrang"
            value={formData.jumlahOrang}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Verifikasi Tindak Lanjut</h3>
        <label className="block mb-2">
          Tanggal Tindak Lanjut:
          <input
            type="date"
            name="tanggalTindakLanjut"
            value={formData.tanggalTindakLanjut}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Tanggal Verifikasi:
          <input
            type="date"
            name="tanggalVerifikasi"
            value={formData.tanggalVerifikasi}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Penyelesaian IHA dan LHA</h3>
        <label className="block mb-2">
          Tanggal BA Exit:
          <input
            type="date"
            name="tanggalBAExit"
            value={formData.tanggalBAExit}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Tanggal Terbit IHA:
          <input
            type="date"
            name="tanggalTerbitIHA"
            value={formData.tanggalTerbitIHA}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Tanggal Terbit LHA:
          <input
            type="date"
            name="tanggalTerbitLHA"
            value={formData.tanggalTerbitLHA}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Penyampaian Bukti TL</h3>
        <label className="block mb-2">
          Tanggal Selesai TL:
          <input
            type="date"
            name="tanggalSelesaiTL"
            value={formData.tanggalSelesaiTL}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
        <label className="block mb-2">
          Tanggal Surat Selesai:
          <input
            type="date"
            name="tanggalSuratSelesai"
            value={formData.tanggalSuratSelesai}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </label>
      </div>

      <button type="submit" className="btn-primary">Submit</button>
      <button type="button" onClick={onClose} className="btn-secondary ml-2">Cancel</button>
    </form>
  );
};

export default AuditForm;
