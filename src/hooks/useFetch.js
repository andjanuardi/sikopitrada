import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const useFetch = (url = "/api/hello", method = "POST", body = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(body);
  }, [body]);

  async function getData(body) {
    try {
      method === "GET" &&
        (await fetch(url)
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
        (await fetch(url, { method: method, body: JSON.stringify(body) })
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
    } catch (error) {
      console.log("🚀 ~ file: useFetch.js:40 ~ getData ~ error:", error);
      // Swal.fire("Opps", `Terjadi Kesalahan ${error}`, "error");
    }
  }
  return { data, getData };
};

export default useFetch;
