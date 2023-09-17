import { Field, Form, Formik } from "formik";
import Swal from "sweetalert2";
import md5 from "md5";
import { useRouter } from "next/router";

import { getSession, signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        user: "",
        pass: "",
        ta: new Date().getFullYear(),
      }}
      onSubmit={async (values) => {
        const status = await signIn("credentials", {
          redirect: false,
          user: values.user,
          pass: md5(values.pass),
          ta: values.ta,
          callbackUrl: "/",
        });
        if (status.ok) {
          Swal.fire("Sukses", "Selamat datang", "success").then((e) => {
            if (e.isConfirmed) {
              router.push("/");
            }
          });
        } else {
          Swal.fire("Oops", "Nama Pengguna dan Kata Sandi Salah", "error");
        }
      }}
    >
      <div className="flex justify-center items-center h-[100dvh]">
        <div className="flex flex-col p-10 rounded-lg lg:w-[35vw] shadow-lg bg-white gap-6 ">
          <div className=" flex flex-col lg:flex-row gap-4 items-center text-center ">
            <img className="w-[70px] lg:w-[100px]" src="/assets/logo.png/" />
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 lg:justify-start justify-center">
                <span className=" flex justify-center font-extrabold text-4xl lg:text-left  items-center   ">
                  SIK
                  <img src="/assets/logo-kopi.png" className="h-[30px]" />
                  PI
                </span>
                <span className="font-extrabold text-4xl lg:text-left text-[var(--red)]">
                  TRADA
                </span>
              </div>
              <div className="flex font-medium lg:text-left">
                Sistem Kendali Optimalisasi Realisasi Dana Transfer Daerah BPKD
                Kab. Simeulue
              </div>
            </div>
          </div>
          <Form>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className=" font-bold text-lg">Nama Pengguna</div>
                <Field
                  required
                  type="text"
                  name="user"
                  placeholder="Masukkan Nama Pengguna"
                  className="input input-ghost w-full input-bordered "
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-bold text-lg">Kata Sandi</div>
                <Field
                  required
                  type="password"
                  name="pass"
                  placeholder="Masukkan Kata Sandi"
                  className="input input-ghost w-full input-bordered "
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="font-bold text-lg">Tahun Anggaran</div>
                <Field
                  required
                  type="number"
                  name="ta"
                  min={1945}
                  max={9999}
                  placeholder="Masukkan tahun"
                  className="input input-ghost w-full input-bordered "
                />
              </div>
              <div className="flex flex-col items-end">
                <button
                  type="submit"
                  className="btn text-white btn-success font-bold text-sm"
                >
                  Masuk
                </button>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className=" text-sm text-center">
                  BADAN PENGELOLAAN KEUANGAN DAERAH KABUPATEN SIMEULUE
                </div>
                <div className=" text-xs text-center">
                  Programmer : Andri Januardi, S.Kom & M.Avian Andria, S.Kom
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
}

Login.getLayout = function PageLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
