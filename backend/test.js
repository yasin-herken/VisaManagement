let str = "MALI-000123";
let tempBarcode = str.slice(-6);
tempBarcode = parseInt(tempBarcode) + 1;
tempBarcode = String(tempBarcode).padStart(6,'0');
tempBarcode = "MALI-" + tempBarcode;
console.log(tempBarcode)