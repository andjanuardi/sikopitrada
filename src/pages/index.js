export default function Beranda() {
  return (
    <div>
      <div>Beranda</div>
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
