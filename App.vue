<script>
	import Vue from 'vue'
	import api from '@/common/http/'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "./common/iconfont.css";
	@import './common/mc_base.css';

	page {
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		line-height: 1.5;
		background-color: #eee;
		color: #353535;
		font-size: 32rpx;
		font-family: -apple-system-font, 'Helvetica Neue', Helvetica, 'Microsoft YaHei', sans-serif;
		font-weight: normal;
		word-wrap: break-word;
		/* 单词自动换行 */
	}

	input {
		border-width: 0;
		vertical-align: middle;
		width: 100%;
	}

	image {
		width: 100%;
	}

	.textarea {
		font-size: 28rpx;
		min-height: 200rpx;
	}

	/* 容器 */
	.container {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	/* 页面加载中样式 */
	.container-loading {
		position: relative;
		width: 100%;
		height: 100vh;
		background-color: white;
		box-sizing: border-box;
	}

	.container-loading image {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 170rpx;
		height: 170rpx;
		margin: -170rpx -85rpx;
	}

	/* 格式化btn */
	.formId-btn {
		position: static;
		border: none;
		text-align: inherit;
		padding: 0;
		margin: 0;
		line-height: inherit;
		overflow: visible;
		background-color: transparent;
		font-size: inherit;
		height: auto;
		color: inherit;
		white-space: pre-wrap;
		border-radius: 0;
	}

	.formId-btn::after {
		display: none;
	}

	/*底部按钮盒子*/
	.mc-foot-fixed {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: white;
		border-top: 1px solid #e5e5e5;
		z-index: 19;
		box-sizing: border-box;
	}

	/* 是否同意协议选择框 */
	.mc-agree {
		display: block;
		padding: .5em 15px;
		font-size: 13px;
		color: #999999;
	}

	.mc-agree_checkbox {
		position: relative;
		top: 2px;
		display: inline-block;
		border: 1px solid #D1D1D1;
		background-color: #FFFFFF;
		border-radius: 3px;
		width: 11px;
		height: 11px;
	}

	.mc-agree_checkbox-icon {
		color: #1478E3;
		position: absolute;
		top: 1px;
		left: 1px;
	}
</style>
