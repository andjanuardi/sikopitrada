import { FaPlusCircle } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { BiPlusCircle, BiSave, BiSolidPencil, BiTrash } from "react-icons/bi";
import { TiTimes } from "react-icons/ti";
import Swal from "sweetalert2";
import NumberFormat from "@/functions/numberformat";
import { getSession, useSession } from "next-auth/react";
import { closeModal, showModal } from "@/functions/swal";
import useFetch from "@/hooks/useFetch";

export default function Sumberdana() {
  const session = useSession();
  const { data: dataOPD } = useFetch("/api/opd", "POST", {
    s: true,
  });

  const { data, getData } = useFetch("/api/sumberdana", "POST", {
    s: true,
  });

  async function hapus(data, level) {
    let body = {};
    if (level === 0) {
      body = { dsdana: true, id: data.id };
    }
    if (level === 1) {
      body = { djdana: true, id: data.id };
    }
    if (level === 2) {
      body = { dbidang: true, id: data.id };
    }
    if (level === 3) {
      body = { d: true, id: data.id };
    }

    Swal.fire({
      title: "Hapus",
      text: `Apakah anda ingin menghapus data ${data.nama} ?`,
      icon: "question",
      showCloseButton: true,
      cancelButtonText: "Batal",
      confirmButtonText: "Hapus",
    }).then(async (e) => {
      if (e.isConfirmed) {
        await fetch("/api/sumberdana", {
          method: "POST",
          body: JSON.stringify(body),
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

  return (
    <div className="overflow-x-auto ">
      <table className="table table-xs ">
        {/* head */}
        <thead>
          <tr>
            <th>Sumber Dana / Jenis Dana / Bidang / Sub Bidang</th>
            <th className="min-w-[10rem]">OPD</th>
            <th>Nilai</th>
            <th className="text-right ">
              <button
                className=" join-item btn btn-sm text-white btn-success "
                onClick={() =>
                  showModal(<TambahSDana getData={getData} session={session} />)
                }
              >
                <BiPlusCircle className="text-lg" />
                <span className="hidden lg:block">Tambah </span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {!data ||
            (data.length <= 0 && (
              <tr className="hover">
                <td colSpan={99} className=" text-center">
                  Tidak ada data
                </td>
              </tr>
            ))}
          {data &&
            data
              .filter((e) => e.id_sdana === 0)
              .map((d, k) => (
                <>
                  <tr className="hover bg-slate-100/50 font-extrabold">
                    <td>{d.nama}</td>
                    <td></td>
                    <td>
                      {NumberFormat(
                        data
                          .filter((e) => e.id_sdana === d.id)
                          .reduce((a, b) => a + b.nilai, 0)
                      )}
                    </td>
                    <td className="text-right">
                      <div className="join">
                        <button
                          className="btn btn-sm join-item"
                          onClick={() =>
                            showModal(
                              <TambahJDana getData={getData} initialData={d} />
                            )
                          }
                        >
                          <FaPlusCircle />
                        </button>
                        <button
                          className="btn btn-sm join-item"
                          onClick={() =>
                            showModal(
                              <UbahSDana getData={getData} initialData={d} />
                            )
                          }
                        >
                          <BiSolidPencil />
                        </button>
                        <button
                          className="btn btn-sm join-item"
                          onClick={() => hapus(d, 0)}
                        >
                          <BiTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {data &&
                    data
                      .filter((e) => e.id_sdana === d.id && e.id_jdana === 0)
                      .map((d2, k2) => (
                        <>
                          <tr key={k2} className="hover font-bold ">
                            <td>{d2.nama}</td>
                            <td></td>
                            <td>
                              {NumberFormat(
                                data
                                  .filter(
                                    (e) =>
                                      e.id_sdana === d.id &&
                                      e.id_jdana === d2.id
                                  )
                                  .reduce((a, b) => a + b.nilai, 0)
                              )}
                            </td>
                            <td className="text-right">
                              <div className="join">
                                <button
                                  className="btn btn-sm join-item"
                                  onClick={() =>
                                    showModal(
                                      <TambahBidang
                                        getData={getData}
                                        initialData={d2}
                                      />
                                    )
                                  }
                                >
                                  <FaPlusCircle />
                                </button>
                                <button
                                  className="btn btn-sm join-item"
                                  onClick={() =>
                                    showModal(
                                      <UbahJDana
                                        getData={getData}
                                        initialData={d2}
                                      />
                                    )
                                  }
                                >
                                  <BiSolidPencil />
                                </button>
                                <button
                                  className="btn btn-sm join-item"
                                  onClick={() => hapus(d2, 1)}
                                >
                                  <BiTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {data &&
                            data
                              .filter(
                                (e) =>
                                  e.id_sdana === d.id &&
                                  e.id_jdana === d2.id &&
                                  e.id_bidang === 0
                              )
                              .map((d3, k3) => (
                                <>
                                  <tr key={k3} className="hover font-semibold">
                                    <td>{d3.nama}</td>
                                    <td></td>
                                    <td>
                                      {NumberFormat(
                                        data
                                          .filter(
                                            (e) =>
                                              e.id_sdana === d.id &&
                                              e.id_jdana === d2.id &&
                                              e.id_bidang === d3.id
                                          )
                                          .reduce((a, b) => a + b.nilai, 0)
                                      )}
                                    </td>
                                    <td className="text-right">
                                      <div className="join">
                                        <button
                                          className="btn btn-sm join-item"
                                          onClick={() =>
                                            showModal(
                                              <TambahSBidang
                                                getData={getData}
                                                initialData={d3}
                                                dataOPD={dataOPD}
                                              />
                                            )
                                          }
                                        >
                                          <FaPlusCircle />
                                        </button>
                                        <button
                                          className="btn btn-sm join-item"
                                          onClick={() =>
                                            showModal(
                                              <UbahBidang
                                                getData={getData}
                                                initialData={d3}
                                              />
                                            )
                                          }
                                        >
                                          <BiSolidPencil />
                                        </button>
                                        <button
                                          className="btn btn-sm join-item"
                                          onClick={() => hapus(d3, 2)}
                                        >
                                          <BiTrash />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                  {data &&
                                    data
                                      .filter(
                                        (e) =>
                                          e.id_sdana === d.id &&
                                          e.id_jdana === d2.id &&
                                          e.id_bidang === d3.id
                                      )
                                      .map((d4, k4) => (
                                        <>
                                          <tr className="hover">
                                            <td className="pl-4">{d4.nama}</td>
                                            <td>{d4.nm_sub_unit}</td>
                                            <td>{NumberFormat(d4.nilai)}</td>
                                            <td className="text-right">
                                              <div className="join">
                                                <button
                                                  className="btn btn-sm join-item"
                                                  onClick={() =>
                                                    showModal(
                                                      <UbahSBidang
                                                        getData={getData}
                                                        initialData={d4}
                                                        dataOPD={dataOPD}
                                                      />
                                                    )
                                                  }
                                                >
                                                  <BiSolidPencil />
                                                </button>
                                                <button
                                                  className="btn btn-sm join-item"
                                                  onClick={() => hapus(d4, 3)}
                                                >
                                                  <BiTrash />
                                                </button>
                                              </div>
                                            </td>
                                          </tr>
                                        </>
                                      ))}
                                </>
                              ))}
                        </>
                      ))}
                </>
              ))}
        </tbody>
      </table>
    </div>
  );
}

function TambahSDana({ getData, session }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah Sumber Dana</div>
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
          id_sdana: 0,
          id_jdana: 0,
          id_bidang: 0,
          id_opd: 0,
          nama: "",
          nilai: 0,
          ta: session.data.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Sumber Dana</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama sumber dana"
                className="input input-bordered input-sm"
                name="nama"
              />
            </div>
            {/* <div className="form-control">
              <label className="label">
                <span className="label-text">nilai</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="nilai"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">ta</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="ta"
              />
            </div> */}
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

function UbahSDana({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Ubah Sumber Dana</div>
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id_jdana,
          id_bidang: initialData.id_bidang,
          id_opd: initialData.id_opd,
          nama: initialData.nama,
          nilai: initialData.nilai,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Sumber Dana</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama sumber dana"
                className="input input-bordered input-sm"
                name="nama"
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
              Ubah
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function TambahJDana({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah Jenis Dana</div>
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
          id_sdana: initialData.id,
          id_jdana: 0,
          id_bidang: 0,
          id_opd: 0,
          nama: "",
          nilai: 0,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Jenis Dana</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama jenis dana"
                className="input input-bordered input-sm"
                name="nama"
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

function UbahJDana({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Ubah Jenis Dana</div>
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id_jdana,
          id_bidang: initialData.id_bidang,
          id_opd: initialData.id_opd,
          nama: initialData.nama,
          nilai: initialData.nilai,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Jenis Dana</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama jenis dana"
                className="input input-bordered input-sm"
                name="nama"
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
              Ubah
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function TambahBidang({ getData, initialData }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah Bidang</div>
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id,
          id_bidang: 0,
          id_opd: 0,
          nama: "",
          nilai: 0,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Bidang</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama Bidang"
                className="input input-bordered input-sm"
                name="nama"
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

function UbahBidang({ getData, initialData }) {
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id_jdana,
          id_bidang: initialData.id_bidang,
          id_opd: initialData.id_opd,
          nama: initialData.nama,
          nilai: initialData.nilai,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Bidang</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama bidang"
                className="input input-bordered input-sm"
                name="nama"
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
              Ubah
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

function TambahSBidang({ getData, initialData, dataOPD }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Tambah Sub Bidang</div>
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id_jdana,
          id_bidang: initialData.id,
          id_opd: 0,
          nama: "",
          nilai: 0,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          if (values.id_opd <= 0) {
            alert("Silahkan Pilih OPD");
            return;
          }
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Sub Bidang</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama sub bidang"
                className="input input-bordered input-sm"
                name="nama"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pilih OPD</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="id_opd"
              >
                <option value={0}>Pilih OPD</option>
                {dataOPD.map((d, k) => (
                  <option key={k} value={d.id}>
                    {d.nm_sub_unit}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nilai</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nilai"
                className="input input-bordered input-sm"
                name="nilai"
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

function UbahSBidang({ getData, initialData, dataOPD }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="min-w-[20vw] mb-6 p-1 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-md font-bold">Ubah Sub Bidang</div>
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
          id_sdana: initialData.id_sdana,
          id_jdana: initialData.id_jdana,
          id_bidang: initialData.id_bidang,
          id_opd: initialData.id_opd,
          nama: initialData.nama,
          nilai: initialData.nilai,
          ta: initialData.ta,
        }}
        onSubmit={async (values) => {
          setLoading(true);
          await fetch("/api/sumberdana", {
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
                <span className="label-text">Nama Sub Bidang</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan nama sub bidang"
                className="input input-bordered input-sm"
                name="nama"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pilih OPD</span>
              </label>
              <Field
                required
                as="select"
                placeholder="Masukkan nama"
                className="input input-bordered input-sm"
                name="id_opd"
              >
                <option value={0}>Pilih OPD</option>
                {dataOPD.map((d, k) => (
                  <option key={k} value={d.id}>
                    {d.nm_sub_unit}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nilai</span>
              </label>
              <Field
                required
                type=""
                placeholder="Masukkan Nilai"
                className="input input-bordered input-sm"
                name="nilai"
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
