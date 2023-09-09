import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM v_user`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_user WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_user VALUES( ${post.id}, ${post.id_opd}, '${post.nama}', '${post.nip}', '${post.user}', MD5('${post.pass}'), '${post.jabatan}');`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_user SET id=${post.id}, id_opd=${post.id_opd}, nama='${post.nama}', nip='${post.nip}', user='${post.user}', jabatan='${post.jabatan}' WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //GANTI PASS
    if (post.p) {
      try {
        const q = `UPDATE t_user SET pass=MD5('${post.pass}')  WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_user WHERE id=${post.id};`;
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
