<template>
	<view class="page" :class="{finish: orderDetail.order.payStatus=='PAID' }">
		<u-navbar title="石能科技" :is-back="false"></u-navbar>
		
		<!-- 用户信息 -->
		<view class="user-info-wrap" v-if="orderDetail.order.payStatus=='UNPAID'">
			<u-avatar class="avater" src="http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg"></u-avatar>
			<text class="title-tips">代付订单已创建成功, 发给好友帮你付款吧~</text>
		</view>
		
		
		<view class="orderCard" v-if="orderDetail.order.payStatus=='UNPAID'">
			<view class="order-price">
				代付金额<br/>
				<text class="dot">￥</text>
				<text class="price">{{price}}</text>
				</view>
			

			<button class="share-btn" type="primary" open-type="share">发送给微信好友</button>
			
			<view class="devider"></view>
			

			<view class="order-info" v-if="orderGoodsList.length">
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
		
		
	</view>
</template>

<script>
	import { getOrderCDetail } from "@/api/order.js";
	export default {
		data() {
			return {
				sn: '',
				price:'00.00',
				orderGoodsList: [],
				orderDetail: {},
				order: '',
				orderNo: ''
			}
		},
		onLoad(query) {
			console.log('query==========',query)
			const {orderNo, sn, price} = query
			this.orderNo = 'T202401071743712269931384832' || sn 
			this.sn = 'T202401071743712269931384832' || sn
			this.price = price || '00.00'
		},
		onShareAppMessage() {
			return {
				title: 'admin',
				path: `/pages/product/toShare?sn=${this.sn}&price=${this.price}&order=${this.orderNo}`,
				// imageUrl:'https://v1.uviewui.com/common/logo.png',
				// desc: '邀请你付款'
			}
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
			    this.orderDetail = res.data.result;
			     if (this.$store.state.isShowToast){ uni.hideLoading() };
			  });
			},
		},
		mounted() {
			this.loadData(this.orderNo)
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