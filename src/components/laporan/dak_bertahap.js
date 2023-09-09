export default function DakBertahap() {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-1">
        <label className=" text-base font-bold">
          DAFTAR KONTRAK KEGIATAN BERTAHAP
        </label>
        <label className=" text-sm font-bold">
          DAK PENUGASAN BIDANG PENDIDIKAN
        </label>
        <label className=" text-xs font-bold">SUB BIDANG SMP</label>
        <label className=" text-xs pt-3">
          Lokasi Cetak : Simeulue KPPN : 003 Pemda : 0609 Jenis Dana : DAK Fisik
          Penugasan Bidang : C02 Sub Bidang : C02008 Penyaluran : 1 Status :
          Disetujui Pemda
        </label>
      </div>
      <div className=" overflow-y-auto max-w-[95vw] ">
        <table className="table table-xs">
          <thead className="text text-center">
            <tr>
              <th rowSpan={2}>No.</th>
              <th rowSpan={2} className=" whitespace-break-spaces">
                Jenis Dana Bidang Subbidang
              </th>
              <th rowSpan={2}>Rincian Kegiatan</th>
              <th rowSpan={2} className=" whitespace-break-spaces">
                Judul Nomor Tanggal Dokumen
              </th>
              <th rowSpan={2}>Nilai Kontrak DAK</th>
              <th rowSpan={2}>Pelaksana Kegiatan</th>
              <th colSpan={3}>Penyaluran</th>
              <th rowSpan={2}>Realisasi SP2D</th>
              <th rowSpan={2}>No SP2D</th>
              <th rowSpan={2} className=" w-39 ">
                Keterangan
              </th>
            </tr>
            <tr>
              <th>Tahap I (25%)</th>
              <th>Tahap II (45%)</th>
              <th>Tahap III (%)</th>
            </tr>
          </thead>
          <tbody className="text text-center">
            <tr>
              <th>1</th>
              <td>DAK Fisik Penugasan Pendidikan SMP</td>
              <td>
                Rehabilitasi ruang kelas dengan tingkat kerusakan minimal sedang
                beserta perabotnya
              </td>
              <td>
                Rehabilitasi ruang kelas dengan tingkat kerusakan minimal sedang
                beserta perabotnya 49-DAK SMP Disdik/SWA-BB/2023 15-06-2023
              </td>
              <td>1.014.728.064</td>
              <td>BAKUDO BATU</td>
              <td>2.166.218.250</td>
              <td>2.166.218.250</td>
              <td>2.166.218.250</td>
              <td>2.166.218.250</td>
              <td>04108/SP2D/2023</td>
              <td>Sedang Dibuat Untuk itu aja ya, Nantik Baru Dikasih tau</td>
            </tr>
          </tbody>
          <thead className="text text-center">
            <tr>
              <th colSpan={4}>Jumlah</th>
              <th>9.044.522.000</th>
              <th></th>
              <th>2.261.130.500</th>
              <th>-</th>
              <th>-</th>
              <th>2.273.369.000</th>
              <th></th>
              <th></th>
            </tr>
            <tr>
              <th colSpan={5}>Jumlah</th>
              <th>9.044.522.000</th>
              <th></th>
              <th>2.261.130.500</th>
              <th>-</th>
              <th>-</th>
              <th>2.273.369.000</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
