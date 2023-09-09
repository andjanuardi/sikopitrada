import { NumericFormat } from "react-number-format";

function NumberFormat(val) {
  return (
    <NumericFormat
      displayType="text"
      value={val}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
    />
  );
}

export default NumberFormat;

export function romawi(nomor) {
  var desimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var romawi = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  var hasil = "";
  for (var index = 0; index < desimal.length; index++) {
    while (desimal[index] <= nomor) {
      hasil += romawi[index];
      nomor -= desimal[index];
    }
  }
  return hasil;
}
