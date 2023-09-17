// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  const post = req.body;
  const chat_id = post.message.chat.id;
  const command = post.message.chat.text;

  async function balasPesan(text) {
    await fetch(
      `https://api.telegram.org/bot2054449112:AAG6dospEMvrj-mZHuoxLikvFSgvNwn00K0/sendMessage?chat_id=${chat_id}&text=${text}`
    );
  }

  const qstat = `CALL stat(${new Date().getFullYear()})`;
  const stat = await dbData(qstat);
  const qsdana = `SELECT  nama_sdana, sum(nilai) as nilai FROM v_sumberdana where not id_sdana=0 and ta=${new Date().getFullYear()} GROUP   BY nama_sdana`;
  const sdana = await dbData(qsdana);

  if (command === "/info") {
    stat[0].map((d) => {
      balasPesan(
        `${d.nama_sdana}\n${d.nama_jdana}\n${d.nama_bidang}\n${
          d.nama_sbidang
        }\n${d.nama_sbidang}\nPagu: Rp.${new Intl.NumberFormat("Id-ID").format(
          d.nilai_pagu
        )},-\nRealisasi: Rp.${new Intl.NumberFormat("Id-ID").format(
          d.nilaitotal
        )},-\nPersentase: ${new Intl.NumberFormat("Id-ID").format(
          d.persentase
        )}%`
      );
    });
  }

  res.status(200).json(true);
}
