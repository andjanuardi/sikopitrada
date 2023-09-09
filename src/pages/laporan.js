import DakBertahap from "@/components/laporan/dak_bertahap";

function Laporan() {
  return <DakBertahap />;
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
