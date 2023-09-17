// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  console.log(
    JSON.stringify(
      {
        req_method: req.method,
        req_query: req.query,
        req_body: req.body,
      },
      " ",
      1
    )
  );
  res.status(200).json("test");
}
