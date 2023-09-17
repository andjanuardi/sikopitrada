import ModalWindow from "@/components/layout/modal";
import Tambah from "@/components/layout/realisasi/tambah";
import NumberFormat from "@/functions/numberformat";
import useFetch from "@/hooks/useFetch";
import useSimda from "@/hooks/useSimda";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

export default function Realisasi() {
  const session = useSession();
  const { data: dataOPD } = useFetch("/api/opd", "POST", { s: true });

  const { data: dataKontrak, getData: getDataKontrak } = useSimda(
    "/api/kontrak",
    "POST",
    {
      db: "DB2023",
      tahun: session.data.ta,
      kd_urusan: session.data.kd_urusan,
      kd_bidang: session.data.kd_bidang,
      kd_unit: session.data.kd_unit,
      kd_sub: session.data.kd_sub,
    }
  );

  const [dataSumberDana, setDataSumberDana] = useState([]);
  const [selectedOPD, setSelectedOPD] = useState(session.data.id_opd);
  const [selectedSdana, setSelectedSdana] = useState([]);
  const [sdana, setsdana] = useState([]);
  const [jdana, setjdana] = useState([]);
  const [bidang, setbidang] = useState([]);
  const [openModal, setopenModal] = useState(false);

  useEffect(() => {
    getDataSumberDana(selectedOPD);
    const selectedOPDData = dataOPD.filter(
      (e) => e.id === parseInt(selectedOPD)
    )[0];
    if (selectedOPD != 0 && selectedOPDData) {
      getDataKontrak({
        db: "DB2023",
        tahun: session.data.ta,
        kd_urusan: selectedOPDData.kd_urusan,
        kd_bidang: selectedOPDData.kd_bidang,
        kd_unit: selectedOPDData.kd_unit,
        kd_sub: selectedOPDData.kd_sub,
      });
    }
  }, [selectedOPD]);

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

  async function getDataSumberDana(id) {
    let body;
    if (id === "0") {
      body = JSON.stringify({ sdana: true });
    } else {
      body = JSON.stringify({ opd: true, id: id });
    }
    await fetch("/api/sumberdana", {
      method: "POST",
      body: body,
    })
      .then((e) => e.json())
      .then((data) => {
        setDataSumberDana(data);
      });
  }

  return (
    <div className="lg:p-3 py-2  ">
      <ModalWindow
        open={openModal}
        content={
          <Tambah
            sdana={selectedSdana}
            setopenModal={setopenModal}
            dataKontrak={dataKontrak}
          />
        }
      />
      <div className="flex flex-col gap-2">
        <div className="join w-full">
          <label className="btn btn-sm join-item">Nama OPD</label>
          <select
            className="select select-bordered join-item select-sm w-full lg:flex-1"
            onChange={(e) => setSelectedOPD(e.currentTarget.value)}
            value={selectedOPD}
          >
            <option value={0}>SEMUA OPD</option>
            {dataOPD &&
              dataOPD
                // .filter((e) => e.id === session.data.id_opd)
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
            onChange={(e) => setSelectedOPD(e.currentTarget.value)}
            value={selectedOPD}
          >
            {sdana &&
              sdana
                // .filter((e) => e.id === session.data.id_opd)
                .map((d, k) => (
                  <option key={k} value={d.id}>
                    {d.nama_sdana}
                  </option>
                ))}
          </select>
          <label className="btn btn-sm join-item normal-case">
            Rp. {NumberFormat(dataSumberDana.reduce((a, b) => a + b.nilai, 0))}
            ,-
          </label>
        </div>
      </div>

      <ul className=" menu lg:menu-sm menu-xs  ">
        {sdana.map((d, k) => (
          <li key={k}>
            <details>
              <summary className="flex font-bold">
                <div className="flex-1">{d.nama_sdana}</div>
                <div>
                  {NumberFormat(
                    dataSumberDana
                      .filter((e) => e.id_sdana === d.id_sdana)
                      .reduce((a, b) => a + b.nilai, 0)
                  )}
                </div>
              </summary>
              <ul>
                {jdana
                  .filter((e) => e.id_sdana === d.id_sdana)
                  .map((d2, k2) => (
                    <li key={k2}>
                      <details>
                        <summary className="flex">
                          <div className="flex-1">{d2.nama_jdana}</div>
                          <div>
                            {NumberFormat(
                              dataSumberDana
                                .filter((e) => e.id_jdana === d2.id_jdana)
                                .reduce((a, b) => a + b.nilai, 0)
                            )}
                          </div>
                        </summary>
                        <ul>
                          {bidang
                            .filter((e) => e.id_jdana === d2.id_jdana)
                            .map((d3, k3) => (
                              <li key={k3}>
                                <details>
                                  <summary className="flex">
                                    <div className="flex-1">
                                      {d3.nama_bidang}
                                    </div>
                                    <div>
                                      {NumberFormat(
                                        dataSumberDana
                                          .filter(
                                            (e) => e.id_bidang === d3.id_bidang
                                          )
                                          .reduce((a, b) => a + b.nilai, 0)
                                      )}
                                    </div>
                                  </summary>
                                  <ul>
                                    {dataSumberDana
                                      .filter(
                                        (e) => e.id_bidang === d3.id_bidang
                                      )
                                      .map((d4, k4) => (
                                        <>
                                          <li key={k4}>
                                            <details>
                                              <summary className="flex">
                                                <div className="flex-1">
                                                  {d4.nama}
                                                </div>
                                                <div>
                                                  {NumberFormat(d4.nilai)}
                                                </div>
                                              </summary>
                                              <ul>
                                                <div className="overflow-x-auto max-w-[84vw] sm:max-w-[90vw] lg:max-w-none -ml-[6rem]">
                                                  <table className="table table-xs lg:table-sm bg-base-200 rounded-none my-2">
                                                    <thead className="bg-black/40 text-white">
                                                      <tr>
                                                        <th rowSpan={2}>
                                                          Rincian Kegiatan
                                                        </th>
                                                        <th rowSpan={2}>
                                                          Judul Nomor Tanggal
                                                          Dokumen
                                                        </th>
                                                        <th rowSpan={2}>
                                                          Nilai Kontrak
                                                        </th>
                                                        <th rowSpan={2}>
                                                          Pelaksana
                                                        </th>
                                                        <th
                                                          colSpan={4}
                                                          className="text-center"
                                                        >
                                                          Penyaluran
                                                        </th>
                                                        <th rowSpan={2}>
                                                          Keterangan
                                                        </th>
                                                        {selectedOPD != 0 && (
                                                          <th
                                                            className="text-right"
                                                            rowSpan={2}
                                                          >
                                                            <button
                                                              className=" btn btn-sm"
                                                              onClick={() => {
                                                                setopenModal(
                                                                  true
                                                                );
                                                                setSelectedSdana(
                                                                  d4
                                                                );
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
                                                      <tr>
                                                        <td>OK</td>
                                                        <td>OK</td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </ul>
                                            </details>
                                          </li>
                                        </>
                                      ))}
                                  </ul>
                                </details>
                              </li>
                            ))}
                        </ul>
                      </details>
                    </li>
                  ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
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
