/*

aes接口加密处理接口

*/
var Aes = require('./aes1');
var CryptoJS = Aes.CryptoJS;



//加密 (秘钥和偏移量找后端拿) 原来的加密方法
function Encrypt(word) {
	const key = CryptoJS.enc.Utf8.parse("sRQaSBRbaS7D523I"); //十六位十六进制数作为密钥
	const iv = CryptoJS.enc.Utf8.parse('BoyRmEW50o40EVx4'); //十六位十六进制数作为密钥偏移量
	let data = CryptoJS.enc.Utf8.parse(word);
	// console.log("data:" + data);
	var encrypted = CryptoJS.AES.encrypt(data, key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});

	//返回的是base64格式的密文	
	return encrypted.toString();
}

// //混淆后的代码
// function Encrypt(tfyF1) {
// 	const key = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"](
// 		"\x73\x52\x51\x61\x53\x42\x52\x62\x61\x53\x37\x44\x35\x32\x33\x49");
// 	const iv = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"](
// 		'\x42\x6f\x79\x52\x6d\x45\x57\x35\x30\x6f\x34\x30\x45\x56\x78\x34');
// 	let data = CryptoJS["\x65\x6e\x63"]["\x55\x74\x66\x38"]["\x70\x61\x72\x73\x65"](tfyF1);
// 	var Sh_mcZ2 = CryptoJS["\x41\x45\x53"]["\x65\x6e\x63\x72\x79\x70\x74"](data, key, {
// 		iv: iv,
// 		mode: CryptoJS["\x6d\x6f\x64\x65"]["\x43\x42\x43"],
// 		padding: CryptoJS["\x70\x61\x64"]["\x50\x6b\x63\x73\x37"]
// 	});
// 	return Sh_mcZ2["\x74\x6f\x53\x74\x72\x69\x6e\x67"]();
// }
// 





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
