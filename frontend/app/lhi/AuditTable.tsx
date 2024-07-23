import React from 'react';

interface AuditData {
  nomor: number;
  auditan:string;
  nomorSurat: string;
  stTanggalMulai: string;
  stTanggalSelesai: string;
  tanggalSuratPemberitahuan: string;
  jumlahHariPemberitahuan: number;
  kesesuaianPemberitahuan: boolean;
  skorPemberitahuan: number;
  jumlahHariAudit: number;
  kesesuaianAudit: boolean;
  skorAudit: number;
  inspekturHadir: boolean;
  jumlahOrang: number;
  kesesuaianSDM: boolean;
  skorSDM: number;
  tanggalTindakLanjut: string;
  tanggalVerifikasi: string;
  kesesuaianTindakLanjut: boolean;
  skorTindakLanjut: number;
  tanggalBAExit: string;
  tanggalTerbitIHA: string;
  tanggalTerbitLHA: string;
  kesesuaianIHA: boolean;
  skorIHA: number;
  tanggalSelesaiTL: string;
  tanggalSelesaiAudit: string;
  kesesuaianAuditSelesai: boolean;
  skorAuditSelesai: number;
  persentaseKesesuaian: number;
  kategori: string;
}

const AuditTable: React.FC<{ data: AuditData[] }> = ({ data }) => {
  const domestikData = data.filter(item => item.kategori === 'domestik');
  const luarNegeriData = data.filter(item => item.kategori === 'luar negeri');

  const renderTable = (data: AuditData[]) => (
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
        {data.map((item, index) => (
          <tr key={index}>
            <td className="py-2 px-4 border border-gray-400">{item.nomor}</td>
            <td className="py-2 px-4 border border-gray-400">{item.auditan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.nomorSurat}</td>
            <td className="py-2 px-4 border border-gray-400">{item.stTanggalMulai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.stTanggalSelesai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSuratPemberitahuan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.jumlahHariPemberitahuan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianPemberitahuan ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorPemberitahuan}</td>
            <td className="py-2 px-4 border border-gray-400">{item.jumlahHariAudit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianAudit ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorAudit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.inspekturHadir ? 'Hadir' : 'Tidak Hadir'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.jumlahOrang}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianSDM ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorSDM}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTindakLanjut}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalVerifikasi}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianTindakLanjut ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorTindakLanjut}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalBAExit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTerbitIHA}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalTerbitLHA}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianIHA ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorIHA}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalBAExit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSelesaiTL}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianAuditSelesai ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorAuditSelesai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSelesaiTL}</td>
            <td className="py-2 px-4 border border-gray-400">{item.tanggalSelesaiAudit}</td>
            <td className="py-2 px-4 border border-gray-400">{item.kesesuaianAuditSelesai ? 'Ya' : 'Tidak'}</td>
            <td className="py-2 px-4 border border-gray-400">{item.skorAuditSelesai}</td>
            <td className="py-2 px-4 border border-gray-400">{item.persentaseKesesuaian}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Domestik</h2>
      {renderTable(domestikData)}
      <h2 className="text-xl font-bold mb-4">Luar Negeri</h2>
      {renderTable(luarNegeriData)}
      
    </div>
  );
};

export default AuditTable;