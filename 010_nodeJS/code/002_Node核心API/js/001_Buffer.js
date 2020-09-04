let buf = Buffer.alloc(6);
console.log(buf); // <Buffer 00 00 00 00 00 00> 通过console.log输出Buffer，会自动将存储的内容转换成16进制再输出

let buff = Buffer.alloc(6,3);
console.log(buff); // <Buffer 03 03 03 03 03 03> 用3填充

let str = Buffer.from("abc");
console.log(str); // <Buffer 61 62 63>  十六进制ascii码