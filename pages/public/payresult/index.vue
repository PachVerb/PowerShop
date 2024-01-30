<template>
	<view class="page">
		<u-navbar :is-back="false" :border-bottom="false" title=" " background="#202020"></u-navbar>
		<view class="content">
			<view class="tip">
				<view class="top-tip">
					<image src="https://powershop-1323249886.cos.ap-nanjing.myqcloud.com/asset/payres.png" mode="widthFix"></image>
					<view>
						支付成功
					</view>
				</view>
				
				<view class="price-wrap">
					<text class="unit">￥</text>
					<text class="price">{{query.payPrice}}</text>
				
				</view>
				
			</view>
			
			<view>
				<navigator target="miniProgram" open-type="exit" >
					<button @click="forwordTo" @tap="forwordTo" class="btn">完成</button>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			query: {}
		}
	},
	onLoad(query) {
		this.query = query
	},
	methods: {
		forwordTo() {
			uni.navigateTo({
				url: "/pages/cart/payment/success?paymentMethod=" +
				this.query.paymentMethod +
				"&payPrice=" +
				this.query.payPrice+
				"&orderType="+this.query.orderType 
			});
		}
	}
} 
</script>

<style scoped>
	.page {
		background-color: #202020;
		height: 100vh;
	}
	.content {
		height: calc(100vh - 88rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.btn {
		width: 400rpx;
		background-color: #2e2e2e;
		margin: auto;
		color: #cdcdcd;
	}
	.tip {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #00b967;
		font-size: 30rpx;
		justify-content: space-around;
	}
	.tip .top-tip {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.tip image {
		width: 50rpx;
		height: 50rpx;
	}
	.price-wrap {
		text-align: center;
		margin-top: 120rpx;
	}
	.price {
		text-align:center;
		font-size: 100rpx;
		font-weight: bolder;
		color: #fff;
	}
	.unit {
		font-size: 50rpx;
		font-weight: bold;
	}
</style>