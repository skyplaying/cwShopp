
import http from '@/common/http/interface.js'

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

export default {
	analysisLocation:analysisLocation,
}