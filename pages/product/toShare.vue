<template>
	<view class="page" :class="{finish:  orderDetail.order && orderDetail.order.payStatus=='PAID' }">
		<u-navbar title="石能科技" :is-back="false"></u-navbar>
		<!-- 用户信息 -->
		<view class="user-info-wrap" v-if=" orderDetail.order && orderDetail.order.payStatus=='UNPAID'">
			<u-avatar class="avater" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"></u-avatar>
			<text class="title-tips">hi, 你和我只有一步距离~</text>
		</view>
		
		
		<view class="orderCard" v-if=" orderDetail.order && orderDetail.order.payStatus=='UNPAID'">
			<view class="order-price">
				代付金额<br/>
				<text class="dot">￥</text>
				<text class="price">{{price}}</text>
				</view>
			
			<!-- 分享 -->
			<button class="share-btn" type="primary" @click="() => pay(sn)">为好友买单</button>
			
			<view class="devider"></view>
			
			<!-- 订单信息 -->
			<view class="order-info" v-if=" orderDetail.order && orderGoodsList.length">
				<view class="order-item" v-for="(item, idx) in orderGoodsList" :key="idx">
					 <image class="order-image" mode="aspectFit" :src="item.image"></image>
					<view class="order-desc">
						<view class="desc-wrap">
							{{item.goodsName || '-'}}
						</view>
						<view class="pro-total">
							<view>￥{{item.goodsPrice || '0'}}</view>
							<view>x{{item.subTotal || '0'}}</view>
						</view>
					</view>
				</view>
				
				
				
			</view>
			
			<u-empty v-else text="暂无订单数据" mode="data"></u-empty>
			
		</view>
		
		<u-empty text="订单已完成" mode="order" v-if=" orderDetail.order && orderDetail.order.payStatus=='PAID'"></u-empty>
	</view>
</template>

<script>
	import { getOrderCDetail } from "@/api/order.js";
	import LiLiWXPay from "@/js_sdk/lili-pay/wx-pay.js";
	export default {
		data() {
			return {
				sn: '',
				price:'00.00',
				orderGoodsList: [],
				orderDetail: {},
				order: '',
				orderNo: '',
				price: 0
			}
		},
		onLoad(query) {
			console.log('query==========',query)
			const {sn, price, order} = query
			this.sn = sn
			this.orderNo=order
			this.price = price || '00.00'
			
			this.loadData(this.orderNo)
		},
		methods: {
			loadData(sn) {
			  uni.showLoading({
			    title: "加载中",
			  });
			  getOrderCDetail(sn).then((res) => {
			    const order = res.data.result;
			    this.order = order.order;
			    this.orderGoodsList = order.orderItems;
			    this.orderDetail = res.data.result || {};
			     if (this.$store.state.isShowToast){ uni.hideLoading() };
			  });
			},
			pay(sn) {
				console.log(this.sn, this.price)
			  new LiLiWXPay({
				sn: this.sn,
				price: this.price,
			  }).pay();
			}
		},
		mounted() {
			// this.loadData(this.orderNo)
		}
	}
</script>

<style scoped>
.page {
	width: 100%;
	min-height: 100vh;
	background-color: #ccc;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.title-tips {
	font-size: 32rpx;
	color: #fff;
	padding: 24rpx 0 50rpx 0;
}
.orderCard {
	width: 95%;
	min-height: 300rpx;
	border-radius: 24rpx;
	background-color: #fff;
	position: absolute;
	top: 20%;
	padding: 24rpx
}
.orderCard .share-btn {
	margin-top: 24rpx;
}
.orderCard .order-price {
	font-size: 32rpx;
	text-align: center;
}
.order-price .dot {
	font-weight: bold;
}
.order-price .price {
	color: #000;
	font-size: 80rpx;
	font-weight: bold;
}
.user-info-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 400rpx;
	background-color: red;
	width: 100%;
}
.user-info-wrap .avater {
	margin-top: 24rpx;
}
.devider {
	border-top: 0.5px solid #ccc;
	margin: 24rpx 0;
}
.order-info .order-item {
	display: flex;
	border-bottom: 1px solid #ccc;
	margin-bottom: 8px;
}
.order-item .order-image {
	width: 250rpx;
	height: 250rpx;
}
.order-item .order-desc {
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
}
.order-item .order-desc .desc-wrap {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.order-item .order-desc .pro-total {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 16rpx;
	color: red;
}

.finish {
	background-color: #fff !important;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>