import { closeModal, showModal } from "@/functions/swal";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  BiCheck,
  BiPlusCircle,
  BiSave,
  BiSolidPencil,
  BiTrash,
} from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import Swal from "sweetalert2";

import { getSession } from "next-auth/react";
import useFetch from "@/hooks/useFetch";

export default function Pengaturan() {
  const { data: initialData, getData } = useFetch("/api/simda", "POST");
  const [data, setData] = useState([]);

  useEffect(() => {
    getData({ s: true });
  }, []);
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  async function hapus(data) {
    Swal.fire({
      title: "Hapus",
      text: "Apakah anda ingin menghapus data ini ?",
      icon: "question",
      showCloseButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then(async (e) => {
      if (e.isConfirmed) {
        await fetch("/api/simda", {
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

  function cari(val) {
    setData(
      initialData.filter((d) => {
        return JSON.stringify(d).toLowerCase().indexOf(val.toLowerCase()) >= 0;
      })
    );
  }

  return (
    <div className="grid gap-3">
      <div className="join flex ">
        <input
          className=" flex-1 join-item input input-bordered "
          placeholder="Cari.."
          onChange={(e) => cari(e.currentTarget.value)}
        />
        <button
          className=" join-item btn btn-success"
          onClick={() => showModal(<Tambah getData={getData} />)}
        >
          <BiPlusCircle />
          Tambah
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Tahun Anggaran</th>
              <th>Database SIMDA</th>
              <th className="text-right">Aksi</th>
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
                  <td>{d.ta}</td>
                  <td>{d.db}</td>
                  <td className="text-right">
                    <div className="join">
                      <button
                        className="btn btn-sm join-item"
                        onClick={() =>
                          showModal(<Ubah getData={getData} initialData={d} />)
                        }
                      >
                        <BiSolidPencil />
                      </button>
                      <button
                        className="btn btn-sm join-item"
                        onClick={() => hapus(d)}
                      >
                        <BiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Tambah({ getData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[30vw] mb-6 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah</div>
        <div>
          <button className="btn btn-sm btn-ghost" onClick={() => closeModal()}>
            <TiTimes />
          </button>
        </div>
      </div>

      <Formik
        initialValues={{
          i: true,
          id: null,
          ta: new Date().getFullYear(),
          db: "",
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/simda", {
            method: "POST",
            body: JSON.stringify(values),
          })
            .then((e) => e.json())
            .then((data) => {
              if (data) {
                Swal.fire("Sukses", "Data berhasil disimpan", "success");
              } else {
                Swal.fire("Gagal", "Terjadi kesalahan", "error");
              }
              getData({ s: true });
              setLoading(false);
            });
        }}
      >
        <Form>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tahun Anggaran</span>
              </label>
              <Field
                required
                type="number"
                min={1945}
                max={9999}
                placeholder="Masukkan nama tahun anggaran"
                className="input input-bordered input-sm"
                name="ta"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama Database</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama database"
                className="input input-bordered input-sm"
                name="db"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button disabled={loading} className="btn btn-sm btn-success">
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <BiSave />
              )}
              Simpan
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function Ubah({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Ubah</div>
        <div>
          <button className="btn btn-sm btn-ghost" onClick={() => closeModal()}>
            <TiTimes />
          </button>
        </div>
      </div>

      <Formik
        initialValues={{
          e: true,
          id: initialData.id,
          ta: initialData.ta,
          db: initialData.db,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/simda", {
            method: "POST",
            body: JSON.stringify(values),
          })
            .then((e) => e.json())
            .then((data) => {
              if (data) {
                Swal.fire("Sukses", "Data berhasil diubah", "success");
              } else {
                Swal.fire("Gagal", "Terjadi kesalahan", "error");
              }
              getData({ s: true });
              setLoading(false);
            });
        }}
      >
        <Form>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Tahun Anggaran</span>
              </label>
              <Field
                required
                type="number"
                min={1945}
                max={9999}
                placeholder="Masukkan nama tahun anggaran"
                className="input input-bordered input-sm"
                name="ta"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama Database</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama database"
                className="input input-bordered input-sm"
                name="db"
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button disabled={loading} className="btn btn-sm btn-success">
              {loading ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <BiSave />
              )}
              Simpan
            </button>
          </div>
        </Form>
      </Formik>
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
