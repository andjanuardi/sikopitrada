import { dbData } from "@/models/dbConn";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let post = JSON.parse(req.body);

    if (post.empty) {
      res.status(200).json([]);
    }

    //SELECT
    if (post.s) {
      try {
        const q = `SELECT * FROM v_realisasi WHERE ta=${post.ta}`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.opd) {
      try {
        const q = `SELECT * FROM v_realisasi
                    WHERE id_opd = ${post.id_opd} AND ta=${post.ta}`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.sdana) {
      try {
        let q = "";
        if (typeof post.id_opd === "undefined" || post.id_opd === "0") {
          q = `SELECT * FROM v_realisasi
                    WHERE id_sdana = ${post.id_sdana} AND ta=${post.ta}`;
        } else {
          q = `SELECT * FROM v_realisasi
          WHERE id_opd = ${post.id_opd} AND id_sdana = ${post.id_sdana} AND ta=${post.ta}`;
        }

        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.jdana) {
      try {
        let q = "";
        if (typeof post.id_opd === "undefined" || post.id_opd === "0") {
          q = `SELECT * FROM v_realisasi
                    WHERE id_jdana = ${post.id_sdana} AND ta=${post.ta}`;
        } else {
          q = `SELECT * FROM v_realisasi
          WHERE id_opd = ${post.id_opd} AND id_jdana = ${post.id_sdana} AND ta=${post.ta}`;
        }

        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.bidang) {
      try {
        let q = "";
        if (typeof post.id_opd === "undefined" || post.id_opd === "0") {
          q = `SELECT * FROM v_realisasi
                    WHERE id_bidang = ${post.id_sdana} AND ta=${post.ta}`;
        } else {
          q = `SELECT * FROM v_realisasi
          WHERE id_opd = ${post.id_opd} AND id_bidang = ${post.id_sdana} AND ta=${post.ta}`;
        }

        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT
    if (post.sbidang) {
      try {
        const q = `SELECT * FROM v_realisasi
                    WHERE id_opd = ${post.id_opd} AND id_sbidang = ${post.id_sdana} AND ta=${post.ta}`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //SELECT BY ID
    if (post.sid) {
      try {
        const q = `SELECT * FROM t_realisasi WHERE id=${post.id};`;
        const data = await dbData(q);
        res.status(200).json(data);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //INSERT
    if (post.i) {
      try {
        const q = `INSERT INTO t_realisasi VALUES( ${post.id}, ${post.jenis}, ${post.ta}, ${post.id_sdana}, ${post.id_opd}, '${post.no_kontrak}', '${post.tgl_kontrak}', '${post.nm_perusahaan}', '${post.keperluan}', ${post.nilai_kontrak}, '${post.no_sp2d_1}', '${post.no_sp2d_2}', '${post.no_sp2d_3}', '${post.no_sp2d_4}');`;
        await dbData(q);
        post.sp2d.map(async (d) => {
          try {
            const qsp2d = `INSERT INTO t_sp2d VALUES( NULL, ${d.tahap}, '${d.no_sp2d}', '${d.tgl_sp2d}', ${post.id_sdana}, ${post.id_opd}, '${post.no_kontrak}', '${d.keterangan}', ${d.nilai});`;
            await dbData(qsp2d);
          } catch (e) {
            res.status(200).json(false);
          }
        });
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json({ error: e.errno });
      }
    }

    //UPDATE
    if (post.e) {
      try {
        const q = `UPDATE t_realisasi SET id=${post.id}, jenis=${post.jenis}, ta=${post.ta}, id_sdana=${post.id_sdana}, id_opd=${post.id_opd}, no_kontrak='${post.no_kontrak}', tgl_kontrak='${post.tgl_kontrak}', nm_perusahaan='${post.nm_perusahaan}', keperluan='${post.keperluan}', nilai_kontrak=${post.nilai_kontrak}, no_sp2d_1='${post.no_sp2d_1}', no_sp2d_2='${post.no_sp2d_2}', no_sp2d_3='${post.no_sp2d_3}', no_sp2d_4='${post.no_sp2d_4}' WHERE id=${post.id};`;
        await dbData(q);
        res.status(200).json(true);
      } catch (e) {
        res.status(200).json(false);
      }
    }

    //DELETE
    if (post.d) {
      try {
        const q = `DELETE FROM t_realisasi WHERE no_kontrak='${post.no_kontrak}';`;
        await dbData(q);
        try {
          const qsp2d = `DELETE FROM t_sp2d WHERE no_kontrak='${post.no_kontrak}';`;
          await dbData(qsp2d);
          res.status(200).json(true);
        } catch (e) {
          res.status(200).json(false);
        }
      } catch (e) {
        res.status(200).json(false);
      }
    }
  } else {
    res.status(200).json(false);
  }
}
