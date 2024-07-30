<table className="min-w-full bg-white border-collapse border border-gray-400 mb-1 shadow-lg">
  <thead className="bg-blue-950">
    <tr className="text-white">
      <th
        className="py-2 px-4 border border-gray-400 text-center sticky left-0 bg-blue-950 z-10"
        rowSpan={2}
      >
        No
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center sticky left-16 bg-blue-950 z-10"
        rowSpan={2}
      >
        Auditan
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        Tanggal
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        1. Surat Pemberitahuan Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        2. Jumlah hari pelaksanaan Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        3. Jumlah Sumber Daya Manusia
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        4. Verifikasi Tindak Lanjut
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={4}
      >
        5. Penyelesaian IHA dan LHA
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        6. Penyampaian bukti TL
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        7. Surat Selesai Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        rowSpan={2}
      >
        Persentase Kesesuaian
      </th>
      <th className="py-2 px-4 text-center" rowSpan={2}></th>
    </tr>
    <tr className="text-white">
      <th className="py-2 px-4 border border-gray-400 text-center">
        Mulai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Selesai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Surat
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Hari
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Hari
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Inspektur
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Orang
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Tindak Lanjut
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Verifikasi
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal BA Exit
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Terbit IHA
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Terbit LHA
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Selesai TL
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Selesai Audit
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
    </tr>
  </thead>
  <tbody>
    {data
      .filter((item) => item.kategori === category)
      .map((item, index) => (
        <tr
          key={item.ID}
          className={
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-gray-100'
          }
        >
          <td className="py-2 px-4 border border-gray-400 text-center sticky left-0 bg-white">
            {index + 1}
          </td>
          <td className="py-2 px-4 border border-gray-400 sticky left-16 bg-white">
            {item.auditan}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_mulai)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_selesai)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_surat)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].jumlah_hari_surat}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_surat ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].jumlah_hari_pelaksanaan}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_pelaksanaan ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.inspektur_hadir ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.jumlah_orang}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_sdm ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_tindak_lanjut)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_verifikasi)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_verifikasi ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_ba_exit)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_ter2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        Tanggal
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        1. Surat Pemberitahuan Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        2. Jumlah hari pelaksanaan Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        3. Jumlah Sumber Daya Manusia
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={3}
      >
        4. Verifikasi Tindak Lanjut
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={4}
      >
        5. Penyelesaian IHA dan LHA
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        6. Penyampaian bukti TL
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        colSpan={2}
      >
        7. Surat Selesai Audit
      </th>
      <th
        className="py-2 px-4 border border-gray-400 text-center"
        rowSpan={2}
      >
        Persentase Kesesuaian
      </th>
      <th className="py-2 px-4 text-center" rowSpan={2}></th>
    </tr>
    <tr className="text-white">
      <th className="py-2 px-4 border border-gray-400 text-center">
        Mulai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Selesai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Surat
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Hari
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Hari
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Inspektur
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Jumlah Orang
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Tindak Lanjut
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Verifikasi
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal BA Exit
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Terbit IHA
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Terbit LHA
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Selesai TL
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Tanggal Selesai Audit
      </th>
      <th className="py-2 px-4 border border-gray-400 text-center">
        Sesuai
      </th>
    </tr>
  </thead>
  <tbody>
    {data
      .filter((item) => item.kategori === category)
      .map((item, index) => (
        <tr
          key={item.ID}
          className={
            index % 2 === 0 ? 'bg-gray-50' : 'bg-white hover:bg-gray-100'
          }
        >
          <td className="py-2 px-4 border border-gray-400 text-center sticky left-0 bg-gray-50 z-10">
            {index + 1}
          </td>
          <td className="py-2 px-4 border border-gray-400 sticky left-16 bg-gray-50 z-10">
            {item.auditan}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_mulai)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_selesai)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_surat)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].jumlah_hari_surat}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_surat ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].jumlah_hari_pelaksanaan}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_pelaksanaan ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.inspektur_hadir ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.jumlah_orang}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_sdm ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_tindak_lanjut)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_verifikasi)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_verifikasi ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_ba_exit)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_terbit_iha)}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_terbit_lha)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_iha ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_selesai_tl)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_bukti_tl ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400 text-nowrap">
            {formatDateReadable(item.tanggal_surat_selesai)}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].kesesuaian_selesai_audit ? 'Ya' : 'Tidak'}
          </td>
          <td className="py-2 px-4 border border-gray-400">
            {item.kesesuaian[0].persentase_kesesuaian_dokumen}%
          </td>
          <td className="py-2 px-4 border border-gray-400 bg-blue-950">
            <button
              className="bg-red-500 text-white rounded-lg p-2 hover:bg-red-600"
              onClick={() => handleDelete(item.ID)}
            >
              Hapus
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>
