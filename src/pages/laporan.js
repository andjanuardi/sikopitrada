import DakBertahap from "@/components/laporan/dak_bertahap";
import useFetch from "@/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { dateToTable } from "@/functions/dateformat";
import NumberFormat from "@/functions/numberformat";
import { getSession, useSession } from "next-auth/react";
import { FaFileExcel, FaTable } from "react-icons/fa";
import { BiPrinter } from "react-icons/bi";
import { useRouter } from "next/router";
import * as XLSX from "xlsx";
function Laporan() {
  const session = useSession();
  const router = useRouter();
  const btnPrint = useRef();
  const selectOPD = useRef();
  const selectsdana = useRef();
  const selectjdana = useRef();
  const selectbidang = useRef();
  const selectsbidang = useRef();

  const { data: dataOPD, getData: getDataOPD } = useFetch("/api/opd", "POST", {
    s: true,
  });
  const { data: dataPenandaTangan, getData: getDataPenandaTangan } = useFetch(
    "/api/penandatangan",
    "POST"
  );
  const { data: dataRealisasi, getData: getDataRealisasi } = useFetch(
    "/api/realisasi",
    "POST"
  );
  const { data: dataSumberDana, getData: getDataSumberDana } = useFetch(
    "/api/sumberdana",
    "POST"
  );

  const [selectedOPD, setSelectedOPD] = useState(session.data.id_opd);
  const [selectedSdana, setSelectedSdana] = useState(0);
  const [selectedJdana, setSelectedJdana] = useState(0);
  const [selectedBidang, setSelectedBidang] = useState(0);
  const [selectedSBidang, setSelectedSBidang] = useState([]);
  const [selectedPenandatangan, setSelectedPenandatangan] = useState([]);
  const [sdana, setsdana] = useState([]);
  const [jdana, setjdana] = useState([]);
  const [bidang, setbidang] = useState([]);
  const [tampilLaporan, setTampilLaporan] = useState(false);

  useEffect(() => {
    setsdana(
      dataSumberDana.filter(
        (e, k, p) => k === p.findIndex((t) => t.id_sdana === e.id_sdana)
      )
    );
    setjdana(
      dataSumberDana.filter(
        (e, k, p) => k === p.findIndex((t) => t.id_jdana === e.id_jdana)
      )
    );
    setbidang(
      dataSumberDana.filter(
        (e, k, p) => k === p.findIndex((t) => t.id_bidang === e.id_bidang)
        // (e, k, p) => k === p.findIndex((t) => t.id_bidang === e.id_bidang)
      )
    );
  }, [dataSumberDana]);

  useEffect(() => {
    setSelectedJdana(0);
    if (selectedSdana > 0) {
      getRealisasi("sdana");
    } else {
      getRealisasi();
    }
  }, [selectedSdana]);

  useEffect(() => {
    setSelectedBidang(0);
    if (selectedJdana > 0) {
      getRealisasi("jdana");
    } else {
      getRealisasi("sdana");
    }
  }, [selectedJdana]);

  useEffect(() => {
    setSelectedSBidang([]);
    if (selectedBidang > 0) {
      getRealisasi("bidang");
    } else {
      getRealisasi("jdana");
    }
  }, [selectedBidang]);

  useEffect(() => {
    if (Object.keys(selectedSBidang).length > 0) {
      getRealisasi("sbidang");
    } else {
      if (selectedSdana === 0) {
        getRealisasi("opd");
      } else {
        getRealisasi("bidang");
      }
    }
  }, [selectedSBidang]);

  function getRealisasi(level = "opd") {
    setTampilLaporan(false);
    switch (level) {
      case "sdana":
        getDataRealisasi({
          ta: session.data.ta,
          sdana: true,
          id_opd: selectedOPD,
          id_sdana: parseInt(selectedSdana),
        });
        break;
      case "jdana":
        getDataRealisasi({
          ta: session.data.ta,
          jdana: true,
          id_opd: selectedOPD,
          id_sdana: parseInt(selectedJdana),
        });
        break;
      case "bidang":
        getDataRealisasi({
          ta: session.data.ta,
          bidang: true,
          id_opd: selectedOPD,
          id_sdana: parseInt(selectedBidang),
        });
        break;
      case "sbidang":
        getDataRealisasi({
          ta: session.data.ta,
          sbidang: true,
          id_opd: selectedOPD,
          id_sdana: parseInt(selectedSBidang.id),
        });
        break;

      default:
        if (selectedOPD > 0) {
          getDataRealisasi({
            ta: session.data.ta,
            opd: true,
            id_opd: selectedOPD,
          });
        } else {
          getDataRealisasi({
            ta: session.data.ta,
            s: true,
          });
        }
        break;
    }
  }

  useEffect(() => {
    getDataOPD({ s: true });
    setSelectedOPD(session.data.id_opd);
    getDataPenandaTangan({ aktif: true });
  }, []);

  useEffect(() => {
    setSelectedSdana(0);
    if (selectedOPD > 0) {
      getDataSumberDana({ opd: true, id: selectedOPD });
    } else {
      getDataSumberDana({ sdana: true });
    }
    getRealisasi();
  }, [selectedOPD]);

  async function btnDownload() {
    let laporan = [];
    dataRealisasi.map((d, k) => {
      laporan.push({
        No: k + 1,
        "Nama OPD": d.nm_sub_unit,
        "Sumber Dana": `${d.nama_sdana} > ${d.nama_jdana} > ${d.nama_bidang} > ${d.nama_sbidang}`,
        "Rincian Kegiatan": d.keperluan,
        "Nomor & Tanggal Dokumen": `${d.no_kontrak} (${dateToTable(
          d.tgl_kontrak
        )})`,
        Pelaksana: d.nm_perusahaan,
        "Nilai Kontrak": d.nilai_kontrak,
        "Tahap I": d.nilai1,
        "Tahap II": d.nilai2,
        "Tahap III": d.nilai3,
        "Tahap IIV": d.nilai4,
        "Total Penyaluran": d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4,
        Sisa: d.nilai_kontrak - (d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4),
        Persentase:
          ((d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4) / d.nilai_kontrak) *
            100 +
          "%",
      });
    });
    const worksheet = XLSX.utils.json_to_sheet(laporan);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Dana Transfer");
    XLSX.writeFile(workbook, `Sikopitrda.xlsx`);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <div className="join col-span-2 ">
          <label className="join-item btn btn-sm ">Nama OPD</label>
          <select
            ref={selectOPD}
            className="select join-item select-sm select-bordered w-full"
            value={selectedOPD}
            onChange={(e) => setSelectedOPD(e.currentTarget.value)}
          >
            {session.data.jabatan != 2 && <option value={0}>SEMUA OPD</option>}

            {dataOPD &&
              dataOPD
                .filter((e) =>
                  session.data.jabatan === 2 ? e.id === session.data.id_opd : e
                )
                .map((d, k) => (
                  <option key={k} value={d.id}>
                    {d.nm_sub_unit}
                  </option>
                ))}
          </select>
        </div>
        <div className="join col-span-2 lg:col-span-1">
          <label className="join-item btn btn-sm ">Suber Dana</label>
          <select
            ref={selectsdana}
            className="select join-item select-sm select-bordered w-full "
            value={selectedSdana}
            onChange={(e) => setSelectedSdana(e.currentTarget.value)}
          >
            <option value={0}>Pilih Sumber Dana</option>
            {sdana &&
              sdana.map((d, k) => (
                <option key={k} value={d.id_sdana}>
                  {d.nama_sdana}
                </option>
              ))}
          </select>
        </div>
        <div className="join col-span-2 lg:col-span-1">
          <label className="join-item btn btn-sm ">Jenis Dana</label>
          <select
            ref={selectjdana}
            className="select join-item select-sm select-bordered w-full "
            value={selectedJdana}
            onChange={(e) => setSelectedJdana(e.currentTarget.value)}
          >
            <option value={0}>Pilih Jenis Dana</option>
            {jdana &&
              jdana
                .filter((e) => e.id_sdana === parseInt(selectedSdana))
                .map((d, k) => (
                  <option key={k} value={d.id_jdana}>
                    {d.nama_jdana}
                  </option>
                ))}
          </select>
        </div>
        <div className="join col-span-2 lg:col-span-1">
          <label className="join-item btn btn-sm ">Bidang</label>
          <select
            ref={selectbidang}
            className="select join-item select-sm select-bordered w-full "
            value={selectedBidang}
            onChange={(e) => setSelectedBidang(e.currentTarget.value)}
          >
            <option value={0}>Pilih Bidang</option>
            {bidang &&
              bidang
                .filter(
                  (e) =>
                    e.id_sdana === parseInt(selectedSdana) &&
                    e.id_jdana === parseInt(selectedJdana)
                )
                .map((d, k) => (
                  <option key={k} value={d.id_bidang}>
                    {d.nama_bidang}
                  </option>
                ))}
          </select>
        </div>
        <div className="join col-span-2 lg:col-span-1">
          <label className="join-item btn btn-sm ">Sub Bidang</label>
          <select
            ref={selectsbidang}
            className="select join-item select-sm select-bordered w-full "
            value={JSON.stringify(selectedSBidang)}
            onChange={(e) =>
              setSelectedSBidang(JSON.parse(e.currentTarget.value))
            }
          >
            <option value={JSON.stringify([])}>Pilih Sub Bidang</option>
            {bidang &&
              bidang
                .filter(
                  (e) =>
                    e.id_sdana === parseInt(selectedSdana) &&
                    e.id_jdana === parseInt(selectedJdana) &&
                    e.id_bidang === parseInt(selectedBidang)
                )
                .map((d, k) => (
                  <option key={k} value={JSON.stringify(d)}>
                    {d.nama}
                  </option>
                ))}
          </select>
        </div>
        <div className="join col-span-2">
          <label className="join-item btn btn-sm ">Penandatangan</label>
          <select
            className="select join-item select-sm select-bordered w-full "
            value={JSON.stringify(selectedPenandatangan)}
            onChange={(e) =>
              setSelectedPenandatangan(JSON.parse(e.currentTarget.value))
            }
          >
            <option value={JSON.stringify([])}>Pilih Penandatangan</option>
            {dataPenandaTangan &&
              dataPenandaTangan.map((d, k) => (
                <option key={k} value={JSON.stringify(d)}>
                  {d.nama}
                </option>
              ))}
          </select>
        </div>
        <div className=" btn-group col-span-2 flex justify-end">
          <button
            className="btn btn-primary w-fit "
            onClick={() => setTampilLaporan(true)}
          >
            <FaTable />
            Tampilkan Laporan
          </button>
          {Object.keys(dataRealisasi).length > 0 && (
            <>
              <button
                className="btn btn-primary w-fit "
                onClick={() => btnDownload()}
              >
                <FaFileExcel />
                Download Excel
              </button>
              {Object.keys(selectedPenandatangan).length > 0 && (
                <button
                  className="btn btn-primary w-fit "
                  onClick={() => btnPrint.current.click()}
                >
                  <BiPrinter />
                  Print
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            const dataprint = {
              data: e.currentTarget.data.value,
              dataOPD: e.currentTarget.dataOPD.value,
              selectedOPD: e.currentTarget.selectedOPD.value,
              datasdana: e.currentTarget.datasdana.value,
              datajdana: e.currentTarget.datajdana.value,
              databidang: e.currentTarget.databidang.value,
              datasbidang: e.currentTarget.datasbidang.value,
              datapenandatangan: e.currentTarget.datapenandatangan.value,
              selectedSBidang: e.currentTarget.selectedSBidang.value,
            };
            localStorage.setItem("print", JSON.stringify(dataprint));
            e.currentTarget.submit();
          }}
          action="/print"
          target="_blank"
        >
          <input hidden name="data" value={JSON.stringify(dataRealisasi)} />
          <input
            hidden
            name="dataOPD"
            value={
              selectOPD.current &&
              selectOPD.current.options[selectOPD.current.selectedIndex] &&
              selectOPD.current.options[selectOPD.current.selectedIndex].label
            }
          />
          <input hidden name="selectedOPD" value={selectedOPD} />
          <input
            hidden
            name="datasdana"
            value={
              selectsdana.current &&
              selectsdana.current.options[selectsdana.current.selectedIndex] &&
              selectsdana.current.options[selectsdana.current.selectedIndex]
                .label
            }
          />
          <input
            hidden
            name="datajdana"
            value={
              selectjdana.current &&
              selectjdana.current.options[selectjdana.current.selectedIndex] &&
              selectjdana.current.options[selectjdana.current.selectedIndex]
                .label
            }
          />
          <input
            hidden
            name="databidang"
            value={
              selectbidang.current &&
              selectbidang.current.options[
                selectbidang.current.selectedIndex
              ] &&
              selectbidang.current.options[selectbidang.current.selectedIndex]
                .label
            }
          />
          <input
            hidden
            name="datasbidang"
            value={
              selectsbidang.current &&
              selectsbidang.current.options[
                selectsbidang.current.selectedIndex
              ] &&
              selectsbidang.current.options[selectsbidang.current.selectedIndex]
                .label
            }
          />
          <input
            hidden
            name="datapenandatangan"
            value={JSON.stringify(selectedPenandatangan)}
          />
          <input
            hidden
            name="selectedSBidang"
            value={JSON.stringify(selectedSBidang)}
          />
          <button ref={btnPrint} type="submit" className="hidden"></button>
        </form>
      </div>
      {tampilLaporan && (
        <div className="grid grid-cols-1">
          <div className="divider">LAPORAN</div>

          <div className="overflow-x-auto">
            <table className=" table table-xs lg:table-sm bg-base-200/20 rounded-none my-2 print:!block ">
              <thead className="bg-black/40 text-white">
                <tr>
                  <th rowSpan={2}>No</th>
                  {selectedOPD <= 0 && <th rowSpan={2}>OPD</th>}
                  {Object.keys(selectedSBidang).length <= 0 && (
                    <th rowSpan={2}>Sumber Dana</th>
                  )}
                  <th rowSpan={2}>Rincian Kegiatan</th>
                  <th rowSpan={2}>
                    Judul Nomor <br /> Tanggal Dokumen
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
                    <tr key={k}>
                      <td className="text-xs">{k + 1}</td>
                      {selectedOPD <= 0 && (
                        <td className="text-xs">{d.nm_sub_unit}</td>
                      )}
                      {Object.keys(selectedSBidang).length <= 0 && (
                        <td className="text-xs">
                          {d.nama_sdana}
                          {" > "}
                          {d.nama_jdana}
                          {" > "}
                          <br />
                          {d.nama_bidang}
                          {" > "}
                          {d.nama_sbidang}
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
                      <td className="text-right text-xs">
                        {NumberFormat(d.nilai1)}
                      </td>
                      <td className="text-right text-xs">
                        {NumberFormat(d.nilai2)}
                      </td>
                      <td className="text-right text-xs">
                        {NumberFormat(d.nilai3)}
                      </td>
                      <td className="text-right text-xs">
                        {NumberFormat(d.nilai4)}
                      </td>
                      <td className="text-right text-xs">
                        {NumberFormat(
                          d.nilai1 + d.nilai2 + d.nilai3 + d.nilai4
                        )}
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
                <tr>
                  {selectedOPD <= 0 && <th className="bg-black/40"></th>}
                  {Object.keys(selectedSBidang).length <= 0 && (
                    <th className="bg-black/40"></th>
                  )}
                  <th className="bg-black/40 text-white text-right" colSpan={4}>
                    Total
                  </th>
                  <th className="text-right">
                    {NumberFormat(
                      dataRealisasi.reduce((a, b) => a + b.nilai_kontrak, 0)
                    )}
                  </th>
                  <th className="text-right">
                    {NumberFormat(
                      dataRealisasi.reduce((a, b) => a + b.nilai1, 0)
                    )}
                  </th>
                  <th className="text-right">
                    {NumberFormat(
                      dataRealisasi.reduce((a, b) => a + b.nilai2, 0)
                    )}
                  </th>
                  <th className="text-right">
                    {NumberFormat(
                      dataRealisasi.reduce((a, b) => a + b.nilai3, 0)
                    )}
                  </th>
                  <th className="text-right">
                    {NumberFormat(
                      dataRealisasi.reduce((a, b) => a + b.nilai4, 0)
                    )}
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
                  <th
                    colSpan={2}
                    className="bg-black/40 text-white text-center"
                  >
                    {NumberFormat(
                      dataRealisasi.reduce(
                        (a, b) => a + b.nilai1 + b.nilai2 + b.nilai3 + b.nilai4,
                        0
                      )
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Laporan;

export async function getServerSideProps({ req }) {
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
