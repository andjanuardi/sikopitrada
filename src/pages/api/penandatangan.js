//@pages/api/t_penandatangan.js

import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM t_penandatangan`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT AKTIF
    if (post.aktif) {
      try {
        const q = `SELECT * FROM t_penandatangan where aktif=1`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_penandatangan WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_penandatangan VALUES( ${post.id}, '${post.nama}', '${post.jabatan}', '${post.nip}', '${post.pangkat}', '${post.golongan}', ${post.aktif});`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_penandatangan SET id=${post.id}, nama='${post.nama}', jabatan='${post.jabatan}', nip='${post.nip}', pangkat='${post.pangkat}', golongan='${post.golongan}', aktif=${post.aktif} WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_penandatangan WHERE id=${post.id};`;
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
