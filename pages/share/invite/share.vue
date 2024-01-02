<template>
	<div class="share-box">
		<image style="width: 100%;" src="/static/share/bg.png" mode="aspectFill"></image>
		
		<div class="shadow-box"></div>
		
		<div class="code-box">
			<text>分享我的邀请码</text>
			<span>可以通过复制功能分享给你的好友</span>
			<div class="code-content">
				<p class="code">{{copyContent}}</p>
				<u-button type="primary" @click="copyText">复制</u-button>
			</div>
		</div>
		
		<div class="menu-box">
			
			<div class="menu-item" v-for="(item,index) in menus" :key="index" @click="() => naviage(item)">
				<u-icon :name="item.icon"></u-icon>
				<p>{{item.title}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getShareCode
	} from "@/api/user/index.js";
	export default {
		data() {
			return {
				copyContent: 'ZQEECC',
				menus: [
					{
						title: '加入团长',
						icon: 'plus',
						type:'tuan'
					},
					{
						title: '加入达人',
						icon: 'plus',
						type: 'da'
					}
				]
			}
		},
		methods: {
			copyText(e) {
			    console.log(e)
				uni.setClipboardData({
					data: this.copyContent,
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
					}
				});
			},
			// 获取邀请码
			async getCode() {
				try{
					const res = await getShareCode()
					console.log('sharecode============', res)
					if(res.data && res.data.success && res.data.code == 200) {
						this.copyContent = res.data.result
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			naviage(item) {
				uni.navigateTo({
					url: `/pages/share/join?type=${item.type}`
				})
			}
		},
		onLoad() {
			this.getCode()
		}
	}
</script>

<style scoped>
	.share-box {
		/* background-image: url('../../../static/share/bg.png');
		background-repeat: no-repeat;
		background-position: center; */
		position: relative;
		display: flex;
		justify-content: center;
	}
	.code-box {
		position: absolute;
		top: 90%;
		width: 85%;
		min-height: 200rpx;
		border-radius: 40rpx;
		background-color: #fff;
		padding: 20rpx;
		display: flex;
		align-items: center;
		text-align: center;
		flex-direction: column;
		box-shadow: 0 0 16rpx -8rpx #555;
	}
	.code-box text {
		font-size: 36rpx;
		margin-bottom: 16rpx;
		font-weight: bold;
	}
	.code-box span {
		color: #979797;
		margin-bottom: 48rpx;
	}
	.code-content {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.code-content .code {
		font-size: 48rpx;
		/* word-spacing: 8rpx; */
		letter-spacing: 8rpx;
		margin-right: 48rpx;
		background-color: #f2f2f2;
		padding: 12rpx;
		box-sizing: border-box;
		border-radius: 12rpx;
		font-weight: bold;

	}
	.shadow-box {
		position: absolute;
		top: 40%;
		width: 100%;
		height: 200px;
		background-color: #e0e9fe;
		box-shadow: 0px 20rpx 20rpx -8rpx #e0e9fe;
		z-index: -1;
	}
	
	.menu-box {
		position: absolute;
		top: 170%;
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
		justify-content: center;
		align-items: center;
		padding: 12rpx;
	}
	.menu-box .menu-item .title {
		font-size: 32rpx;
		color: #555;
		font-weight: bold;
	}
</style>