import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (doc: { nomor: number; namaDokumen: string; tanggalSurat: string; tanggalPelaksanaan: string; skor: number }) => void;
}

export default function Modal({ isOpen, onClose, onSubmit }: ModalProps) {
  const [nomor, setNomor] = useState<number | undefined>(undefined);
  const [namaDokumen, setNamaDokumen] = useState('');
  const [tanggalSurat, setTanggalSurat] = useState('');
  const [tanggalPelaksanaan, setTanggalPelaksanaan] = useState('');
  const [skor, setSkor] = useState<number | undefined>(undefined);

  const handleSubmit = () => {
    if (nomor !== undefined && namaDokumen && tanggalSurat && tanggalPelaksanaan && skor !== undefined) {
      onSubmit({ nomor, namaDokumen, tanggalSurat, tanggalPelaksanaan, skor });
      onClose();
    } else {
      alert('Please fill in all fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Document</h2>
        <div className="mb-4">
          <label className="block mb-2">Nomor</label>
          <input
            type="number"
            value={nomor}
            onChange={(e) => setNomor(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nama Dokumen</label>
          <input
            type="text"
            value={namaDokumen}
            onChange={(e) => setNamaDokumen(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tanggal Surat</label>
          <input
            type="date"
            value={tanggalSurat}
            onChange={(e) => setTanggalSurat(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tanggal Pelaksanaan</label>
          <input
            type="date"
            value={tanggalPelaksanaan}
            onChange={(e) => setTanggalPelaksanaan(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Skor</label>
          <input
            type="number"
            value={skor}
            onChange={(e) => setSkor(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
