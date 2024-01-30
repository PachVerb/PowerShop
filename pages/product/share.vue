<template>
	<view class="page" :class="{finish: orderDetail.order && orderDetail.order.payStatus=='PAID' }">
		
		
		<!-- 用户信息 -->
		<view class="user-info-wrap" v-if=" orderDetail.order && orderDetail.order.payStatus=='UNPAID'">
			<u-avatar class="avater" :src="userinfo.face || 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg'"></u-avatar>
			<!-- <text class="title-tips"><text v-if="userinfo.username">{{userinfo.username}}</text>, 发起了订单代付请求~</text> -->
			<text class="title-tips">发起了订单代付请求~</text>
		</view>
		
		
		<view class="orderCard" v-if=" orderDetail.order && orderDetail.order.payStatus=='UNPAID'">
			<view class="price-info">
				<view class="order-price">
					需付款<br/>
					<text class="dot">￥</text>
					<text class="price">{{price}}</text>
					</view>
				
				<!-- #ifdef MP-WEIXIN -->
				<button class="share-btn" type="primary" open-type="share">发送给微信好友</button>
				<!-- #endif -->
				
				<!-- #ifdef H5 -->
				<button class="share-btn" type="primary" @click="copyText">发送给微信好友</button>
				<!-- #endif -->
				
				
			</view>
			
			
			<!-- <view class="devider"></view> -->
			
			<view class="order-info" v-if="orderGoodsList.length">
				<view class="order-item" v-for="(item, idx) in orderGoodsList" :key="idx">
					 <image class="order-image" mode="aspectFit" :src="item.image"></image>
					<view class="order-desc">
						<view class="desc-wrap">
							{{item.goodsName || '-'}}
						</view>
						<view class="pro-total">
							<view>￥{{item.goodsPrice || '0'}}</view>
							<view>x{{item.num || '0'}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<u-empty v-else text="暂无订单数据" mode="data"></u-empty>
			
			<view class="tip-wrap">
				<view class="tip-title">说明:</view>
				1.代付订单创建成功后180分钟内未付款，订单会自动取消，你可以重新下
				单。</br>
				2.当付款订单退款成功后，实付金额将原路退还付款人。</br>
			</view>
		</view>
		
		<u-empty text="订单已完成" mode="order" v-if=" orderDetail.order && orderDetail.order.payStatus=='PAID'"></u-empty>
	</view>
</template>

<script>
	import { getOrderCDetail } from "@/api/order.js";
	import storage from "@/utils/storage";
	export default {
		data() {
			return {
				sn: '',
				price:'00.00',
				orderGoodsList: [],
				orderDetail: {},
				order: '',
				orderNo: '',
				copyContent: '',
				userinfo:  {},
				tradeSn: ''
			}
		},
		onLoad(query) {
			console.log('shear=======',query)	
			const {orderNo, sn, price} = query
			query.order ? (this.orderNo = query.order || '') : (this.orderNo = sn || '')
			this.sn =  sn || ''
			this.price = price || '00.00'
			this.orderNo = query.order || orderNo
			this.loadData(this.orderNo)
			//#ifdef H5
				this.copyContent = window.location.origin + `/pages/product/toShare?sn=${this.sn}&price=${this.price}&order=${this.orderNo}&tradeSn=${query.tradeSn}`
			//#endif
			
			
			this.userinfo = this.$store.state.userInfo
			//#ifdef H5
				this.tradeSn = query.tradeSn
			//#endif
			
		},
		onShareAppMessage() {
			return {
				path: `/pages/product/toShare?sn=${this.sn}&price=${this.price}&order=${this.orderNo}&face=${this.userinfo.face}`,
				// imageUrl:'https://v1.uviewui.com/common/logo.png',
				// desc: '邀请你付款'
				complete(){
					console.log('分享完成')
					// uni.switchTab({
					// 	url: '/pages/tabbar/home/index'
					// })
					// wx.exitMiniProgram({
					// 	success: function() {
					// 		console.log('退出小程序成功');
					// 	},
					// 	fail: function(err) {
					// 		console.log('退出小程序失败', err);
					// 	}
					// })
				}
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
			    this.orderDetail = res.data.result || {};
			     if (this.$store.state.isShowToast){ uni.hideLoading() };
			  });
			},
			copyText(e) {
			    console.log(e)
				uni.setClipboardData({
					data: this.copyContent,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '已复制链接，快分享给好友吧'
								});
							}
						});
					}
				});
			},
		},
		mounted() {
			// #ifdef MP-WEIXIN
			this.loadData(this.orderNo)
			// #endif
			// #ifdef H5
			this.loadData(this.tradeSn)
			// #endif
		}
	}
</script>

<style scoped>
.page {
	width: 100%;
	min-height: 100vh;
	background-color: #f2f2f2;
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
}
.title-tips {
	font-size: 32rpx;
	color: #000;
	padding: 24rpx 0 50rpx 0;
}
.orderCard {
	width: 95%;
	min-height: 300rpx;
	/* border-radius: 24rpx; */
	/* background-color: #f2f2f2; */
	position: absolute;
	top: 20%;
	/* padding: 24rpx */
}
.orderCard .share-btn {
	margin-top: 24rpx;
	background-color: #ffdd37;
	color: #000
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
	background-color: #ffdd37;
	width: 100%;
}
.user-info-wrap .avater {
	margin-top: 24rpx;
}
.devider {
	border-top: 0.5px solid #ccc;
	margin: 24rpx 0;
}
.order-info {
	border-radius: 24rpx;
	background-color: #fff;
	padding: 24rpx;
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
.pro-list {
	position: absolute;
	top: 40%
}
.price-info {
	background-color: #fff;
	border-radius: 24rpx;
	margin-bottom: 24rpx;
	padding: 24rpx;
}
.tip-wrap {
	margin-top: 50rpx;
	font-size: 14px;
	line-height: 45rpx;
}
.tip-title{
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 12rpx;
}
</style>