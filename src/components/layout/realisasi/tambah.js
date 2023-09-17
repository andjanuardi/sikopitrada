import { dateNow, dateToSQL, dateToTable } from "@/functions/dateformat";
import NumberFormat, { romawi } from "@/functions/numberformat";
import { closeModal, showModal } from "@/functions/swal";
import useSimda from "@/hooks/useSimda";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaSave, FaTimes, FaTimesCircle, FaTrashAlt } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

function Tambah({
  setopenModal,
  dataKontrak,
  sdana,
  selectedOPD,
  getDataRealisasi,
  session,
}) {
  const [loading, setLoading] = useState(false);
  const [kontraktual, setKontraktual] = useState(1);
  const [selectedKontrak, setSelectedKontrak] = useState([]);
  const [dataSP2D, setdataSP2D] = useState([]);
  const [nilaiNonKontraktual, setNilaiNonKontraktual] = useState(0);

  function reset() {
    setSelectedKontrak([]);
    setdataSP2D([]);
  }

  useEffect(() => {
    getDataSP2D(selectedKontrak.no_kontrak);
  }, [selectedKontrak]);

  useEffect(() => {
    reset();
  }, [kontraktual]);

  async function getDataSP2D(no_kontrak) {
    await fetch(process.env.API_SIMDA + "/api/sp2dkontrak", {
      method: "POST",
      body: JSON.stringify({
        db: session.data.db,
        tahun: session.data.ta,
        no_kontrak: no_kontrak,
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        setdataSP2D(data);
      })
      .then((error) => {
        console.log("Tidak Dapat terhubung ke SIMDA");
      });
  }

  async function btnSimpan(val) {
    const temp = [];
    dataSP2D.map((d, k) => {
      temp.push({
        tahap: k + 1,
        no_sp2d: d.no_sp2d,
        tgl_sp2d: dateToSQL(d.tgl_sp2d),
        keterangan: d.keterangan,
        nilai: d.nilai_sp2d,
      });
    });

    let tahapSP2D = [];
    for (let i = 0; i < 4; i++) {
      tahapSP2D[i] = dataSP2D[i] ? dataSP2D[i].no_sp2d : "-";
    }

    const data = {
      i: true,
      id: null,
      jenis: kontraktual,
      ta: sdana.ta,
      id_sdana: sdana.id,
      id_opd: sdana.id_opd,
      no_kontrak: selectedKontrak.no_kontrak,
      tgl_kontrak: dateToSQL(selectedKontrak.tgl_kontrak),
      nm_perusahaan: selectedKontrak.nm_perusahaan,
      keperluan: selectedKontrak.keperluan,
      nilai_kontrak: selectedKontrak.nilai,
      no_sp2d_1: tahapSP2D[0],
      no_sp2d_2: tahapSP2D[1],
      no_sp2d_3: tahapSP2D[2],
      no_sp2d_4: tahapSP2D[3],
      sp2d: temp,
    };

    if (!kontraktual) {
      data.no_kontrak = val.no_dokumen;
      data.tgl_kontrak = val.tgl_dokumen;
      data.nm_perusahaan = val.pelaksana;
      data.keperluan = val.rincian;
      data.nilai_kontrak = val.nilai;
    }

    if (Object.keys(dataSP2D).length <= 0) {
      Swal.fire("SP2D Kosong", "Data SP2D Tidak Ada", "warning");
      return;
    }

    if (dataSP2D.reduce((a, b) => a + b.nilai_sp2d, 0) > data.nilai_kontrak) {
      Swal.fire("Realisasi", "Realisasi Melebihi Pagu", "warning");
      return;
    }
    setLoading(true);
    await fetch("/api/realisasi", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((e) => e.json())
      .then((val) => {
        setLoading(false);
        if (val.error === 1062) {
          Swal.fire(
            "Gagal",
            `Data Gagal Disimpan Karna Nomor Kontrak ${data.no_kontrak} Sudah Ada Silahkan Coba Lagi`,
            "error"
          );
          return;
        }
        if (val.error) {
          Swal.fire("Gagal", `Data Gagal Disimpan Silahkan Coba Lagi`, "error");
          return;
        }
        getDataRealisasi({
          ta: data.ta,
          sbidang: true,
          id_opd: selectedOPD,
          id_sdana: parseInt(sdana.id),
        });
        Swal.fire("Sukses", "Data Berhasil Disimpan", "success");
        setopenModal(false);
      });

    // alert(JSON.stringify(data, "", 1));
  }

  return (
    <div className=" p-3 bg-white rounded-md min-w-[50vw]">
      <div className="flex justify-between items-center ">
        <div className="font-bold">Tambah Realisasi</div>
        <button
          className="btn btn-sm"
          onClick={() => {
            setopenModal(false);
            reset();
          }}
        >
          <FaTimesCircle />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold uppercase">
              Jenis Transaksi
            </span>
          </label>
          <select
            className="select select-sm select-bordered "
            value={kontraktual}
            onChange={(e) => setKontraktual(parseInt(e.currentTarget.value))}
          >
            <option value={1}>Kontraktual</option>
            <option value={0}>Non Kontraktual</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold uppercase">
              Data Sumber Dana
            </span>
          </label>
          <table className="table table-xs ">
            <tbody>
              <tr>
                <th>Sumber Dana</th>
                <td>{sdana.nama_sdana}</td>
              </tr>
              <tr>
                <th>Jenis Dana</th>
                <td>{sdana.nama_jdana}</td>
              </tr>
              <tr>
                <th>Bidang</th>
                <td>{sdana.nama_bidang}</td>
              </tr>
              <tr>
                <th>Sub Bidang</th>
                <td>{sdana.nama}</td>
              </tr>
              <tr>
                <th>Nama OPD </th>
                <td>{sdana.nm_sub_unit}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {kontraktual === 1 && (
          <>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold uppercase">
                  Data Kontrak
                </span>
                <button
                  type="button"
                  className="btn btn-sm"
                  onClick={() =>
                    showModal(
                      <PilihKontrak
                        setSelectedKontrak={setSelectedKontrak}
                        dataKontrak={dataKontrak}
                      />
                    )
                  }
                >
                  Pilih Kontrak Dari Data SIMDA
                </button>
              </label>
              {Object.keys(selectedKontrak).length <= 0 && (
                <div className="italic text-center">
                  Data Kontrak Belum di pilih
                </div>
              )}
              {Object.keys(selectedKontrak).length > 0 && (
                <table className="table table-xs">
                  <tbody>
                    <tr>
                      <th>No. Kontrak</th>
                      <td>{selectedKontrak.no_kontrak}</td>
                    </tr>
                    <tr>
                      <th>Tgl. Kontrak</th>
                      <td>{dateToTable(selectedKontrak.tgl_kontrak)}</td>
                    </tr>
                    <tr>
                      <th>Pelaksana</th>
                      <td>{selectedKontrak.nm_perusahaan}</td>
                    </tr>
                    <tr>
                      <th>Rincian Kegiatan</th>
                      <td className="max-w-[40vw]">
                        {selectedKontrak.keperluan}
                      </td>
                    </tr>
                    <tr>
                      <th>Nilai</th>
                      <td>{NumberFormat(selectedKontrak.nilai)}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {Object.keys(selectedKontrak).length > 0 && (
              <>
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text font-bold uppercase">
                      Realisasi (
                      {(dataSP2D.reduce((a, b) => a + b.nilai_sp2d, 0) /
                        selectedKontrak.nilai) *
                        100}
                      % ) ({"Rp. "}
                      {NumberFormat(
                        dataSP2D.reduce((a, b) => a + b.nilai_sp2d, 0)
                      )}
                      ,-)
                    </span>
                  </label>
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th>Tahap</th>
                        <th>No/Tgl SP2D</th>
                        <th>Uraian</th>
                        <th>Nilai</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSP2D.length <= 0 && (
                        <tr>
                          <td colSpan={4} className="italic text-center">
                            Belum ada SP2D
                          </td>
                        </tr>
                      )}

                      {dataSP2D.length > 0 &&
                        dataSP2D.map((d, k) => (
                          <tr key={k}>
                            <th>Tahap {romawi(k + 1)}</th>
                            <td>
                              {d.no_sp2d} <br />({dateToTable(d.tgl_sp2d)})
                            </td>
                            <td className="max-w-[50vw]">{d.keterangan}</td>
                            <td className="text-right">
                              {NumberFormat(d.nilai_sp2d)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {!loading && (
                  <button
                    className="btn btn-sm btn-success self-end mt-2 text-white"
                    onClick={() => btnSimpan()}
                  >
                    <FaSave /> Tambah
                  </button>
                )}
                {loading && (
                  <button
                    disabled
                    className="btn btn-sm btn-success self-end mt-2 text-white"
                  >
                    <CgSpinner className="animate-spin" /> Menyimpan
                  </button>
                )}
              </>
            )}
          </>
        )}
        {!kontraktual && (
          <Formik
            initialValues={{
              no_dokumen: "",
              tgl_dokumen: dateNow(),
              pelaksana: "",
              rincian: "",
              nilai: 0,
            }}
            onSubmit={(values) => {
              values.nilai = nilaiNonKontraktual;
              btnSimpan(values);
            }}
          >
            <Form>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold uppercase">
                    Data Kegiatan
                  </span>
                </label>
                <table className="table table-xs">
                  <tbody>
                    <tr>
                      <th>No. Dokumen</th>
                      <td>
                        <Field
                          required
                          name="no_dokumen"
                          type="text"
                          className="input input-sm input-bordered w-full"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Tgl. Dokumen</th>
                      <td>
                        <Field
                          required
                          name="tgl_dokumen"
                          type="date"
                          className="input input-sm input-bordered w-full"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Pelaksana</th>
                      <td>
                        <Field
                          required
                          name="pelaksana"
                          type="text"
                          className="input input-sm input-bordered w-full"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Rincian Kegiatan</th>
                      <td>
                        <Field
                          required
                          component="textarea"
                          name="rincian"
                          className="textarea textarea-bordered textarea-sm w-full"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>Nilai Pagu</th>
                      <td>
                        <NumericFormat
                          onValueChange={(e) =>
                            setNilaiNonKontraktual(e.floatValue)
                          }
                          defaultValue={0}
                          type="text"
                          required
                          displayType="input"
                          thousandSeparator="."
                          decimalSeparator=","
                          decimalScale={2}
                          className="input input-bordered input-sm w-full"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {nilaiNonKontraktual > 0 && (
                <>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text font-bold uppercase">
                        Realisasi (
                        {(dataSP2D.reduce((a, b) => a + b.nilai_sp2d, 0) /
                          nilaiNonKontraktual) *
                          100}
                        %) ({"Rp. "}
                        {NumberFormat(
                          dataSP2D.reduce((a, b) => a + b.nilai_sp2d, 0)
                        )}
                        ,-)
                      </span>
                      {Object.keys(dataSP2D).length < 4 && (
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() =>
                            showModal(
                              <PilihSP2D
                                selectedOPD={selectedOPD}
                                setdataSP2D={setdataSP2D}
                                dataSP2D={dataSP2D}
                                session={session}
                              />
                            )
                          }
                        >
                          Tambah SP2D Dari Data SIMDA
                        </button>
                      )}
                    </label>
                    <table className="table table-xs">
                      <thead>
                        <tr>
                          <th>Tahap</th>
                          <th>No/Tgl SP2D</th>
                          <th>Uraian</th>
                          <th>Nilai</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataSP2D.length <= 0 && (
                          <tr>
                            <td colSpan={4} className="italic text-center">
                              Belum ada SP2D
                            </td>
                          </tr>
                        )}

                        {dataSP2D.length > 0 &&
                          dataSP2D.map((d, k) => (
                            <tr key={k}>
                              <th>Tahap {romawi(k + 1)}</th>
                              <td>
                                {d.no_sp2d} <br />({dateToTable(d.tgl_sp2d)})
                              </td>
                              <td className="max-w-[50vw]">{d.keterangan}</td>
                              <td className="text-right">
                                {NumberFormat(d.nilai_sp2d)}
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm"
                                  type="button"
                                  onClick={() =>
                                    setdataSP2D(
                                      dataSP2D.filter(
                                        (e) => e.no_sp2d != d.no_sp2d
                                      )
                                    )
                                  }
                                >
                                  <FaTrashAlt />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  {!loading && (
                    <button
                      className="btn btn-sm btn-success self-end mt-2 text-white"
                      type="submit"
                    >
                      <FaSave /> Tambah
                    </button>
                  )}
                  {loading && (
                    <button
                      type="button"
                      disabled
                      className="btn btn-sm btn-success self-end mt-2 text-white"
                    >
                      <CgSpinner className="animate-spin" /> Menyimpan
                    </button>
                  )}
                </>
              )}
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
}

export default Tambah;

export function PilihKontrak({ dataKontrak, setSelectedKontrak }) {
  const [txtCari, setTextCari] = useState("");
  return (
    <div className="flex gap-3 flex-col py-4">
      <div className=" px-4 flex justify-between items-center text-sm">
        <div className="font-bold">Pilih Kontrak</div>
        <button className="btn btn-sm" onClick={() => closeModal()}>
          <FaTimes />
        </button>
      </div>
      <div className="flex px-4">
        <input
          className="input w-full input-sm input-bordered "
          placeholder="Cari.."
          onChange={(e) => setTextCari(e.currentTarget.value)}
        />
      </div>
      <div className="overflow-auto max-h-[60vh] px-2">
        <table className="table table-xs table-pin-rows table-zebra ">
          <thead>
            <tr>
              <th>No Kontrak</th>
              <th>Keperluan</th>
              <th>Pelaksana</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {dataKontrak
              .filter(
                (e) =>
                  JSON.stringify(e)
                    .toLowerCase()
                    .search(txtCari.toLocaleLowerCase()) >= 0
              )
              .map((d, k) => (
                <tr
                  key={k}
                  className="hover cursor-pointer"
                  onClick={() => {
                    setSelectedKontrak(d);
                    closeModal();
                  }}
                >
                  <td>{d.no_kontrak}</td>
                  <td>{d.keperluan}</td>
                  <td>{d.nm_perusahaan}</td>
                  <td className="whitespace-nowrap">{NumberFormat(d.nilai)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function PilihSP2D({ selectedOPD, setdataSP2D, dataSP2D, session }) {
  const { data: listdataSP2D, getData: getDataSP2D } = useSimda(
    "/api/sp2dcari",
    "POST",
    {
      db: session.data.db,
      tahun: session.data.ta,
      kd_urusan: selectedOPD.kd_urusan,
      kd_bidang: selectedOPD.kd_bidang,
      kd_unit: selectedOPD.kd_unit,
      kd_sub: selectedOPD.kd_sub,
      q: "",
    }
  );

  const [txtCari, setTextCari] = useState("");
  useEffect(() => {
    getDataSP2D({
      db: session.data.db,
      tahun: session.data.ta,
      kd_urusan: selectedOPD.kd_urusan,
      kd_bidang: selectedOPD.kd_bidang,
      kd_unit: selectedOPD.kd_unit,
      kd_sub: selectedOPD.kd_sub,
      q: txtCari,
    });
  }, [txtCari]);
  return (
    <div className="flex gap-3 flex-col py-4">
      <div className=" px-4 flex justify-between items-center text-sm">
        <div className="font-bold">Pilih SP2D</div>
        <button className="btn btn-sm" onClick={() => closeModal()}>
          <FaTimes />
        </button>
      </div>
      <div className="flex px-4">
        <input
          className="input w-full input-sm input-bordered "
          placeholder="Masukkan No SP2D atau Keterangan"
          onChange={(e) => setTextCari(e.currentTarget.value)}
        />
      </div>
      <div className="overflow-auto max-h-[60vh] px-2">
        <table className="table table-xs table-pin-rows table-zebra ">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>No SP2D</th>
              <th>Keterangan</th>
              <th>Nilai</th>
            </tr>
          </thead>
          <tbody>
            {listdataSP2D
              .filter((e) => !dataSP2D.includes(e.no_sp2d))
              .map((d, k) => (
                <tr
                  key={k}
                  className="hover cursor-pointer"
                  onClick={() => {
                    setdataSP2D([...dataSP2D, d]);
                    closeModal();
                  }}
                >
                  <td className="whitespace-nowrap">
                    {dateToTable(d.tgl_sp2d)}
                  </td>
                  <td className="whitespace-nowrap">{d.no_sp2d}</td>
                  <td className="max-w-[60vw]">{d.keterangan}</td>
                  <td className="whitespace-nowrap text-right">
                    {NumberFormat(d.nilai_sp2d)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
