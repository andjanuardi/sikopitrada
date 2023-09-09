import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

function Loader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
    };
  });
  return (
    <motion.div
      animate={loading ? "open" : "close"}
      variants={{
        open: { opacity: 1, display: "flex" },
        close: { opacity: 0, display: "none" },
      }}
      transition={{
        ease: "easeInOut",
      }}
      className={` bg-black/50  fixed w-screen h-[100dvh] z-50 justify-center items-center flex backdrop-blur-sm `}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.3,
          ease: "easeInOut",
          // repeatDelay: 1,
        }}
        className="relative flex text-red-100 items-center justify-center gap-3"
      >
        <CgSpinner className="text-[110pt] text-red-500/40 animate-spin absolute " />

        <div className="flex flex-col absolute pt-2 drop-shadow-lg ">
          <motion.span
            animate={{ color: ["rgb(239 68 68)", "#fff", "rgb(239 68 68)"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="font-black  leading-3 text-3xl"
          >
            SIKOPI
          </motion.span>
          <motion.span
            animate={{ color: ["#fff", "rgb(239 68 68)", "#fff"] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 1,
              ease: "easeInOut",
            }}
            className="font-black  text-3xl ml-5"
          >
            TRADA
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Loader;
