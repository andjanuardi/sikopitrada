export default function Dakfisik() {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-1 items-center">
        <label className=" text-base font-bold">
          LAPORAN KENDALI OPTIMALISASI REALISASI DANA TRANSFER DAERAH
        </label>
        <label className=" text-base font-bold">KAB. SIMEULUE TA. 2023</label>
      </div>
      <div className=" overflow-y-auto max-w-[95vw]">
        <table className="table table-xs">
          <thead className="text text-center text-slate-700">
            <tr>
              <th>No.</th>
              <th className="">SKPK</th>
              <th>Bidang</th>
              <th>Pelaksana</th>
              <th>Pagu Transfer</th>
              <th>Nilai Kontrak</th>
              <th>Nilai Kontrak</th>
              <th className=" whitespace-break-spaces">
                penyaluran Tahap I 25%{`>`}Pagu
              </th>
              <th>realisasi Tahap I</th>
              <th className=" whitespace-break-spaces">
                penyaluran Tahap II 40%{`>`}Pagu
              </th>
              <th>realisasi Tahap II</th>
              <th>penyaluran Tahap III</th>
              <th>realisasi Tahap III</th>
              <th>Total Penyaluran</th>
              <th>total realisasi Sp2d BUD</th>
              <th>Sisa Dana RKUD</th>
              <th>Persentase</th>
            </tr>
            <tr className="text-center">
              <th>a</th>
              <th>b</th>
              <th>c</th>
              <th>d</th>
              <th>e</th>
              <th>f</th>
              <th>f</th>
              <th>g=e*25%</th>
              <th>h</th>
              <th>i</th>
              <th>j</th>
              <th>k</th>
              <th>l</th>
              <th>m</th>
              <th>n</th>
              <th>o=m-n</th>
              <th>p</th>
            </tr>
          </thead>
          <tbody className="text">
            <tr>
              <th className="text-center">1</th>
              <td className="text-start">
                Rehabilitasi ruang kelas dengan tingkat kerusakan minimal sedang
                beserta perabotnya
              </td>
              <td className="text-start">
                Rehabilitasi ruang kelas dengan tingkat kerusakan minimal sedang
                beserta perabotnya 07-DAK SD Disdik/SWA-PRIMA/2023 12-06-2023
              </td>
              <td className="text-star">SD (bertahap)</td>
              <td className="text-end">16.487.248</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">31.130.500</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td className="text-end">31.130.500</td>
              <td className="text-end">-</td>
              <td className="text-end">31.130.500</td>
              <td className="text-cen">0,00%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
