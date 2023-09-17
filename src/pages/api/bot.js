// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  try {
    const post = req.body;
    const chat_id = post.message.chat.id;
    const command = post.message.text;

    async function balasPesan(text) {
      await fetch(
        `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}`
      )
        .then((e) => e.json())
        .then((d) => console.log(d));
    }

    const qstat = `CALL stat(${new Date().getFullYear()})`;
    const stat = await dbData(qstat);
    const qsdana = `SELECT  nama_sdana, sum(nilai) as nilai FROM v_sumberdana where not id_sdana=0 and ta=${new Date().getFullYear()} GROUP   BY nama_sdana`;
    const sdana = await dbData(qsdana);

    if (command === "/info") {
      stat[0].map((d) => {
        const pesan = encodeURIComponent(
          `${d.nama_sdana}\n${d.nama_jdana}\n${d.nama_bidang}\n${
            d.nama_sbidang
          }\n\nPagu: Rp.${new Intl.NumberFormat("Id-ID").format(
            d.nilai_pagu
          )},-\nRealisasi: Rp.${new Intl.NumberFormat("Id-ID").format(
            d.nilaitotal
          )},-\nPersentase: ${new Intl.NumberFormat("Id-ID").format(
            d.persentase
          )}%`
        );

        balasPesan(pesan);
      });
    }
    res.status(200).json(true);
  } catch (error) {
    console.log(error);
  }
}
