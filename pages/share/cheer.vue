<template>
	<view class="page">
		<!-- <div class="menu-box">
			<div class="menu-item" v-for="(item,index) in menus" :key="index" @click="() => naviage(item)">
				<u-icon :name="item.icon"></u-icon>
				<p class="title">{{item.title}}</p>
			</div>
		</div> -->
		<u-cell-group>
			<u-cell-item :icon="item.icon" :title="item.title" v-for="(item,index) in menus" :key="index" @click="() => naviage(item)"></u-cell-item>
		</u-cell-group>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				menus: [
					{
						title: '加入团长',
						icon: 'account',
						type:'tuan'
					},
					{
						title: '加入达人',
						icon: 'account',
						type: 'da'
					}
				]
			}
		},
		onLoad(query) {
			const {type} = query
			// 注册成功，关闭当前入口
			if(type) {
				this.menus = this.menus.filter(d => d.type != type)
			}
		},
		methods:{
			naviage(item) {
				uni.navigateTo({
					url: `/pages/share/join?type=${item.type}`
				})
			}
		}
		
	}
</script>

<style scoped>
	.page {
	/* 	display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh; */
	}
	.menu-box {
		width: 85%;
		min-height: 200rpx;
		border-radius: 20rpx;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		align-items: center;
		text-align: center;
		justify-content: center;
		/* flex-direction: column; */
		box-shadow: 0 0 16rpx -8rpx #555;
	}
	.menu-box .menu-item {
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12rpx;
		margin-right: 48rpx;
		box-shadow: 0 0 16rpx -8rpx #555;
		border-radius: 8rpx;
	}
	.menu-box .menu-item .title {
		font-size: 28rpx;
		color: #555;
		font-weight: bold;
		margin-top: 8rpx;
	}
</style>