// types.ts
export interface AuditData {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    auditan: string;
    kategori: string;
    no_surat_tugas: string;
    tanggal_mulai: string;
    tanggal_selesai: string;
    tanggal_surat: string;
    tanggal_ba_exit: string;
    tanggal_terbit_iha: string;
    tanggal_terbit_lha: string;
    tanggal_selesai_tl: string;
    tanggal_surat_selesai: string;
    tanggal_tindak_lanjut: string;
    tanggal_verifikasi: string;
    inspektur_hadir: boolean;
    jumlah_orang: number;
  }
  