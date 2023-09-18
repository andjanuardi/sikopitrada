import { dateNowBulanStr, dateToTable } from "@/functions/dateformat";
import NumberFormat from "@/functions/numberformat";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

function Print() {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("print")));
  }, []);
  const router = useRouter();

  const dataOPD = data.dataOPD;
  const dataPenandaTangan = data.datapenandatangan
    ? JSON.parse(data.datapenandatangan)
    : [];
  const dataRealisasi = data.data ? JSON.parse(data.data) : [];
  const selectedOPD = data.selectedOPD;
  const selectedSBidang = data.selectedSBidang
    ? JSON.parse(data.selectedSBidang)
    : [];

  useEffect(() => {
    window.print();
  }, [data]);

  return (
    <div className="bg-white">
      <table className="w-full table-xs ">
        <tbody>
          <tr>
            <td colSpan={3} className="font-black text-center text-lg">
              Laporan Penggunaan Dana Transfer
            </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap">Nama OPD</td>
            <td>:</td>
            <td className="w-full font-bold">{dataOPD} </td>
          </tr>
          <tr>
            <td className="whitespace-nowrap">Sumber Dana</td>
            <td>:</td>
            <td>
              {data.datasdana != "Pilih Sumber Dana"
                ? data.datasdana
                : "Semua Sumber Dana"}
              {data.datajdana != "Pilih Jenis Dana"
                ? " > " + data.datajdana
                : ""}
              {data.databidang != "Pilih Bidang" ? " > " + data.databidang : ""}
              {data.datasbidang != "Pilih Sub Bidang"
                ? " > " + data.datasbidang
                : ""}
            </td>
          </tr>
        </tbody>
      </table>

      <table className=" table table-xs lg:table-sm  table-zebra rounded-none my-2">
        <thead className="bg-black/70 text-white">
          <tr>
            <th rowSpan={2}>No</th>
            {selectedOPD <= 0 && <th rowSpan={2}>OPD</th>}
            {selectedSBidang && Object.keys(selectedSBidang).length <= 0 && (
              <th rowSpan={2}>Sumber Dana</th>
            )}
            <th rowSpan={2}>Rincian Kegiatan</th>
            <th rowSpan={2}>
              Nomor & <br /> Tanggal Dokumen
            </th>
            <th rowSpan={2}>Pelaksana</th>
            <th rowSpan={2}>Nilai Kontrak</th>
            <th colSpan={4} className="text-center">
              Penyaluran
            </th>
            <th rowSpan={2}>Total Penyaluran</th>
            <th rowSpan={2}>Sisa</th>
            <th rowSpan={2}>Persentase</th>
          </tr>
          <tr>
            <th>Tahap I</th>
            <th>Tahap II</th>
            <th>Tahap III</th>
            <th>Tahap VI</th>
          </tr>
        </thead>
        <tbody>
          {dataRealisasi &&
            dataRealisasi.map((d, k) => (
              <tr key={k} className="break-after-auto break-inside-avoid">
                <td className="text-xs">{k + 1}</td>
                {selectedOPD <= 0 && (
                  <td className="text-xs">{d.nm_sub_unit}</td>
                )}
                {Object.keys(selectedSBidang).length <= 0 && (
                  <td className="text-xs ">
                    {data.datasdana != "Pilih Sumber Dana"
                      ? ""
                      : `\n` + d.nama_sdana}
                    {data.datajdana != "Pilih Jenis Dana"
                      ? ""
                      : `\n` + d.nama_jdana}
                    {data.databidang != "Pilih Bidang"
                      ? ""
                      : `\n` + d.nama_bidang}
                    {data.datasbidang != "Pilih Sub Bidang"
                      ? ""
                      : `\n` + d.nama_sbidang}
                  </td>
                )}
                <td className="text-xs">{d.keperluan}</td>
                <td className="text-xs">
                  {d.no_kontrak}
                  <br />
                  {dateToTable(d.tgl_kontrak)}
                </td>
                <td className="text-xs">{d.nm_perusahaan}</td>
                <td className="text-right text-xs">
                  {NumberFormat(d.nilai_kontrak)}
                </td>
                <td className="text-right text-xs">{NumberFormat(d.nilai1)}</td>
                <td className="text-right text-xs">{NumberFormat(d.nilai2)}</td>
                <td className="text-right text-xs">{NumberFormat(d.nilai3)}</td>
                <td className="text-right text-xs">{NumberFormat(d.nilai4)}</td>
                <td className="text-right text-xs">
                  {NumberFormat(d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4)}
                </td>
                <td className="text-right text-xs">
                  {NumberFormat(
                    d.nilai_kontrak -
                      (d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4)
                  )}
                </td>
                <td className="text-xs">
                  {((d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4) /
                    d.nilai_kontrak) *
                    100}
                  %
                </td>
              </tr>
            ))}
          <tr className="!bg-black/70 !text-white">
            {selectedOPD <= 0 && <th className="bg-black/70"></th>}
            {selectedSBidang && Object.keys(selectedSBidang).length <= 0 && (
              <th className="bg-black/70"></th>
            )}
            <th className="bg-black/70 text-white text-right" colSpan={4}>
              Total
            </th>
            <th className="text-right">
              {NumberFormat(
                dataRealisasi.reduce((a, b) => a + b.nilai_kontrak, 0)
              )}
            </th>
            <th className="text-right">
              {NumberFormat(dataRealisasi.reduce((a, b) => a + b.nilai1, 0))}
            </th>
            <th className="text-right">
              {NumberFormat(dataRealisasi.reduce((a, b) => a + b.nilai2, 0))}
            </th>
            <th className="text-right">
              {NumberFormat(dataRealisasi.reduce((a, b) => a + b.nilai3, 0))}
            </th>
            <th className="text-right">
              {NumberFormat(dataRealisasi.reduce((a, b) => a + b.nilai4, 0))}
            </th>
            <th className="text-right">
              {NumberFormat(
                dataRealisasi.reduce(
                  (a, b) => a + b.nilai1 + b.nilai2 + b.nilai3 + b.nilai4,
                  0
                )
              )}
            </th>
            <th className="text-right">
              {NumberFormat(
                dataRealisasi.reduce(
                  (a, b) =>
                    a +
                    b.nilai_kontrak -
                    (b.nilai1 + b.nilai2 + b.nilai3 + b.nilai4),
                  0
                )
              )}
            </th>
            <th colSpan={2} className="bg-black/70 text-white text-center"></th>
          </tr>
        </tbody>
      </table>

      <div className="grid grid-cols-3 text-sm mt-3">
        <div className="col-span-2"></div>
        <div>
          <div>Sinabang, {dateNowBulanStr()}</div>
          <div>{dataPenandaTangan.jabatan}</div>
          <div className="my-3">
            <QRCodeSVG
              value={`Ditandatangangi secara elektronik di Sinabang, ${dateNowBulanStr()} oleh :\n${
                dataPenandaTangan.nama
              }\n${dataPenandaTangan.jabatan}`}
              size={120}
            />
          </div>

          <div className=" font-bold underline">{dataPenandaTangan.nama}</div>
          <div>
            {dataPenandaTangan.pangkat} ({dataPenandaTangan.golongan})
          </div>
          <div>NIP. {dataPenandaTangan.nip}</div>
        </div>
      </div>
    </div>
  );
}

export default Print;
Print.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ req }) {
  console.log(req.body);
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
