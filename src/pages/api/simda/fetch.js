export default async function handler(req, res) {
  let body = JSON.parse(req.body);

  const url = body.url;
  console.log("ini :" + process.env.API_SIMDA + url);
  await fetch(process.env.API_SIMDA + url, {
    method: "POST",
    body: JSON.stringify(body),
  })
    .then((e) => e.json())
    .then((d) => {
      if (d) {
        res.status(200).json(d);
      } else {
        res.status(200).json(false);
      }
    })
    .then((err) => {
      err != undefined && res.status(200).json(false);
    });
}
