export default function Rekapitulasi() {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-1 items-center">
        <label className=" text-base font-bold">
          DAFTAR DANA TRANSFER YANG PELAPORANNYA PADA BPKD KAB. SIMEULUE
        </label>
        <label className=" text-base font-bold">TAHUN ANGGARAN 2023</label>
        <label className=" text-xs font-bold">Pertanggal 18 agustus 2023</label>
      </div>
      <div className=" overflow-y-auto max-w-[95vw]">
        <table className="table table-xs">
          <thead className="text text-center text-slate-700">
            <tr>
              <th>No.</th>
              <th className=" whitespace-break-spaces">SUMBER DANA</th>
              <th className=" whitespace-break-spaces">
                Jenis Dana Bidang Subbidang
              </th>
              <th>PAGU ALOKASI</th>
              <th>SISA DANA TAYL</th>
              <th className=" whitespace-break-spaces">
                PENYALURAN S.D TAHAP INI
              </th>
              <th>JUMLAH TOTAL</th>
              <th className=" whitespace-break-spaces">
                PERSENTASE PENYALURAN
              </th>
              <th className=" whitespace-break-spaces">
                REALISASI SP2D S.D INI
              </th>
              <th className=" whitespace-break-spaces">SISA DANA PADA RKUD</th>
              <th className=" whitespace-break-spaces">PERSENTASE REALISASI</th>
            </tr>
            <tr>
              <th>(1)</th>
              <th>(2)</th>
              <th>(3)</th>
              <th>(3)</th>
              <th>(4)</th>
              <th>(5)</th>
              <th>(6=4+5)</th>
              <th>(7)</th>
              <th>(8)</th>
              <th>(9=6-8)</th>
              <th>(10)</th>
            </tr>
          </thead>
          <tbody className="text">
            <tr>
              <th className="text-center">1</th>
              <td className="text-start">DAK Fisik</td>
              <td className="text-start">
                DAK Fisik Penugasan Kesehatan dan KB Keluarga Berencana
              </td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">16.487.248</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
              <td className="text-center">60%</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
            </tr>
            <tr>
              <th className="text-center">2</th>
              <td className="text-start">DAK Fisik</td>
              <td className="text-start">
                DAK Fisik Penugasan Kesehatan dan KB Keluarga Berencana
              </td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">216.487.248</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">531.130.500</td>
              <td className="text-center">30%</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
            </tr>
          </tbody>
          <thead className="text text-center text-slate-700">
            <tr>
              <th className=" text-center" colSpan={2}>
                Jumlah
              </th>
              <th className="text-end">-</th>
              <th className="text-end">#REF!</th>
              <th className="text-end">61.130.500</th>
              <th className="text-end">#REF!</th>
              <th className="text-end">#REF!</th>
              <th className="text-center">#REF!</th>
              <th className="text-end">#REF!</th>
              <th className="text-end">#REF!</th>
              <th className="text-end">#REF!</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
