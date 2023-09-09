export function dateNow() {
  let res = new Date();
  res = `${res.getFullYear()}-${
    res.getMonth() + 1 < 10 ? "0" + (res.getMonth() + 1) : res.getMonth() + 1
  }-${res.getDate() < 10 ? "0" + res.getDate() : res.getDate()}`;
  return res;
}

export function monthNow() {
  let res = new Date();
  res = `${res.getFullYear()}-${
    res.getMonth() + 1 < 10 ? "0" + (res.getMonth() + 1) : res.getMonth() + 1
  }`;
  return res;
}

export function dateToTable(date) {
  let res = new Date(date);
  res = `${res.getDate() < 10 ? "0" + res.getDate() : res.getDate()}-${
    res.getMonth() + 1 < 10 ? "0" + (res.getMonth() + 1) : res.getMonth() + 1
  }-${res.getFullYear()}`;
  return res;
}

export function dateToSQL(date) {
  let res = new Date(date);
  res = `${res.getFullYear()}-${
    res.getMonth() + 1 < 10 ? "0" + (res.getMonth() + 1) : res.getMonth() + 1
  }-${res.getDate() < 10 ? "0" + res.getDate() : res.getDate()}`;
  return res;
}
