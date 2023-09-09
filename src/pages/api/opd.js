//@pages/api/t_sdana.js

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM t_opd`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }
    //SINGKRON
    if (post.singkron) {
      try {
        const q = `CALL singkronOPD(${post.kd_urusan}, ${post.kd_bidang}, ${post.kd_unit}, ${post.kd_sub}, '${post.nm_sub_unit}')`;
        const data = await dbData(q);
        console.log("🚀 ~ file: opd.js:33 ~ handler ~ q:", q);
        res.status(200).json(data);
      } catch (e) {
        console.log("🚀 ~ file: opd.js:36 ~ handler ~ e:", e);
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_opd WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_opd VALUES( ${post.id}, ${post.kd_urusan}, ${post.kd_bidang}, ${post.kd_unit}, ${post.kd_sub}, '${post.nm_sub_unit}');`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_opd SET id=${post.id}, kd_urusan=${post.kd_urusan}, kd_bidang=${post.kd_bidang}, kd_unit=${post.kd_unit}, kd_sub=${post.kd_sub}, nm_sub_unit='${post.nm_sub_unit}' WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE PENGGUNA
    if (post.p) {
      try {
        const q = `UPDATE t_opd SET pengguna=${post.pengguna} WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_opd WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }
  } else {
    res.status(200).json(false);
  }
}
