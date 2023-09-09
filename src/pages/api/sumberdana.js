//@pages/api/t_sdana.js

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM v_sumberdana`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.sdana) {
      try {
        const q = `SELECT * FROM v_sumberdana WHERE id_opd>0`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_sumberdana WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY OPD
    if (post.opd) {
      try {
        const q = `SELECT * FROM v_sumberdana WHERE id_opd=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_sumberdana VALUES( ${post.id}, ${post.id_sdana}, ${post.id_jdana}, ${post.id_bidang}, ${post.id_opd}, '${post.nama}', ${post.nilai}, ${post.ta});`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_sumberdana SET id=${post.id}, id_sdana=${post.id_sdana}, id_jdana=${post.id_jdana}, id_bidang=${post.id_bidang}, id_opd=${post.id_opd}, nama='${post.nama}', nilai=${post.nilai}, ta=${post.ta} WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_sumberdana WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }
    //DELETE SDANA
    if (post.dsdana) {
      try {
        const q = `DELETE FROM t_sumberdana WHERE id=${post.id};`;
        await dbData(q);
        const r = `DELETE FROM t_sumberdana WHERE id_sdana=${post.id};`;
        await dbData(r);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(e);
      }
    }

    //DELETE JDANA
    if (post.djdana) {
      try {
        const q = `DELETE FROM t_sumberdana WHERE id=${post.id};`;
        await dbData(q);
        const r = `DELETE FROM t_sumberdana WHERE id_jdana=${post.id};`;
        await dbData(r);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE BIDANG
    if (post.dbidang) {
      try {
        const q = `DELETE FROM t_sumberdana WHERE id=${post.id};`;
        await dbData(q);
        const r = `DELETE FROM t_sumberdana WHERE id_bidang=${post.id};`;
        await dbData(r);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }
  } else {
    res.status(200).json(false);
  }
}
