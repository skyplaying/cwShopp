/**
 *  店铺管理模块
 * 
 */
import http from '@/common/http/interface.js'


// 提交门店审核

function addStoreCheck(storeId) {
	return http.request({
		url: '/api/store/addStoreCheck',
		data: {
			storeId: storeId
		}
	})
}

// 查询单个门店信息
function selectStoreInfo(storeId) {
	return http.request({
		url: '/api/store/selectStoreInfo',
		data: {
			storeId: storeId
		}
	})
}

//  修改门店信息
function updateStoreInfo(obj) {
	const storeId = obj.storeId
	const storeName = obj.consstoreName
	const storePhoneNumber = obj.storePhoneNumber
	const storeManagerPhoneNumber = obj.storeManagerPhoneNumber
	const storeAddress = obj.storeAddress
	const storeDetailedAddress = obj.storeDetailedAddress
	const storeLongitude = obj.storeLongitude
	const storeLatitude = obj.storeLatitude
	const storeBusinessHours = obj.storeBusinessHours
	const storeState = obj.storeState
	return http.request({
		url: '/api/store/updateStoreInfo',
		data: {
			storeId: storeId,
			storeName:storeName,
			storePhoneNumber:storePhoneNumber,
			storeManagerPhoneNumber:storeManagerPhoneNumber,
			storeAddress:storeAddress,
			storeDetailedAddress:storeDetailedAddress,
			storeLatitude:storeLatitude,
			storeLongitude:storeLongitude,
			storeBusinessHours:storeBusinessHours,
			storeState:storeState,
		}
	})
}
//查询某个服务者下的所有门店
function selectAllStore(servicerUserId) {
	return http.request({
		url: '/api/store/selectAllStoreByServicerUser',
		data: {
			servicerUserId: servicerUserId
		},
	})
}

/**
 * 商品类
 */


// 查询单个门店下的商品
function selectGoodsByStoreAndState(obj) {
	const storeId = obj.storeId;
	const goodsState = obj.goodsState; //商品状态(传入1查询已上架，传入2查询已下架，不传或其他查询所有状态)
	return http.request({
		url: '/api/goods/selectGoodsByStoreAndState',
		data: {
			storeId: storeId,
			goodsState: goodsState,
		}
	})
}

// 查询所有的商品类型
function selectAllGoodsTypeInfo(obj) {
	const storeId = obj.storeId
	const goodsState = obj.goodsState
	return http.request({
		url: '/api/goodsType/selectAllGoodsTypeInfo',
		data: {
			storeId: storeId,
			goodsState: goodsState
		}
	})
}

//添加商品
function addGoods(obj) {
	const storeId = obj.storeId
	const goodsTypeId = obj.goodsTypeId
	const goodsName = obj.goodsName
	const goodsPrice = obj.goodsPrice
	const goodsRemark = obj.goodsRemark
	const goodsImageLink = obj.goodsImageLink
	return http.request({
		url: '/api/goods/addGoods',
		data: {
			storeId: storeId,
			goodsTypeId: goodsTypeId,
			goodsName: goodsName,
			goodsPrice: goodsPrice,
			goodsRemark: goodsRemark,
			goodsImageLink: goodsImageLink
		},
	})
}

//  上架商品
function upperShelfGoods(obj) {
	const goodsId = obj.goodsId
	return http.request({
		url: '/api/goods/upperShelfGoods',
		data: {
			goodsId: goodsId
		}
	})
}
// 下架商品
function lowerShelfGoods(obj) {
	const goodsId = obj.goodsId
	return http.request({
		url: '/api/goods/lowerShelfGoods',
		data: {
			goodsId: goodsId
		}
	})
}

//删除商品
function deleteGoods(obj) {
	const goodsId = obj.goodsId
	return http.request({
		url: '/api/goods/deleteGoods',
		data: {
			goodsId: goodsId
		}
	})
}

