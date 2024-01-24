<template>
	<view class="page">
		<!-- <u-navbar :custom-back="handleBack" back-text="返回" title="商家端"></u-navbar> -->
		<web-view :webview-styles="webviewStyles"  src="https://fzsnkj.cn/store"></web-view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				webviewStyles: {
					
				}
			}
		},
		methods: {
			handleBack() {
				uni.redirectTo({
					url: '/pages/tabbar/home/index'
				})
			}
		},
		onReady() {
		    var currentWebview = this.$scope.$getAppWebview().children()[0];
		    currentWebview.addEventListener("loaded", function() {
		      currentWebview.evalJS(
		        "$(\"ul.fed-part-rows a[href*='resource.i847.cn']\").parent().hide();"
		      );
		    });
		  },
		  onBackPress(e) {
			this.$scope
			  .$getAppWebview()
			  .children()[0]
			  .back();
			return true;
		  }
	}
</script>

<style>
	
</style>