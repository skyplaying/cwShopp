(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/addShopOne/addShopOne"],{"2b9d":function(e,t,o){"use strict";o.r(t);var s=o("e9c6"),r=o("ecee");for(var i in r)"default"!==i&&function(e){o.d(t,e,function(){return r[e]})}(i);o("3351");var n=o("2877"),u=Object(n["a"])(r["default"],s["a"],s["b"],!1,null,null,null);t["default"]=u.exports},"2e70":function(e,t,o){"use strict";(function(e){var s;Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){return o.e("components/mc-image-upload/mc-image-upload").then(o.bind(null,"b168"))},i=function(){return Promise.all([o.e("common/vendor"),o.e("components/w-picker/w-picker")]).then(o.bind(null,"5b86"))},n={data:function(){return{isok:!0,storeLatitude:"",storeLongitude:"",storeAddress:"",storeDetailedAddress:"",storePhoneNumber:"",storeName:"",storeBusinessHours:"",isSelectDate:!1,serverUrl:"https://test.qipinke.com/petoutServer_test/api/file/uploadImage",dateList:["每天","工作日"],hourList:[1,2,3,4,5,6,7,8,9,10,11,12],selectDate:"",fromHour:8,toHour:8,isSelectFHour:!1,isSelectToHour:!1,type1:"storeLogoPicture",type2:"storePictures",type3:"storeCarHeadPicture",type4:"storeCarNumberPlatePicture",type5:"storeBusinessLicensePicture",type6:"storeSpecialIndustryLicensePicture",storeLogoPicture:"",storePictures:[],storeCarHeadPicture:"",storeCarNumberPlatePicture:"",storeBusinessLicensePicture:"",storeSpecialIndustryLicensePicture:"",addressInfo:"",storeIntroduction:"",isSubmitAll:!1}},components:{mcUploadImg:r,wPicker:i},onLoad:function(){this.getLoaction(),s=this},onShow:function(){this.init()},methods:{sureSubmit:function(){var t,o;t=s.storeLogoPicture&&s.storePictures,o=s.storeAddress&&s.storeDetailedAddress&&s.storeLatitude&&s.storeLongitude&&s.storePhoneNumber&&s.storeName&&s.storeIntroduction;var r=this.$api.checkAllPhone(this.storePhoneNumber);r||e.showToast({icon:"none",title:"电话号码不正确"}),console.log(r),console.log(s.storeLogoPicture,s.storePictures),console.log(t,o),o&&t&&r?this.isSubmitAll=!0:(this.isSubmitAll=!1,e.showToast({icon:"none",title:"门店信息不完善"}))},getImgData:function(e){console.log(e);var t=e[1],o=e[0];console.log(t),t&&o&&("storeLogoPicture"==t?(s.storeLogoPicture=o,console.log("logo",this.storeLogoPicture)):"storePictures"==t?(s.storePictures.push(o),s.storePictures.length>2&&(s.storePictures=s.storePictures.splice(0,s.storePictures.length-2))):"storeCarHeadPicture"==t?s.storeCarHeadPicture=o:"storeCarNumberPlatePicture"==t?s.storeCarNumberPlatePicture=o:"storeBusinessLicensePicture"==t?s.storeBusinessLicensePicture=o:"storeSpecialIndustryLicensePicture"==this.cc&&(s.storeSpecialIndustryLicensePicture=o))},onConfirm:function(e){console.log(e.checkArr)},init:function(){this.createTime()},getLoaction:function(){var t=this;e.getLocation({success:function(e){t.latitude=e.latitude,t.longitude=e.longitude}})},openCity:function(){var t=this;e.chooseLocation({success:function(o){console.log(o),t.addressInfo=o,t.storeAddress="",t.storeAddress=o.address+o.name,t.storeLatitude=o.latitude,t.storeLongitude=o.longitude,console.log(t.storeLongitude,t.storeLatitude),e.setStorageSync("address",o)}})},dateClick:function(){s.isSelectDate=!0},fromHourCl:function(){s.isSelectFHour=!0},toHourCl:function(){s.isSelectToHour=!0},sDate:function(e){this.selectDate=e,s.isSelectDate=!1},sFromHour:function(e){this.fromHour=e,this.isSelectFHour=!1},stoHour:function(e){this.toHour=e,this.isSelectToHour=!1},saveFile:function(){this.nextBtn()},nextBtn:function(){this.createTime(),this.sureSubmit(),this.isSubmitAll&&this.saveShopInfo()},createTime:function(){var e,t,o;t=this.fromHour+":00",o=this.toHour+":00",e=t+"-"+o,e&&(this.storeBusinessHours=e.toString())},saveShopInfo:function(){var t,o=this,s=e.getStorageSync("user");s&&(t=s.servicerUserId);var r=this.storePictures.toString();this.isSubmitAll&&this.$http.request({url:"/api/store/saveStoreInfo",data:{servicerUserId:t,storeName:this.storeName,storePhoneNumber:this.storePhoneNumber,storeAddress:this.storeAddress,storeDetailedAddress:this.storeDetailedAddress,storeLongitude:this.storeLongitude,storeLatitude:this.storeLatitude,storeBusinessHours:this.storeBusinessHours,storeLogoPictureLink:this.storeLogoPicture,storePictureLinks:r,storeCarHeadPictureLink:this.storeCarHeadPicture,storeCarNumberPlatePictureLink:this.storeCarNumberPlatePicture,storeBusinessLicensePictureLink:this.storeBusinessLicensePicture,storeSpecialIndustryLicensePictureLink:this.storeSpecialIndustryLicensePicture,storeIntroduction:this.storeIntroduction},success:function(t){if(console.log(t),t){var s=t.data.storeId;e.setStorageSync("storId",s),1e5==t.data.code&&(o.$api.showToast("提交成功"),setTimeout(function(){e.navigateTo({url:"../addStoreManager/addStoreManager"})},2e3))}}})},getCo:function(){e.chooseLocation({success:function(e){console.log(e)}})}}};t.default=n}).call(this,o("543d")["default"])},3351:function(e,t,o){"use strict";var s=o("8a9e"),r=o.n(s);r.a},"8a9e":function(e,t,o){},e9c6:function(e,t,o){"use strict";var s=function(){var e=this,t=e.$createElement;e._self._c},r=[];o.d(t,"a",function(){return s}),o.d(t,"b",function(){return r})},ecee:function(e,t,o){"use strict";o.r(t);var s=o("2e70"),r=o.n(s);for(var i in s)"default"!==i&&function(e){o.d(t,e,function(){return s[e]})}(i);t["default"]=r.a}},[["4c04","common/runtime","common/vendor"]]]);