// 修改商品
function updateGoods(obj) {
	const goodsId = obj.goodsId
	const goodsTypeId = obj.goodsTypeId
	const goodsName = boj.goodsName
	const goodsPrice = obj.goodsPrice
	const goodsRemark = obj.goodsRemark
	const goodsImageLink = obj.goodsImageLink
	return http.request({
		url: '/api/service/updateService',
		data: {
			goodsId: goodsId,
			goodsTypeId: goodsTypeId,
			goodsName: goodsName,
			goodsPrice: goodsPrice,
			goodsRemark: goodsRemark,
			goodsImageLink: goodsImageLink
		}
	})
}


/**
 * 服务类
 */


// 添加服务
function addService(obj) {
	const storeId = obj.storeId
	const serviceName = obj.serviceName
	const servicePrice = obj.servicePrice
	const servicePriceUnit = obj.servicePriceUnit
	const serviceRemark = obj.serviceRemark
	const serviceImgLink = obj.serviceImgLink
	const sparkServiceSubPriceData = obj.sparkServiceSubPriceData
	const serviceType = obj.serviceType
	return http.request({
		url: '/api/service/addService',
		data: {
			storeId: storeId,
			serviceName: serviceName,
			servicePrice: servicePrice,
			servicePriceUnit: servicePriceUnit,
			serviceRemark: serviceRemark,
			serviceImgLink: serviceImgLink,
			serviceType: serviceType,
			sparkServiceSubPriceData: sparkServiceSubPriceData,
		}
	})
}

// 上架服务
function upperShelfService(obj) {
	const serviceId = obj.serviceId
	return http.request({
		url: '/api/service/upperShelfService',
		data: {
			serviceId: serviceId
		}
	})
}

// 修改服务
function updateService(obj) {
	const serviceId = obj.serviceId
	const serviceName = obj.serviceName
	const servicePrice = obj.servicePrice
	const servicePriceUnit = obj.servicePriceUnit
	const serviceRemark = obj.serviceRemark
	const serviceImgLink = obj.serviceImgLink
	return http.request({
		url: '/api/service/updateService',
		data: {
			serviceId: serviceId,
			serviceName: servicePrice,
			servicePrice: servicePrice,
			servicePriceUnit: servicePriceUnit,
			serviceRemark: serviceRemark,
			serviceImgLink: serviceImgLink,
		}
	})
}

// 下架服务
function lowerShelfService(obj) {
	const serviceId = obj.serviceId
	return http.request({
		url: '/api/service/lowerShelfService',
		data: {
			serviceId: serviceId
		}
	})
}

// 查询单个门店下的服务
function selectServiceByStoreAndState(obj) {
	const storeId = obj.storeId
	const serviceState = obj.serviceState
	let userId = uni.getStorageSync('userId')
	return http.request({
		url: '/api/service/selectServiceByStoreAndState',
		data: {
			storeId: storeId,
			serviceState: serviceState || '',
		}
	})
}

// 删除服务
function deleteService(obj) {
	const serviceId = obj.serviceId
	return http.request({
		url: '/api/service/deleteService',
		data: {
			serviceId: serviceId
		}
	})
}

// 查询火化服务的子价格
function selectSparkServiceSubPrice(obj) {
	const serviceId = obj.serviceId
	return http.request({
		url: '/api/service/selectSparkServiceSubPrice',
		data: {
			serviceId: serviceId
		}
	})
}

// 修改火化服务的子价格
function updateSparkServiceSubPrice(obj) {
	const serviceId = obj.serviceId
	const servicePrice = obj.servicePrice
	return http.request({
		url: '/api/service/updateSparkServiceSubPrice',
		data: {
			serviceId: serviceId,
			servicePrice: servicePrice
		}
	})
}
export default {
	selectAllStore,
	addStoreCheck,
	selectStoreInfo,
	selectGoodsByStoreAndState,
	selectAllGoodsTypeInfo,
	addGoods,
	upperShelfGoods,
	lowerShelfGoods,
	deleteGoods,
	addService,
	upperShelfService,
	updateService,
	lowerShelfService,
	deleteService,
	selectSparkServiceSubPrice,
	updateSparkServiceSubPrice,
	selectServiceByStoreAndState,
	updateStoreInfo,

}
