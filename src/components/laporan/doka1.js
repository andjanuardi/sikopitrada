export default function Doka1() {
  return (
    <div className="flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-1 text-center">
        <label className=" text-base font-bold">
          ALOKASI PEMBAGIAN DAN PENYALURAN DANA OTONOMI KHUSUS
        </label>
        <label className=" text-base font-bold">
          ANTARA PROVINSI DAN KABUPATEN/KOTA
        </label>
        <label className=" text-base font-bold">TAHUN ANGGARAN 2023</label>
      </div>
      <div className="flex w-[50vw]">
        <table className="table table-xs">
          <thead className="text-slate-700">
            <tr>
              <th>Pagu Alokasi Tahun 2023</th>
              <th>Rp. 30.000.000.000</th>
            </tr>
            <tr>
              <td>Penyaluran tahap sebelumnya yang diterima dari RKUD</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sisa DOKA Tahun 2022</td>
              <td>Rp. 10.008.726.424</td>
            </tr>
            <tr>
              <td>Tahap II</td>
              <td>RP. -</td>
            </tr>
            <tr>
              <td>Tahap II</td>
              <td>Rp. -</td>
            </tr>
            <tr>
              <td>Tahap III</td>
              <td>Rp. -</td>
            </tr>
          </tbody>
          <thead className="text-slate-700">
            <tr>
              <th>Total</th>
              <th>Rp. 10.000.000.000</th>
            </tr>
            <tr>
              <th>
                Realisasi Belanja melalui SP2D daerah sampai dengan tahap
                sebelumnya
              </th>
              <th>Rp. 7.000.000.000</th>
            </tr>
            <tr>
              <th>Sisa Dana Otonomi Khusus</th>
              <th>Rp. 6.000.000.000</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className=" overflow-y-auto max-w-[95vw] ">
        <table className="table table-xs">
          <thead className="text text-center text-slate-700">
            <tr>
              <th></th>
              <th></th>
              <th className=" whitespace-break-spaces">
                ALOKASI ANGGARAN (Rp.)
              </th>
              <th className=" whitespace-break-spaces">
                REALISASI s.d TAHAP I (Rp.)
              </th>
              <th>Sisa Dana</th>
              <th className=" whitespace-break-spaces">
                PROSENTASE REALISASI ANGGARAN (%)
              </th>
              <th></th>
            </tr>
            <tr>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5=3-4</th>
              <th>6</th>
              <th>7</th>
            </tr>
            <tr>
              <th>A</th>
              <th className="text-start">Kabupaten Simeulue</th>
            </tr>
          </thead>
          <tbody className="text">
            <tr>
              <th className="text-center">1</th>
              <td className="text-start">DINAS PENDIDIKAN</td>
              <td className="text-end">4.000.000</td>
              <td className="text-end">11.000.000</td>
              <td className="text-end">8.000.000</td>
              <td className="text-center">30%</td>
            </tr>
            <tr>
              <th className="text-center">1</th>
              <td className="text-start">DINAS PENDIDIKAN</td>
              <td className="text-end">4.000.000</td>
              <td className="text-end">11.000.000</td>
              <td className="text-end">8.000.000</td>
              <td className="text-center">30%</td>
            </tr>
          </tbody>
          <thead className="text text-center text-slate-700">
            <tr>
              <th colSpan={2}>Jumlah</th>
              <th className="text-end">30.044.522.000</th>
              <th className="text-end">30.044.522.000</th>
              <th className="text-end">30.044.522.000</th>
              <td className="text-center">10%</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
