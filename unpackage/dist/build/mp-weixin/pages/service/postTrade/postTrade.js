(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/postTrade/postTrade"],{"0a62":function(o,t,e){"use strict";var s=function(){var o=this,t=o.$createElement;o._self._c;o._isMounted||(o.e0=function(t){o.isSelect=!0})},n=[];e.d(t,"a",function(){return s}),e.d(t,"b",function(){return n})},"0f36":function(o,t,e){},3234:function(o,t,e){"use strict";e.r(t);var s=e("0a62"),n=e("5904");for(var d in n)"default"!==d&&function(o){e.d(t,o,function(){return n[o]})}(d);e("ccf9");var i=e("2877"),c=Object(i["a"])(n["default"],s["a"],s["b"],!1,null,null,null);t["default"]=c.exports},5904:function(o,t,e){"use strict";e.r(t);var s=e("80dc"),n=e.n(s);for(var d in s)"default"!==d&&function(o){e.d(t,o,function(){return s[o]})}(d);t["default"]=n.a},"80dc":function(o,t,e){"use strict";(function(o){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{isok:!1,selectext:"",goodStatusList:["全部","已上架","已下架"],goodsState:"",isSelect:!1,putUp:"color:#0E5E56;border:1px solid #0E5E56",putDown:"color: #D92B2B;border:1px solid #D92B2B",modelList:[{name:"{模板可编辑}木质骨灰纪念盒子",price:"199",num:1,putActive:!1}],storeId:"",goodsInfo:""}},onLoad:function(){this,this.init()},methods:{init:function(){this.selectAllGoods(),this.$api.showLoading()},selectAllGoods:function(){var t=this;this.storeId=o.getStorageSync("storeId");var e=this.storeId;console.log(this.storeId),this.$api.selectGoodsByStoreAndState({storeId:e,goodsState:this.goodsState}).then(function(e){console.log(e),(e.data.code=1e5)&&(t.goodsInfo=e.data.goodsInfo,t.isok=!0,o.hideLoading())})},selectService:function(o){var t=this;o&&(this.selectext=o,setTimeout(function(){t.isSelect=!1},100),"已上架"==o?this.goodsState=1:"已下架"==o?this.goodsState=2:"全部"==o&&(this.goodsState=""),this.selectAllGoods())},addGoods:function(){o.navigateTo({url:"../addGoods/addGoods"})},putService:function(t){var e=this;this.lowShelfGoods(t),2==t.goodsState&&o.showModal({content:"确定要上架此商品吗",success:function(o){o.confirm&&e.$api.upperShelfGoods({goodsId:t.goodsId}).then(function(o){console.log(o),(o.data.code=1e5)&&(e.$api.showToast("上架成功"),e.selectAllGoods())})}}),console.log(t),t.putActive=!t.putActive},lowShelfGoods:function(t){var e=this;1==t.goodsState&&o.showModal({content:"确定要下架此商品吗",success:function(o){o.confirm&&e.$api.lowerShelfGoods({goodsId:t.goodsId}).then(function(o){console.log(o),(o.data.code=1e5)&&(e.$api.showToast("下架成功"),e.selectAllGoods())})}})},btnColor:function(o){console.log(o)},deleteService:function(t){var e=this;o.showModal({content:"确定要删除此商品吗",success:function(o){o.confirm&&e.$api.deleteGoods({goodsId:t}).then(function(o){1e5==o.data.code&&(e.$api.showToast("删除成功"),e.selectAllGoods())})}})},editor:function(t){console.log(t),o.setStorageSync("editgoods",t),t&&o.navigateTo({url:"../addGoods/addGoods?type=update"})}}};t.default=e}).call(this,e("543d")["default"])},ccf9:function(o,t,e){"use strict";var s=e("0f36"),n=e.n(s);n.a}},[["dac3","common/runtime","common/vendor"]]]);