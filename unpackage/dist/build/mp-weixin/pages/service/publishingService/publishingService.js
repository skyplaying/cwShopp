(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/publishingService/publishingService"],{2455:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i={data:function(){return{isok:!1,selectext:"",goodStatus:["全部","已上架","已下架"],serviceState:"",isSelect:!1,putUp:"color:#0E5E56;border:1px solid #0E5E56",putDown:"color: #D92B2B;border:1px solid #D92B2B",modelList:[{name:"{模板可编辑}接送服务",num:2,price:"200",putActive:!1,url:"../addService/pickUpModel/pickUpModel"},{name:"{模板可编辑}冷冻服务",price:"200",num:3,putActive:!1,url:"../addService/usualModel/freezeModel"},{name:"{模板可编辑}清洁服务",price:"200",num:4,putActive:!1,url:"../addService/usualModel/freezeModel",type:"clean"},{name:"{模板可编辑}仪式服务",price:"200",num:5,putActive:!1,url:"../addService/riteModel/riteModel"}],servicesInfo:""}},onLoad:function(){this,this.init()},methods:{addService:function(){e.navigateTo({url:"../addService/addService"}),e.navigateTo({url:"../addService/riteModel/riteModel"})},btnColor:function(e){console.log(e)},init:function(){this.$api.showLoading(),this.selectAllService(),this.$api.showLoading()},toModelPage:function(t){e.navigateTo({url:t.url+"?type="+t.type})},selectAllService:function(){var t=this;this.storeId=e.getStorageSync("storeId");var i=this.storeId;console.log(this.storeId),this.$api.selectServiceByStoreAndState({storeId:i,serviceState:this.serviceState||""}).then(function(i){console.log(i),(i.data.code=1e5)&&(t.servicesInfo=i.data.servicesInfo,t.isok=!0,e.hideLoading())})},selectService:function(e){var t=this;e&&(this.selectext=e,setTimeout(function(){t.isSelect=!1},100),"已上架"==e?this.serviceState=1:"已下架"==e?this.serviceState=2:"全部"==e&&(this.serviceState=""),this.selectAllService())},putService:function(t){var i=this;this.lowerShelfService(t),2==t.serviceState&&e.showModal({content:"确定要上架此服务吗",success:function(e){e.confirm&&i.$api.upperShelfService({serviceId:t.serviceId}).then(function(e){console.log(e),(e.data.code=1e5)&&(i.$api.showToast("上架成功"),i.selectAllService())})}}),console.log(t),t.putActive=!t.putActive},lowerShelfService:function(t){var i=this;1==t.serviceState&&e.showModal({content:"确定要下架此服务吗",success:function(e){e.confirm&&i.$api.lowerShelfService({serviceId:t.serviceId}).then(function(e){console.log(e),(e.data.code=1e5)&&(i.$api.showToast("下架成功"),i.selectAllService())})}})},deleteService:function(t){var i=this;e.showModal({content:"确定要删除此服务吗",success:function(e){e.confirm&&i.$api.deleteService({serviceId:t}).then(function(e){1e5==e.data.code&&(i.$api.showToast("删除成功"),i.selectAllService())})}})},editor:function(t){console.log(t),e.setStorageSync("editService",t),t&&e.navigateTo({url:"../addService/addService?type=update"})}}};t.default=i}).call(this,i("543d")["default"])},"34c8":function(e,t,i){"use strict";i.r(t);var o=i("6648"),c=i("e074");for(var n in c)"default"!==n&&function(e){i.d(t,e,function(){return c[e]})}(n);i("893d");var r=i("2877"),s=Object(r["a"])(c["default"],o["a"],o["b"],!1,null,null,null);t["default"]=s.exports},6648:function(e,t,i){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.isSelect=!0})},c=[];i.d(t,"a",function(){return o}),i.d(t,"b",function(){return c})},"893d":function(e,t,i){"use strict";var o=i("9168"),c=i.n(o);c.a},9168:function(e,t,i){},e074:function(e,t,i){"use strict";i.r(t);var o=i("2455"),c=i.n(o);for(var n in o)"default"!==n&&function(e){i.d(t,e,function(){return o[e]})}(n);t["default"]=c.a}},[["924c","common/runtime","common/vendor"]]]);