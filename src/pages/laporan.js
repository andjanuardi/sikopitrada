import DakBertahap from "@/components/laporan/dak_bertahap";
import Dakfisik from "@/components/laporan/dak_fisik";
import Daknf from "@/components/laporan/dak_nf";
import Doka1 from "@/components/laporan/doka1";
import Rekapitulasi from "@/components/laporan/rekapitulasi";

function Laporan() {
  return <Doka1 />;
}

export default Laporan;

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
