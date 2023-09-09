export default function Daknf() {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-1 text-center">
        <label className=" text-base font-bold">
          KONTROL DANA ALOKASI KHUSUS NON FISIK KABUPATEN SIMEULUE YANG
          PELAPORANNYA MELALUI
        </label>
        <label className=" text-sm font-bold">
          BADAN PENGELOLAAN KEUANGAN DAERAH KABUPATEN SIMEULUE TAHUN ANGGARAN
          2O23.
        </label>
      </div>
      <div className=" overflow-y-auto max-w-[95vw] ">
        <table className="table table-xs">
          <thead className="text text-center  text-slate-700">
            <tr>
              <th rowSpan={2}>No.</th>
              <th rowSpan={2}>SKPK PENGOLALA</th>
              <th rowSpan={2}>SUB KEGIATAN </th>
              <th rowSpan={2}>PAGU</th>
              <th colSpan={2}>TRANSFER</th>
              <th rowSpan={2}>SILPA TAYL</th>
              <th rowSpan={2}>JUMLAH</th>
              <th colSpan={1}>REALISASI P2D BUD</th>
              <th colSpan={1}></th>
              <th colSpan={1}>JUMLAH</th>
              <th className=" whitespace-break-spaces" rowSpan={2}>
                SISA DANA PADA RKUD
              </th>
              <th className=" whitespace-break-spaces" rowSpan={2}>
                PERSENTASE REALISASI BUD
              </th>
              <th className=" whitespace-break-spaces" rowSpan={2}>
                STATUS DOKUMEN{" "}
              </th>
            </tr>
            <tr>
              <th className=" whitespace-break-spaces">TAHAP I 50 % - SILPA</th>
              <th className=" whitespace-break-spaces">TAHAP II 50 %</th>
              <th>TAHAP I</th>
              <th>TAHAP II</th>
              <th></th>
            </tr>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
              <th>6</th>
              <th>7</th>
              <th>8=5+7</th>
              <th>9</th>
              <th>10</th>
              <th>11 = 9 + 10</th>
              <th></th>
              <th>12 = 9/5*100%</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center">1</th>
              <td className="text-start">Dinas Pendidikan</td>
              <td className="text-start">TPG</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-center">80,00%</td>
              <td></td>
            </tr>
            <tr>
              <th className="text-center">2</th>
              <td className="text-start">Dinas Pendidikan</td>
              <td className="text-start">TPG</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-center">80,00%</td>
              <td className=" bg-accent-focus text-center">Tuntas</td>
            </tr>
            <tr>
              <th className="text-center">3</th>
              <td className="text-start">Dinas Pendidikan</td>
              <td className="text-start">TPG</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">-</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-end">20.031.703.000</td>
              <td className="text-center">80,00%</td>
              <td className=" bg-accent-focus text-center">Tuntas</td>
            </tr>
          </tbody>
          <thead className="text text-center text-slate-700">
            <tr>
              <th colSpan={3}>GRAND TOTAL</th>
              <th className="text-end">30.044.522.000</th>
              <th className="text-end">30.044.522.000</th>
              <th className="text-end">-</th>
              <th className="text-end">3.044.522.000</th>
              <th className="text-end">3.044.522.000</th>
              <th className="text-end">11.044.522.000</th>
              <th className="text-end">-</th>
              <th className="text-end">11.044.522.000</th>
              <th className="text-end">7.044.522.000</th>
              <th className="text-center">50%</th>
              <th></th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
