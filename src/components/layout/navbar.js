import { FaUser, FaCalendar, FaTimes, FaKey } from "react-icons/fa";
import { BiLogOut, BiMenu } from "react-icons/bi";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function Navbar({ activeMenu, setActiveMenu }) {
  const session = useSession();
  return (
    <div className="flex items-center p-5 h-[var(--h-menu)] shadow-md bg-white  ">
      <div className="flex-1 flex items-center gap-4   ">
        <label className="btn btn-circle swap swap-rotate ">
          <input
            type="checkbox"
            checked={activeMenu}
            onChange={() => setActiveMenu(!activeMenu)}
          />
          <BiMenu className="swap-off fill-current text-3xl" />
          <FaTimes className="swap-on fill-current text-3xl" />
        </label>
        <div
          className={` ${
            activeMenu ? "hidden md:flex" : "flex"
          }  font-black text-[18pt] lg:text-[20pt] items-center whitespace-nowrap`}
        >
          <Image
            alt="Logo"
            src={"/assets/logo.png"}
            height={35}
            width={35}
            className=" h-auto drop-shadow-md mr-3 hidden sm:block"
          />
          <span className=" flex justify-center  items-center   ">
            SIK
            <img src="/assets/logo-kopi.png" className="h-[20px]" />
            PI
          </span>
          <span className="text-[var(--red)] ml-1">TRADA</span>
        </div>
      </div>
      <div className="items-center gap-2 flex   ">
        <div className="hidden sm:flex items-center gap-2 border    p-3 rounded-lg">
          <FaCalendar />
          <span>{session.data && session.data.ta}</span>
        </div>
        <div className={`dropdown  dropdown-end `}>
          <button
            tabIndex={0}
            className="btn bg-[var(--red)] text-white rounded-full"
          >
            <FaUser />
          </button>
          <ul
            tabIndex={0}
            className="mt-5 p-0 bg-[var(--red)] text-white rounded shadow-md menu dropdown-content z-[1]  w-fit"
          >
            <li>
              <a className=" whitespace-nowrap rounded-none py-3 px-6 hover:text-white  ">
                <FaUser /> Profil
              </a>
            </li>
            <li>
              <a className=" whitespace-nowrap rounded-none py-3 px-6 hover:text-white">
                <FaKey /> Ganti Password
              </a>
            </li>
            <li onClick={() => signOut()}>
              <a className=" whitespace-nowrap rounded-none py-3 px-6 hover:text-white">
                <BiLogOut /> Keluar
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
