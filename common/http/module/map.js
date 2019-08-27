/**
 *  地图导航及定位模块
 */

//获取当前位置和目标位置的距离
export const getDistance = (obj) => {
	var that = this;
	uni.getLocation({
		//#ifndef MP-ALIPAY
		type: 'gcj02',
		//#endif 
		success: function(res) {
			console.log("当前坐标信息：", res)
			//
			// var distance = that.distance(res.latitude, res.longitude, 39.918034, 116.415192);
			// console.log("当前位置距离北京故宫：", distance, "千米")
		}
	})


}
//计算两点位置距离

function distance(la1, lo1, la2, lo2){
	var La1 = la1 * Math.PI / 180.0;
	var La2 = la2 * Math.PI / 180.0;
	var La3 = La1 - La2;
	var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(
		Lb3 / 2), 2)));
	s = s * 6378.137;
	s = Math.round(s * 10000) / 10000;
	// s = s.toFixed(2); //只保留几个小数位
	return s;
}

//获取当前位置,唤起对目的位置的导航
export const mapNavigation = (obj) => {
	let latPoint = obj.latPoint 
	let latitude = obj.latitude
	//选择地理位置 ,进行导航
	uni.getLocation({
		type: 'gcj02',
		success: function(res) {
			console.log(res)
			if (res) {
				uni.openLocation({
					latitude: res.latitude,
					longitude: res.longitude,
					name: res.name,
					address: res.address,
					success: (data) => {
						console.log(data)
					}
				})
			}
		}
	});

}


//选择当前位置信息
export const chooseTheLoaction =(obj)=>{
	uni.chooseLocation({
		success: (e) => {
			console.log(e)
			return e;
		}
	})
}
export default{
	chooseTheLoaction:chooseTheLoaction,
	mapNavigation:mapNavigation,
	getDistance:getDistance,
}