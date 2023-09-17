import {
  FaBuilding,
  FaChartBar,
  FaHistory,
  FaHome,
  FaMoneyBill,
  FaSignature,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import Image from "next/image";
import { BiChart, BiCog, BiPrinter, BiTransfer } from "react-icons/bi";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const listMenu = [
  { label: "Beranda", icon: <FaHome />, link: "/" },
  { label: "Daftar OPD", icon: <FaBuilding />, link: "/opd" },
  { label: "Sumber Dana", icon: <FaMoneyBill />, link: "/sumberdana" },
  { label: "Realisasi", icon: <FaChartBar />, link: "/realisasi" },
  { label: "Laporan", icon: <BiPrinter />, link: "/laporan" },
  { label: "Penandatangan", icon: <FaSignature />, link: "/penandatangan" },
  { label: "Pengguna", icon: <FaUsers />, link: "/pengguna" },
  { label: "Pengaturan", icon: <BiCog />, link: "/pengaturan" },
  // { label: "Log", icon: <FaHistory />, link: "/log" },
];

export const lisMenuUser = [
  { label: "Beranda", icon: <FaHome />, link: "/" },
  { label: "Realisasi", icon: <FaChartBar />, link: "/realisasi" },
  { label: "Laporan", icon: <BiPrinter />, link: "/laporan" },
  { label: "Penandatangan", icon: <FaSignature />, link: "/penandatangan" },
];
function Sidebar({ setActiveMenu }) {
  const session = useSession();
  const router = useRouter();
  console.log(listMenu);
  console.log(lisMenuUser);
  return (
    <>
      <div className="bg-[var(--red)] flex flex-col min-h-screen  relative ">
        <div className="px-6  shadow-md  flex flex-col ">
          <div className="flex gap-3 text-white items-center h-[var(--h-menu)]">
            <Image
              alt="Logo"
              src={"/assets/logo.png"}
              height={35}
              width={35}
              className=" h-auto drop-shadow-md"
            />
            <div>
              <div className="font-black flex pt-2 text-[20pt] leading-5 text-white  whitespace-nowrap">
                <span className=" flex justify-center  items-center   ">
                  SIK
                  <img src="/assets/logo-kopi.png" className="h-[20px]" />
                  PI
                </span>
                <span className="text-white/90 ml-1">TRADA</span>
              </div>
              <span className="text-sm font-semibold">BPKD Kab. Simeulue</span>
            </div>
          </div>
        </div>
        <div className="text-white flex flex-col items-center py-5 px-4 text-center">
          <div className="bg-white/20 w-fit rounded-full text-3xl  mb-2  p-5">
            <FaUser />
          </div>
          <div className="font-black text-lg">
            {session.data && session.data.nama}
          </div>
          <div className="font-semibold text-xs italic">
            NIP. {session.data && session.data.nip}
          </div>
          <div className="font-bold">
            {session.data && session.data.txt_jabatan}
          </div>
          <div className="text-sm whitespace-pre-wrap">
            {session.data && session.data.nm_sub_unit}
          </div>
        </div>
        <div className="py-5   flex flex-col   flex-1 overflow-x-hidden overflow-y-auto bg-white/10">
          <ul className="menu  p-0   pl-5  rounded-none bg-transparent text-white w-full  ">
            {listMenu
              .filter((e) =>
                session.data && session.data.jabatan != 1
                  ? lisMenuUser.some((s) => s.label === e.label)
                  : e
              )
              .map((d, k) => (
                <motion.li
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  key={k}
                  className="font-bold my-1 "
                  onClick={() => {
                    router.push(d.link);
                    setActiveMenu(false);
                  }}
                >
                  <a
                    className={`px-6 py-2   ${
                      router.pathname === d.link &&
                      "bg-white text-black hover:!bg-white hover:!text-black "
                    }   hover:bg-black/10 hover:text-white active:!bg-white active:!text-black  rounded-none rounded-l-full `}
                  >
                    {d.icon} {d.label}
                  </a>
                </motion.li>
              ))}
          </ul>
        </div>
        <div className="text-white  text-xs drop-shadow  text-center leading-2 px-5 py-2 ">
          Sistem Kendali Optimalisasi Realisasi Dana Transfer Daerah BPKD
          Kabupaten Simeulue
        </div>
      </div>
    </>
  );
}

export default Sidebar;
