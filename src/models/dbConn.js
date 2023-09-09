import mysql from "mysql";

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default db;

export const dbData = async (query) => {
  return await new Promise((resolve, reject) => {
    try {
      db.query(query, (err, res) => {
        if (err) {
          throw reject(err);
        }

        return resolve(res);
      });
    } catch (error) {
      console.log(
        "🚀 ~ file: dbConn.tsx:20 ~ returnawaitnewPromise ~ error:",
        error
      );
    }
  });
};
