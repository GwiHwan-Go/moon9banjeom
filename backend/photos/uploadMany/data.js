
let data = require("fs").readFileSync("./photos/uploadMany/choi.csv", "utf8")
data = data.replace(/,/g,"");
data = data?.split("\r\n");
for(let i=3; i*100<data.length; i++){
    // console.log(i-1, '~', i);
    // console.log(data.slice((i-1)*100,(i)*100))
} //3147
console.log(data.slice(1300,data.length))
