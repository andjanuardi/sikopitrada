// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  try {
    const qstat = `CALL stat(${req.query.ta})`;
    const stat = await dbData(qstat);
    const qsdana = `SELECT  nama_sdana, sum(nilai) as nilai FROM v_sumberdana where not id_sdana=0 and ta=${req.query.ta} GROUP   BY nama_sdana`;
    const sdana = await dbData(qsdana);
    res.status(200).json({ stat, sdana });
  } catch (e) {
    res.status(200).json(false);
  }
}
