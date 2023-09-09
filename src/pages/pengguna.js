import { closeModal, showModal } from "@/functions/swal";
import useFetch from "@/hooks/useFetch";

import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  BiKey,
  BiPlusCircle,
  BiSave,
  BiSolidPencil,
  BiTrash,
} from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import Swal from "sweetalert2";

export default function Pengguna() {
  const [data, setData] = useState([]);
  const { data: dataOPD } = useFetch("/api/opd", "POST", {
    s: true,
  });
  const { data: initialData, getData } = useFetch("/api/user", "POST", {
    s: true,
  });

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  function gantiPass(id) {
    Swal.fire({
      title: "Ganti Password ?",
      text: "Masukkan password baru",
      input: "password",
      icon: "question",
      inputValidator: (val) => {
        if (!val) {
          return "Data tidak boleh kosong ";
        }
      },
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
    }).then(async (d) => {
      if (d.isConfirmed) {
        await fetch("/api/user", {
          method: "POST",
          body: JSON.stringify({
            p: true,
            id: id,
            pass: d.value,
          }),
        })
          .then((e) => e.json())
          .then((data) => {
            if (data) {
              data;
              Swal.fire("Sukses", "Password berhasil di ubah", "success");
              getData();
            } else {
              Swal.fire("Gagal", "Oops terjadi kesalahan", "error");
            }
          });
      }
    });
  }

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
        await fetch("/api/user", {
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
            getData();
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
    <div className="flex flex-col gap-3">
      <div className="join flex ">
        <input
          className=" flex-1 join-item input input-bordered "
          placeholder="Cari.."
          onChange={(e) => cari(e.currentTarget.value)}
        />
        <button
          className=" join-item btn btn-success"
          onClick={() =>
            showModal(<Tambah getData={getData} dataOPD={dataOPD} />)
          }
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
              <th>OPD</th>
              <th>Nama / NIP</th>
              <th>Nama Pengguna</th>
              <th>Jabatan</th>
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
                <tr>
                  <td>{k + 1}</td>
                  <td>{d.nm_sub_unit}</td>
                  <td>
                    {d.nama}
                    <br />
                    <small>NIP. {d.nip}</small>
                  </td>
                  <td>{d.user}</td>
                  <td>
                    {d.jabatan === "1" && "Administrator"}
                    {d.jabatan === "2" && "Operator"}
                    {d.jabatan === "3" && "Auditor"}
                  </td>

                  <td className="text-right">
                    <div className="join">
                      <button
                        className="btn btn-sm join-item btn-primary"
                        onClick={() => gantiPass(d.id)}
                      >
                        <BiKey />
                      </button>
                      <button
                        className="btn btn-sm join-item"
                        onClick={() =>
                          showModal(
                            <Ubah
                              getData={getData}
                              initialData={d}
                              dataOPD={dataOPD}
                            />
                          )
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

function Tambah({ getData, dataOPD }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
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
          id_opd: 1,
          nama: "",
          nip: "",
          user: "",
          pass: "",
          jabatan: 2,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/user", {
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
              getData();
              setLoading(false);
            });
        }}
      >
        <Form>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="nama"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">NIP</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nip"
                className="input input-bordered input-sm"
                name="nip"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama Pengguna</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama pengguna"
                className="input input-bordered input-sm"
                name="user"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Field
                required
                type="password"
                placeholder="Masukkan password"
                className="input input-bordered input-sm"
                name="pass"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Jabatan</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Pilih jabatan"
                className="select select-bordered select-sm"
                name="jabatan"
              >
                <option value={1}>Administrator</option>
                <option value={2}>Operator</option>
                <option value={3}>Auditor</option>
              </Field>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama OPD</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Pilih OPD"
                className="select select-bordered select-sm"
                name="id_opd"
              >
                {dataOPD &&
                  dataOPD.map((d, k) => (
                    <option value={`${d.id}`}>{d.nm_sub_unit}</option>
                  ))}
              </Field>
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

function Ubah({ getData, initialData, dataOPD }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
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
          id_opd: initialData.id_opd,
          nama: initialData.nama,
          nip: initialData.nip,
          user: initialData.user,
          jabatan: initialData.jabatan,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/user", {
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
              getData();
              setLoading(false);
            });
        }}
      >
        <Form>
          <div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="nama"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">NIP</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nip"
                className="input input-bordered input-sm"
                name="nip"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama Pengguna</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama pengguna"
                className="input input-bordered input-sm"
                name="user"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Jabatan</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Pilih jabatan"
                className="select select-bordered select-sm"
                name="jabatan"
              >
                <option value={1}>Administrator</option>
                <option value={2}>Operator</option>
                <option value={3}>Auditor</option>
              </Field>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nama OPD</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Pilih OPD"
                className="select select-bordered select-sm"
                name="id_opd"
              >
                {dataOPD &&
                  dataOPD.map((d, k) => (
                    <option value={`${d.id}`}>{d.nm_sub_unit}</option>
                  ))}
              </Field>
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

import { getSession } from "next-auth/react";
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
