import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useSimda = (url = "/api/hello", method = "POST", body = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    body.url = url;
    getData(body);
  }, [method]);

  async function getData(body) {
    try {
      method === "GET" &&
        (await fetch("/api/simda/fetch")
          .then((e) => e.json())
          .then((d) => {
            if (d) {
              setData(d);
            } else {
              Swal.fire("Opps", `Terjadi Kesalahan`, "error");
            }
          })
          .then((err) => {
            err != undefined && Swal.fire("Opps", `Terjadi Kesalahan`, "error");
          }));
      method === "POST" &&
        (await fetch("/api/simda/fetch", {
          method: method,
          body: JSON.stringify(body),
        })
          .then((e) => e.json())
          .then((d) => {
            if (d) {
              setData(d);
            } else {
              Swal.fire(
                "Opps",
                `Terjadi Kesalahan Gagal Menghubungkan ke Data SIMDA cek Pengaturan Database`,
                "error"
              );
            }
          })
          .then((err) => {
            err != undefined &&
              Swal.fire(
                "Opps",
                `Terjadi Kesalahan Gagal Menghubungkan ke Data SIMDA cek Pengaturan Database`,
                "error"
              );
          }));
    } catch (error) {
      console.log("🚀 ~ file: useFetch.js:40 ~ getData ~ error:", error);
      // Swal.fire("Opps", `Terjadi Kesalahan ${error}`, "error");
    }
  }
  return { data, getData };
};

export default useSimda;
