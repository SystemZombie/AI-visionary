var fs = require("fs");
var text = fs.readFileSync("D:\\pragatheeshwar\\Smart India Hack\\coco.names.txt");
var textByLine = text.split("\n")
console.log(textByLine);