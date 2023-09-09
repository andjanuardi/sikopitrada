import { dateToSQL, dateToTable } from "@/functions/dateformat";
import NumberFormat, { romawi } from "@/functions/numberformat";
import { closeModal, showModal } from "@/functions/swal";
import { useEffect, useState } from "react";
import { FaSave, FaTimes, FaTimesCircle } from "react-icons/fa";

function Tambah({ setopenModal, dataKontrak, sdana }) {
  const [selectedKontrak, setSelectedKontrak] = useState([]);
  const [dataSP2D, setdataSP2D] = useState([]);

  function reset() {
    setSelectedKontrak([]);
    setdataSP2D([]);
  }

  useEffect(() => {
    getDataSP2D(selectedKontrak.no_kontrak);
  }, [selectedKontrak]);

  async function getDataSP2D(no_kontrak) {
    await fetch(process.env.API_SIMDA + "/api/sp2dkontrak", {
      method: "POST",
      body: JSON.stringify({
        db: "DB2023",
        tahun: "2023",
        no_kontrak: no_kontrak,
      }),
    })
      .then((e) => e.json())
      .then((data) => {
        setdataSP2D(data);
      });
  }

  function btnSimpan() {
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

    const data = {
      ta: sdana.ta,
      id_sdana: sdana.id,
      id_opd: sdana.id_opd,
      no_kontrak: selectedKontrak.no_kontrak,
      tgl_kontrak: dateToSQL(selectedKontrak.tgl_kontrak),
      nm_perusahaan: selectedKontrak.nm_perusahaan,
      keperluan: selectedKontrak.keperluan,
      nilai_kontrak: selectedKontrak.nilai,

      sp2d: temp,
    };
    alert(JSON.stringify(data));
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
            onChange={() => reset()}
          >
            <option value={0}>Kontraktual</option>
            <option value={1}>Non Kontraktual</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold uppercase">
              Data Sumber Dana
            </span>
          </label>
          <table className="table table-xs">
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
                <th>Nama OPD</th>
                <td>{sdana.nm_sub_unit}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
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

        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold uppercase">Data Kontrak</span>
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
                  <th>Rincain Kegiatan</th>
                  <td className="max-w-[40vw]">{selectedKontrak.keperluan}</td>
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
                  Realisasi
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
                  {dataSP2D.filter((e) => e.no_sp2d != null).length <= 0 && (
                    <tr>
                      <td colSpan={4} className="italic text-center">
                        Belum ada SP2D
                      </td>
                    </tr>
                  )}

                  {dataSP2D.filter((e) => e.no_sp2d != null).length > 0 &&
                    dataSP2D.map((d, k) => (
                      <tr>
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

            {/* TABLE 1 */}
            {/* <div className="form-control ">
              <label className="label">
                <span className="label-text font-bold uppercase">
                  Realisasi
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
                  {dataSP2D.filter((e) => e.no_sp2d != null).length <= 0 && (
                    <tr>
                      <td colSpan={4} className="italic text-center">
                        Belum ada SP2D
                      </td>
                    </tr>
                  )}

                  {dataSP2D.filter((e) => e.no_sp2d != null).length > 0 && (
                    <tr>
                      <th>
                        Tahap I <br />
                        {Object.keys(dataTahap1).length > 0 && (
                          <span>
                            (
                            {(dataTahap1.nilai_sp2d / selectedKontrak.nilai) *
                              100}{" "}
                            %)
                          </span>
                        )}
                      </th>
                      <td>
                        <select
                          className="select select-xs select-bordered"
                          onChange={(e) => {
                            console.log(e.currentTarget.value);
                            setDataTahap1(JSON.parse(e.currentTarget.value));
                          }}
                        >
                          <option value={JSON.stringify([])}>
                            Pilih No SP2D
                          </option>
                          {dataSP2D
                            .filter(
                              (e) =>
                                e.no_sp2d != null &&
                                dataTahap2.no_sp2d != e.no_sp2d &&
                                dataTahap3.no_sp2d != e.no_sp2d &&
                                dataTahap4.no_sp2d != e.no_sp2d
                            )
                            .map((d, k) => (
                              <option key={k} value={JSON.stringify(d)}>
                                {d.no_sp2d} ({dateToTable(d.tgl_sp2d)})
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="max-w-[50vw]">{dataTahap1.keterangan}</td>
                      <td>
                        {Object.keys(dataTahap1).length > 0 &&
                          NumberFormat(dataTahap1.nilai_sp2d)}
                      </td>
                    </tr>
                  )}

                  {dataTahap1.nilai_sp2d < selectedKontrak.nilai &&
                    dataSP2D.filter((e) => e.no_sp2d != null).length > 0 && (
                      <tr>
                        <th>
                          Tahap II <br />
                          {Object.keys(dataTahap2).length > 0 && (
                            <span>
                              (
                              {((dataTahap1.nilai_sp2d +
                                dataTahap2.nilai_sp2d) /
                                selectedKontrak.nilai) *
                                100}
                              %)
                            </span>
                          )}
                        </th>
                        <td>
                          <select
                            className="select select-xs select-bordered"
                            onChange={(e) => {
                              console.log(e.currentTarget.value);
                              setDataTahap2(JSON.parse(e.currentTarget.value));
                            }}
                          >
                            <option value={JSON.stringify([])}>
                              Pilih No SP2D
                            </option>
                            {dataSP2D
                              .filter(
                                (e) =>
                                  e.no_sp2d != null &&
                                  dataTahap1.no_sp2d != e.no_sp2d &&
                                  dataTahap3.no_sp2d != e.no_sp2d &&
                                  dataTahap4.no_sp2d != e.no_sp2d
                              )
                              .map((d, k) => (
                                <option key={k} value={JSON.stringify(d)}>
                                  {d.no_sp2d} ({dateToTable(d.tgl_sp2d)})
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="max-w-[50vw]">
                          {dataTahap2.keterangan}
                        </td>
                        <td>
                          {Object.keys(dataTahap2).length > 0 &&
                            NumberFormat(dataTahap2.nilai_sp2d)}
                        </td>
                      </tr>
                    )}

                  {dataTahap1.nilai_sp2d + dataTahap2.nilai_sp2d <
                    selectedKontrak.nilai &&
                    dataSP2D.filter((e) => e.no_sp2d != null).length > 0 && (
                      <tr>
                        <th>
                          Tahap III <br />
                          {Object.keys(dataTahap3).length > 0 && (
                            <span>
                              (
                              {((dataTahap1.nilai_sp2d +
                                dataTahap2.nilai_sp2d +
                                dataTahap3.nilai_sp2d) /
                                selectedKontrak.nilai) *
                                100}
                              %)
                            </span>
                          )}
                        </th>
                        <td>
                          <select
                            className="select select-xs select-bordered"
                            onChange={(e) => {
                              console.log(e.currentTarget.value);
                              setDataTahap3(JSON.parse(e.currentTarget.value));
                            }}
                          >
                            <option value={JSON.stringify([])}>
                              Pilih No SP2D
                            </option>
                            {dataSP2D
                              .filter(
                                (e) =>
                                  e.no_sp2d != null &&
                                  dataTahap1.no_sp2d != e.no_sp2d &&
                                  dataTahap2.no_sp2d != e.no_sp2d &&
                                  dataTahap4.no_sp2d != e.no_sp2d
                              )
                              .map((d, k) => (
                                <option key={k} value={JSON.stringify(d)}>
                                  {d.no_sp2d} ({dateToTable(d.tgl_sp2d)})
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="max-w-[50vw]">
                          {dataTahap3.keterangan}
                        </td>
                        <td>
                          {Object.keys(dataTahap3).length > 0 &&
                            NumberFormat(dataTahap3.nilai_sp2d)}
                        </td>
                      </tr>
                    )}

                  {dataTahap1.nilai_sp2d +
                    dataTahap2.nilai_sp2d +
                    dataTahap3.nilai_sp2d <
                    selectedKontrak.nilai &&
                    dataSP2D.filter((e) => e.no_sp2d != null).length > 0 && (
                      <tr>
                        <th>
                          Tahap IV <br />
                          {Object.keys(dataTahap4).length > 0 && (
                            <span>
                              (
                              {((dataTahap1.nilai_sp2d +
                                dataTahap2.nilai_sp2d +
                                dataTahap3.nilai_sp2d +
                                dataTahap4.nilai_sp2d) /
                                selectedKontrak.nilai) *
                                100}
                              %)
                            </span>
                          )}
                        </th>
                        <td>
                          <select
                            className="select select-xs select-bordered"
                            onChange={(e) => {
                              console.log(e.currentTarget.value);
                              setDataTahap4(JSON.parse(e.currentTarget.value));
                            }}
                          >
                            <option value={JSON.stringify([])}>
                              Pilih No SP2D
                            </option>
                            {dataSP2D
                              .filter(
                                (e) =>
                                  e.no_sp2d != null &&
                                  dataTahap1.no_sp2d != e.no_sp2d &&
                                  dataTahap2.no_sp2d != e.no_sp2d &&
                                  dataTahap3.no_sp2d != e.no_sp2d
                              )
                              .map((d, k) => (
                                <option key={k} value={JSON.stringify(d)}>
                                  {d.no_sp2d} ({dateToTable(d.tgl_sp2d)})
                                </option>
                              ))}
                          </select>
                        </td>
                        <td className="max-w-[50vw]">
                          {dataTahap4.keterangan}
                        </td>
                        <td>
                          {Object.keys(dataTahap4).length > 0 &&
                            NumberFormat(dataTahap4.nilai_sp2d)}
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div> */}

            <button
              className="btn btn-sm btn-success self-end"
              onClick={() => btnSimpan()}
            >
              <FaSave /> Tambah
            </button>
          </>
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
                  <td className="whitespace-nowrap">
                    {" "}
                    {NumberFormat(d.nilai)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
