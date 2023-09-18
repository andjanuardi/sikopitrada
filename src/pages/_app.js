import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar, { listMenu } from "@/components/layout/sidebar";
import { useRouter } from "next/router";
import Loader from "@/components/layout/loader";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/layout/navbar";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [activeMenu, setActiveMenu] = useState(false);
  const [pageData, setPageData] = useState();
  const router = useRouter();

  useEffect(() => {
    setPageData(listMenu.filter((e) => e.link === router.pathname)[0]);
  }, [router.pathname]);

  if (Component.getLayout) {
    return Component.getLayout(
      <>
        <Loader />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <SessionProvider session={pageProps.session} basePath={`/api/auth`}>
      <Head>
        <title>SIKOPITRADA</title>
      </Head>
      <Loader />

      <div className={`overflow-x-hidden print:hidden ${activeMenu}`}>
        <motion.div
          animate={activeMenu ? "open" : "close"}
          variants={{
            open: {
              x: 0,
              width: "var(--w-menu-open)",
            },
            close: {
              x: "var(--w-menu-x-close)",
              width: "var(--w-menu-close)",
            },
          }}
          className="flex "
        >
          <div className="w-[var(--w-menu)] grid  ">
            <Sidebar setActiveMenu={setActiveMenu} />
          </div>
          <div className="flex-1 flex flex-col ">
            <Navbar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <div className="flex mx-6 my-3 justify-between ">
              {pageData && (
                <div className="flex gap-2 items-center font-black">
                  {pageData.icon} {pageData.label}
                </div>
              )}
              <div className="hidden lg:block text-sm breadcrumbs px-5">
                <ul>
                  <li>
                    <Link
                      className="flex gap-2 items-center"
                      href={"/"}
                      onClick={() => setActivePage("/")}
                    >
                      <FaHome /> Beranda
                    </Link>
                  </li>
                  {pageData && pageData.link != "/" && (
                    <li>
                      <Link
                        className="flex gap-2 items-center"
                        href={pageData.link}
                        onClick={() => setActivePage("/")}
                      >
                        {pageData.icon} {pageData.label}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex justify-center   ">
              <div className=" py-2  rounded-lg px-3 max-w-[95vw] mx-3 lg:max-w-[98vw]  flex-1 shadow-md bg-white  ">
                <Component {...pageProps} />
              </div>
            </div>

            <div className="  text-xs drop-shadow  text-center leading-2 px-5 py-2 ">
              Sistem Kendali Optimalisasi Realisasi Dana Transfer Daerah BPKD
              Kabupaten Simeulue
            </div>
          </div>
        </motion.div>
      </div>
    </SessionProvider>
  );
}
