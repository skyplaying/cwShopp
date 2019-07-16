/*

aes接口加密处理接口

*/
var Aes = require('./aes');
var CryptoJS = Aes.CryptoJS;

//加密 (秘钥和偏移量找后端拿)
// function Encrypt(word) { 
//     const key = CryptoJS.enc.Utf8.parse(""); //十六位十六进制数作为密钥
//     const iv = CryptoJS.enc.Utf8.parse('');  //十六位十六进制数作为密钥偏移量
//     let data = CryptoJS.enc.Utf8.parse(word);
//     // console.log("data:" + data);
//     var encrypted = CryptoJS.AES.encrypt(data, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     // console.log(Decrypt(encrypted)); 

//     //返回的是base64格式的密文	
//     return encrypted.toString();
// }

//混淆后的代码
function Encrypt(word) {
    const key = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"]("\x7a\x4c\x4c\x51\x5a\x30\x41\x6e\x44\x42\x36\x50\x52\x59\x30\x51");
    const iv = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"]('\x7a\x6b\x70\x6f\x72\x4a\x68\x50\x35\x70\x50\x50\x6d\x57\x39\x36');
    const data = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"](word);
    var US2 = CryptoJS["\x41\x45\x53"]["\x65\x6e\x63\x72\x79\x70\x74"](data, key, { iv: iv, mode: CryptoJS["\x6d\x6f\x64\x65"]["\x43\x42\x43"], padding: CryptoJS["\x70\x61\x64"]["\x50\x6b\x63\x73\x37"] });
    return US2["\x74\x6f\x53\x74\x72\x69\x6e\x67"]();
}

//解密(秘钥和偏移量找后端拿)
// function Decrypt(map) {  
//     const key = CryptoJS.enc.Utf8.parse(""); //十六位十六进制数作为密钥
//     const iv = CryptoJS.enc.Utf8.parse('');  //十六位十六进制数作为密钥偏移量

//     var decrypt = CryptoJS.AES.decrypt(map, key, {
//         iv: iv,
//         mode: CryptoJS.mode.CBC,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }

function Decrypt(pBRsOqRtU1) {
    const key = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"]("\x7a\x4c\x4c\x51\x5a\x30\x41\x6e\x44\x42\x36\x50\x52\x59\x30\x51");
    const iv = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"]('\x7a\x6b\x70\x6f\x72\x4a\x68\x50\x35\x70\x50\x50\x6d\x57\x39\x36');
    const aYH2 = CryptoJS["\x41\x45\x53"]["\x64\x65\x63\x72\x79\x70\x74"](pBRsOqRtU1, Ky3, {
        iv: iv, mode: CryptoJS["\x6d\x6f\x64\x65"]["\x43\x42\x43"], padding: CryptoJS["\x70\x61\x64"]["\x50\x6b\x63\x73\x37"]
    });
    return CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x73\x74\x72\x69\x6e\x67\x69\x66\x79"](aYH2)["\x74\x6f\x53\x74\x72\x69\x6e\x67"]();
}

// 对参数排序
function sortToMap(map) {
    var arr = new Array()
    for (var key in map) {
        arr.push(key);
    }
    arr.sort();
    return arr;
}

//对参数拼接成 XXX=XXX&XXX==XXXX 字符串的形式 后再进行加密
function sign(map) {
    var arr2 = sortToMap(map);
    // console.log(arr2);
    var str = "";
    for (var i = 0; i < arr2.length; i++) {
        if (map[arr2[i]] === null || map[arr2[i]] === "" || map[arr2[i]] === undefined) {
            map[arr2[i]] = '';
            // continue;
        }
        str += arr2[i] + "=" + map[arr2[i]] + "&";
    }
    str = str.substring(0, str.length - 1);
    // console.log(str); 
    str = Encrypt(str);
    return str;
}

module.exports = {
    sign: sign
}