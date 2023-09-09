import { motion } from "framer-motion";

function ModalWindow({ open, content }) {
  return (
    <motion.div
      animate={open ? "open" : "close"}
      variants={{
        open: { opacity: 1, display: "flex" },
        close: { opacity: 0, display: "none" },
      }}
      transition={{
        ease: "easeInOut",
      }}
      className={` bg-black/50 top-0 right-0 overflow-y-auto py-5   fixed w-screen h-[100dvh] z-50 justify-center items-start flex backdrop-blur-sm `}
    >
      {content}
    </motion.div>
  );
}

export default ModalWindow;
