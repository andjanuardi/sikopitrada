import { closeModal, showModal } from "@/functions/swal";
import useFetch from "@/hooks/useFetch";
import { useEffect, useRef, useState } from "react";
import { BiPlus, BiPlusCircle, BiRefresh, BiSave } from "react-icons/bi";
import Swal from "sweetalert2";
import { TiTimes } from "react-icons/ti";
import { Field, Form, Formik } from "formik";
import { FaTrash } from "react-icons/fa";

export default function OPD() {
  const session = useSession();

  const { data: initialData, getData } = useFetch("/api/opd", "POST", {
    s: true,
  });
  const { data: dataOPDSimda } = useSimda(`/api/unit`, "POST", {
    db: session.data.db,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    getData({ s: true });
  }, []);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  function cari(val) {
    setData(
      initialData.filter((d) => {
        return JSON.stringify(d).toLowerCase().indexOf(val.toLowerCase()) >= 0;
      })
    );
  }

  async function hapus(data) {
    Swal.fire({
      title: "Hapus",
      text: `Apakah anda ingin menghapus data ini ${data.nm_sub_unit} ?`,
      icon: "question",
      showCloseButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then(async (e) => {
      if (e.isConfirmed) {
        await fetch("/api/opd", {
          method: "POST",
          body: JSON.stringify({ d: true, id: data.id }),
        })
          .then((e) => e.json())
          .then((data) => {
            if (data) {
              Swal.fire("Sukses", "Data berhasil disimpan", "success");
            } else {
              Swal.fire("Gagal", "Terjadi kesalahan", "error");
            }
            getData({ s: true });
          });
      }
    });
  }

  return (
    <div className="grid gap-3">
      <span className="p-2 font-bold">
        Daftar Nama OPD Pengguna Dana Transfer
      </span>
      <div className="join flex ">
        <input
          className=" flex-1 join-item input input-bordered "
          placeholder="Cari.."
          onChange={(e) => cari(e.currentTarget.value)}
        />

        <button
          className=" join-item btn btn-error text-white"
          onClick={() =>
            showModal(<Tambah getData={getData} dataOPDSimda={dataOPDSimda} />)
          }
        >
          <BiPlusCircle className=" text-xl" />
          Tambah OPD
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Kode</th>
              <th>OPD</th>
              <th className="text-right"></th>
            </tr>
          </thead>
          <tbody>
            {!data ||
              (data.length <= 0 && (
                <tr>
                  <td colSpan={99} className=" text-center">
                    Tidak ada data
                  </td>
                </tr>
              ))}
            {data &&
              data.map((d, k) => (
                <tr key={k}>
                  <td>{k + 1}</td>
                  <td>
                    {d.kd_urusan}.{d.kd_bidang}.{d.kd_unit}.{d.kd_sub}
                  </td>
                  <td>{d.nm_sub_unit}</td>
                  <td className="text-right" onClick={() => hapus(d)}>
                    <button className="btn btn-sm btn-error text-white">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tambah({ getData, dataOPDSimda }) {
  const [txtCari, setTxtCari] = useState("");

  function cari(d, text) {
    return JSON.stringify(d).toLowerCase().indexOf(text.toLowerCase()) >= 0;
  }
  async function btnTambah(d) {
    const data = {
      singkron: true,
      kd_urusan: d.kd_urusan,
      kd_bidang: d.kd_bidang,
      kd_unit: d.kd_unit,
      kd_sub: d.kd_sub,
      nm_sub_unit: d.nm_sub_unit,
    };
    await fetch("/api/opd", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((e) => e.json())
      .then((data) => {
        if (data) {
          Swal.fire("Sukses", "Data berhasil disimpan", "success");
        } else {
          Swal.fire("Gagal", "Terjadi kesalahan", "error");
        }
        getData({ s: true });
      });
  }
  return (
    <div className="min-w-[50vw]  mb-6 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah</div>
        <div>
          <button className="btn btn-sm btn-ghost" onClick={() => closeModal()}>
            <TiTimes />
          </button>
        </div>
      </div>
      <input
        className="input input-sm input-bordered"
        placeholder="Cari.."
        value={txtCari}
        onChange={(e) => setTxtCari(e.currentTarget.value)}
      />
      <div className="overflow-x-auto max-h-[65dvh]">
        <table className="table table-pin-rows table-xs ">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Nama OPD</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataOPDSimda &&
              dataOPDSimda
                .filter((e) => cari(e, txtCari))
                .map((d, k) => (
                  <tr key={k}>
                    <td>
                      {d.kd_urusan}.{d.kd_bidang}.{d.kd_sub}.{d.kd_unit}
                    </td>
                    <td>{d.nm_sub_unit}</td>
                    <td className="text-right">
                      <button
                        onClick={() => btnTambah(d)}
                        className="btn btn-sm"
                      >
                        Pilih
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import { getSession, useSession } from "next-auth/react";
import useSimda from "@/hooks/useSimda";
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
