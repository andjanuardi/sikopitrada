import { dateNow, dateToSQL, dateToTable } from "@/functions/dateformat";
import { closeModal, showModal } from "@/functions/swal";
import { Field, Form, Formik } from "formik";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { BiPlusCircle, BiSave, BiSolidPencil, BiTrash } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import Swal from "sweetalert2";

export default function BackEnd() {
  const [initialData, setInitialData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await fetch("/api/penandatangan", {
      method: "POST",
      body: JSON.stringify({ s: true }),
    })
      .then((e) => e.json())
      .then((data) => {
        setInitialData(data);
        setData(data);
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
        await fetch("/api/penandatangan", {
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
    <div className="grid grid-cols-1 gap-3">
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
              <th>Nama/Nip/Pangkat/Golongan</th>
              <th>Jabatan</th>
              <th>Aktif</th>
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
                    <strong>{d.nama}</strong>
                    <br />
                    {d.nip}
                    <br />
                    {d.pangkat} ({d.golongan})
                  </td>
                  <td>{d.jabatan}</td>
                  <td>{d.aktif ? "Aktif" : "Tidak Aktif"}</td>
                  <td>
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
    <div className="min-w-[50vw] mb-6 p-5 flex flex-col gap-4">
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
          nama: "",
          jabatan: "",
          nip: "",
          pangkat: "",
          golongan: "",
          aktif: 0,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/penandatangan", {
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
                <span className="label-text">nama</span>
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
                <span className="label-text">jabatan</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="jabatan"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">nip</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="nip"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">pangkat</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="pangkat"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">golongan</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="golongan"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">aktif</span>
              </label>
              <Field
                as="select"
                required
                placeholder="Masukkan nama"
                className="select select-bordered select-sm"
                name="aktif"
              >
                <option value={1}>Aktif</option>
                <option value={0}>Non Aktif</option>
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

function Ubah({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[50vw] mb-6 p-5 flex flex-col gap-4">
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
          nama: initialData.nama,
          jabatan: initialData.jabatan,
          nip: initialData.nip,
          pangkat: initialData.pangkat,
          golongan: initialData.golongan,
          aktif: initialData.aktif,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/penandatangan", {
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
                <span className="label-text">nama</span>
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
                <span className="label-text">jabatan</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="jabatan"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">nip</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="nip"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">pangkat</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="pangkat"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">golongan</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="golongan"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">aktif</span>
              </label>
              <Field
                as="select"
                required
                placeholder="Masukkan nama"
                className="select select-bordered select-sm"
                name="aktif"
              >
                <option value={1}>Aktif</option>
                <option value={0}>Non Aktif</option>
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
              Ubah
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
