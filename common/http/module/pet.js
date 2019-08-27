/**
 * 宠物模块
 */
import http from '@/common/http/interface.js'

//查询所有的宠物类型信息

function selectAllPetTypeInfo(){
	return http.request({
		url:'/api/store/selectStoreInfo',
		data:{}
	})
}
// 查询单个宠物类型下的所有宠物品种
function selectAllPetVarietiesByPetType(petTypeId){
	return http.request({
		url:'/api/petVarieties/selectAllPetVarietiesByPetType',
		data:{
			petTypeId:petTypeId
		}
	})
}





export default{
	selectAllPetVarietiesByPetType,
	selectAllPetTypeInfo,
	
}
