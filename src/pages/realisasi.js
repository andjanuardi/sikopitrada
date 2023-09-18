import ModalWindow from "@/components/layout/modal";
import Tambah from "@/components/layout/realisasi/tambah";
import { dateToTable } from "@/functions/dateformat";
import NumberFormat from "@/functions/numberformat";
import useFetch from "@/hooks/useFetch";
import useSimda from "@/hooks/useSimda";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function Realisasi() {
  const session = useSession();
  const { data: dataOPD, getData: getDataOPD } = useFetch("/api/opd", "POST", {
    s: true,
  });
  const { data: dataRealisasi, getData: getDataRealisasi } = useFetch(
    "/api/realisasi",
    "POST"
  );
  const { data: dataSumberDana, getData: getDataSumberDana } = useFetch(
    "/api/sumberdana",
    "POST"
  );

  const { data: dataKontrak, getData: getDataKontrak } = useSimda(
    "/api/kontrak",
    "POST",
    {
      db: session.data.db,
      tahun: session.data.ta,
      kd_urusan: session.data.kd_urusan,
      kd_bidang: session.data.kd_bidang,
      kd_unit: session.data.kd_unit,
      kd_sub: session.data.kd_sub,
    }
  );

  const [selectedOPD, setSelectedOPD] = useState(session.data.id_opd);
  const [dataselectedOPD, setDataSelectedOPD] = useState([]);
  const [selectedSdana, setSelectedSdana] = useState(0);
  const [selectedJdana, setSelectedJdana] = useState(0);
  const [selectedBidang, setSelectedBidang] = useState(0);
  const [selectedSBidang, setSelectedSBidang] = useState([]);
  const [sdana, setsdana] = useState([]);
  const [jdana, setjdana] = useState([]);
  const [bidang, setbidang] = useState([]);
  const [openModal, setopenModal] = useState(false);

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
    console.log(
      typeof dataselectedOPD === "object" && Object.keys(dataselectedOPD).length
    );
    if (
      typeof dataselectedOPD === "object" &&
      Object.keys(dataselectedOPD).length > 0
    ) {
      getDataKontrak({
        url: "/api/kontrak",
        db: session.data.db,
        tahun: session.data.ta,
        kd_urusan: dataselectedOPD.kd_urusan,
        kd_bidang: dataselectedOPD.kd_bidang,
        kd_unit: dataselectedOPD.kd_unit,
        kd_sub: dataselectedOPD.kd_sub,
      });
    }
  }, [selectedSBidang]);

  function getRealisasi(level = "opd") {
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
  }, []);

  useEffect(() => {
    setSelectedSdana(0);
    if (selectedOPD > 0) {
      getDataSumberDana({ opd: true, id: selectedOPD });
      setDataSelectedOPD(dataOPD.filter((e) => e.id === selectedOPD)[0]);
    } else {
      getDataSumberDana({ sdana: true });
    }
    getRealisasi();
  }, [selectedOPD]);

  return (
    <div className="lg:p-3 py-2 grid grid-cols-1  ">
      <ModalWindow
        open={openModal}
        content={
          <Tambah
            sdana={selectedSBidang}
            setopenModal={setopenModal}
            dataKontrak={dataKontrak}
            selectedOPD={dataselectedOPD}
            getDataRealisasi={getDataRealisasi}
            session={session}
          />
        }
      />
      <div className="flex flex-col gap-2">
        <div className="join w-full">
          <label className="btn btn-sm join-item">Nama OPD</label>
          <select
            className="select select-bordered join-item select-sm w-full lg:flex-1"
            onChange={(e) => setSelectedOPD(JSON.parse(e.currentTarget.value))}
            value={JSON.stringify(selectedOPD)}
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
          <label className="btn btn-sm join-item normal-case">
            Rp. {NumberFormat(dataSumberDana.reduce((a, b) => a + b.nilai, 0))}
            ,-
          </label>
        </div>

        <div className="join w-full">
          <label className="btn btn-sm join-item">Sumber Dana</label>
          <select
            className="select select-bordered join-item select-sm w-full lg:flex-1"
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
          <label className="btn btn-sm join-item normal-case">
            Rp.{" "}
            {NumberFormat(
              dataSumberDana
                .filter((e) => e.id_sdana === parseInt(selectedSdana))
                .reduce((a, b) => a + b.nilai, 0)
            )}
            ,-
          </label>
        </div>

        {selectedSdana != parseInt(0) && (
          <div className="join w-full">
            <label className="btn btn-sm join-item">Jenis Dana</label>
            <select
              className="select select-bordered join-item select-sm w-full lg:flex-1"
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
            <label className="btn btn-sm join-item normal-case">
              Rp.{" "}
              {NumberFormat(
                dataSumberDana
                  .filter((e) => e.id_jdana === parseInt(selectedJdana))
                  .reduce((a, b) => a + b.nilai, 0)
              )}
              ,-
            </label>
          </div>
        )}

        {selectedJdana != parseInt(0) && (
          <div className="join w-full">
            <label className="btn btn-sm join-item">Bidang</label>
            <select
              className="select select-bordered join-item select-sm w-full lg:flex-1"
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
            <label className="btn btn-sm join-item normal-case">
              Rp.{" "}
              {NumberFormat(
                dataSumberDana
                  .filter((e) => e.id_bidang === parseInt(selectedBidang))
                  .reduce((a, b) => a + b.nilai, 0)
              )}
              ,-
            </label>
          </div>
        )}

        {selectedBidang != parseInt(0) && (
          <div className="join w-full">
            <label className="btn btn-sm join-item">Sub Bidang</label>
            <select
              className="select select-bordered join-item select-sm w-full lg:flex-1"
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
            <label className="btn btn-sm join-item normal-case">
              Rp.{" "}
              {NumberFormat(
                dataSumberDana
                  .filter((e) => e.id === parseInt(selectedSBidang.id))
                  .reduce((a, b) => a + b.nilai, 0)
              )}
              ,-
            </label>
          </div>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className=" table table-xs lg:table-sm bg-base-200/20 rounded-none my-2">
          <thead className="bg-black/40 text-white">
            <tr>
              <th rowSpan={2}>No</th>
              {Object.keys(selectedOPD).length <= 0 && <th rowSpan={2}>OPD</th>}
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

              {Object.keys(selectedSBidang).length > 0 && (
                <th className="text-right" rowSpan={2}>
                  <button
                    className=" btn btn-sm"
                    onClick={() => {
                      setopenModal(true);
                    }}
                  >
                    Tambah
                  </button>
                </th>
              )}
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
                  {Object.keys(selectedOPD).length <= 0 && (
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
                  {Object.keys(selectedSBidang).length > 0 && (
                    <td>
                      <div className="btn-group">
                        {/* <button className="btn btn-ghost">
                          <FaEdit />
                        </button> */}
                        <button
                          className="btn btn-ghost"
                          onClick={() =>
                            Swal.fire({
                              title: "Hapus?",
                              text: `anda yakin ingin menghapus data ${d.keperluan}`,
                              icon: "question",
                              showCancelButton: true,
                              cancelButtonText: "Batal",
                              confirmButtonText: "Hapus",
                            }).then(async (e) => {
                              if (e.isConfirmed) {
                                await fetch("/api/realisasi", {
                                  method: "POST",
                                  body: JSON.stringify({
                                    d: true,
                                    no_kontrak: d.no_kontrak,
                                  }),
                                });
                                Swal.fire(
                                  "Sukses",
                                  "Data Berhasil di hapus",
                                  "success"
                                );
                                getRealisasi("sbidang");
                              }
                            })
                          }
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            <tr>
              <th className="bg-black/40 text-white text-center" colSpan={4}>
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
              <th
                colSpan={2}
                className="bg-black/40 text-white text-center"
              ></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
