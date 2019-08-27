import http from '@/common/http/interface'

var provider = getprovider();
//  获取小程序应用端
function getprovider() {
	uni.getProvider({
		success: (res) => {
			return res
		}
	})
}

//反解析定位
export const analysisLocation = (obj) => {
	const latPoint = obj.latPoint;
	const lngPoint = obj.lngPoint;
	return http.request({
		url: 'common/location',
		data: {
			latPoint,
			lngPoint
		},
	})
}


//  获取用户的基本信息
export const getUserBaseInfo = () => {
	let user;
	// #ifndef MP-ALIPAY
	uni.getUserInfo({
		success(res) {
			// return res;	
			user = res.userInfo;
			uni.setStorageSync('user', user)
		}
	})
	// #endif

	//#ifdef MP-ALIPAY
	my.getAuthCode({
		scopes: 'auth_user,auth_base',
		success: (res) => {
			const authCode = res.authCode
			console.log(authCode)
			// 在成功回调中执行获取用户信息的方法
			// 		my.getOpenUserInfo({
			// 			success: (res) => {
			// 				console.log(res)
			// 				let userInfo = res// 以下方的报文格式解析两层 response
			// 				// return userInfo;
			// 			console.log(userInfo)
			// 			my.alert({
			// 				content:userInfo
			// 			})
			// 
			// 			}
			// 		});
			// 		
			uni.getUserInfo({
				success: (e) => {
					console.log(e.userInfo)
					uni.setStorageSync('user', e.userInfo)
				}
			})
		},
	});

	//#endif


}

// 显示警告框
var alert = (content, cb, buttonText) => {
	uni.hideToast();
	uni.hideLoading();
	uni.hideNavigationBarLoading();
	uni.alert({
		content: JSON.stringify(content),
		buttonText: buttonText || '知道了',
		success() {
			typeof cb == "function" && cb();
		},
	});
};

// 显示确认框
var confirm = (cb, content, confirmButtonText, cancelButtonText) => {
	uni.hideToast();
	uni.hideLoading();
	uni.hideNavigationBarLoading();

	uni.confirm({
		title: '温馨提示',
		content: content,
		confirmButtonText: confirmButtonText || '确定',
		cancelButtonText: cancelButtonText || '取消',
		success(res) {
			console.log(res)
			if (res.confirm) {
				typeof cb == "function" && cb();
			}
		},
	});
};

// 显示Toast提示
var showToast = (title, icon, duration) => {
		uni.showToast({
			duration:duration || 2000,
			icon:icon||'none',
			title:title,
		})
}

// 显示加载中
var showLoading = (content) => {
	uni.showLoading({
		title:content||'加载中',
	})
}

//  验证手机号
function checkPhone(phone) {
	var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
	if (!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
}
// 校验手机号和电话号
function checkAllPhone(phone) {
	const reg=/^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/;
	return reg.test(phone)
        console.log('请输入有效的号码！'); 
    }

// 校验中文姓名

function checkChinaName(name) {
	var reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
	return reg.test(name)
}

//  获取验证码
function getAuthCode(phone){
	// 获取验证码
	http.request({
		url: '/api/sendSms/sendVerificationCode',
		data: {
			phoneNumber:phone
		},
		success(e) {
			console.log(e);
		}
	});
}

// 校验身份证
function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    //var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    var reg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;
       return reg.test(card)
}
//  校验数字
function isNumber(num){
	let reg=/^[0-9]*$/;
	return reg.test(num)
}
//  验证码倒计时
// function getCode(count) {
// 	const TIME_COUNT = 60;
// 	let timer=0;
// 	if (!timer) {
// 		count = TIME_COUNT;
// 		timer = setInterval(() => {
// 			if (count > 0 &&count <= TIME_COUNT) {
// 				count--;		
// 			} else {
// 				clearInterval(timer);
// 				timer = null;
// 			}
// 			return count;
// 			console.log(count)
// 		}, 1000);
// 	}
// 	
// }
// 
// 
//       function getAuthCode(count){
// 		  const TIME_COUNT = 60;
//             // count= TIME_COUNT;
//             var auth_timetimer = setInterval(()=>{	
// 				if(count>0 && count<=TIME_COUNT){
// 					count--;
// 					console.log(count)
// 				
// 				}else{
// 					clearInterval(auth_timetimer);
// 					auth_timetimer=null;
// 				}
// 					return count;	
//             }, 1000);
// 		
//         }
// 
// 






export default {
	analysisLocation: analysisLocation,
	getUserBaseInfo: getUserBaseInfo,
	checkPhone: checkPhone,
	checkChinaName: checkChinaName,
	getAuthCode:getAuthCode,
	isCardNo:isCardNo,
	showToast:showToast,
	showLoading:showLoading,
	isNumber:isNumber,
	checkAllPhone:checkAllPhone,
}
