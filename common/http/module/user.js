/**
 * 服务者模块
 */
import http from '@/common/http/interface.js'

// 微信服务者端查询服务者用户审核状态
function selectServicerUserState(obj){
		const servicerUserId=obj.servicerUserId
		return http.request({
			url:'/api/servicerUser/selectServicerUserState',
			data:{
				servicerUserId:servicerUserId
			}
		})
	
}


export  default{
	selectServicerUserState,
}