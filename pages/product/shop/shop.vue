<template>
	<view class="page" :style="{'align-items':storeList.length ? 'flex-start' : 'center', 'flex-direction':storeList.length ? 'row' : 'column'}">
		<view class="search">
			<view class="search-ipt">
				<u-input class="inputs" placeholder="请输入关键字" v-model="keyword" :border="false" />
			</view>
			<u-button @tap="() => getShop()" @click="() => getShop()" type="primary" size="medium">搜索</u-button>
		</view>
		
		<view class="store-list" v-if="storeList.length">
			<view class="store-item" v-for="(item, idx) in storeList" :key="idx" @click="() => navigetToStore(item)" @tab="() => navigetToStore(item)">
				<u-image width="100%" height="300rpx" :src="item.src" mode="aspectFill"></u-image>
				
				<view class="desc">
					<view class="title">
						{{item.storeName}}
						<!-- {{item.memberName}} -->
					</view>
					<view class="time">
						{{item.createTime}}
					</view>
					<view></view>
				</view>
			</view>
		</view>
		<u-empty v-else text="数据为空" mode="list"></u-empty>
	</view>
</template>

<script>
import * as API_store from "@/api/store.js";
import mSearch from '@/components/m-search-revision/m-search-revision.vue';
export default {
	data() {
		return {
			
			keyword: '',
		
			storeList: [],
			init: false
		}
	},
	components: {
		mSearch,
	},
	methods: {
		async getShop() {
			// if(this.init && !this.keyword) {
			// 	return uni.showToast({
			// 		title:'请输入关键字',
			// 	})
			// }
			uni.showLoading({
				title: '加载中'
			});
			try{
				const res = await API_store.getCStoreList({
					keyword: this.keyword
				})	
				
				if(res.data && res.data.result) {
					this.storeList = res.data.result.map(d => {
						return {
							...d,
							src: d.storeLogo
						}
					})
					console.log(res, this.storeList)
				}
			}catch(e){
				console.log(e)
				//TODO handle the exception
			} finally {
				uni.hideLoading()
			}
		},
		doSearch() {
			console.log(1111)
		},
		navigetToStore(item) {
			uni.navigateTo({
				url: `/pages/product/shopPage?id=${item.id}`
			})
		}
	},
	onLoad() {
		console.log('1111111')
		this.getShop()
		this.init = true
	}
}
</script>

<style scoped>
	.page {
		padding: 0 12rpx;
		background-color: #f2f2f2;
		display: flex;
		justify-content: center;
		min-height: 100vh;
		
	}
	.store-list {
		width:100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 130rpx;
	}
	.store-list .store-item {
		width: calc(50% - 5px);
		/* margin-right: 0.5%; */
		flex-shrink: 0;
		margin-bottom: 24rpx;
		border-radius: 24rpx;
		background-color: #fff;
		overflow: hidden;
	}
	.search {
		display: flex;
		padding: 0 12rpx;
		width: 100%;
		position: fixed;
		top: 0;
		
		z-index: 100;
		height: 120rpx;
		align-items: center;
		background-color: #fff;
	}
	.search-ipt {
		width: 90%;
		border-radius: 48rpx;
		background-color: #f2f2f2;
		padding:0 24rpx;
		flex:1;
		margin-right: 12rpx;
	}
	
	.desc {
		padding: 24rpx 12rpx;
		border-top: 1px solid red;
	}
	.desc .title {
		font-size: 28rpx;
		font-weight: bold;
		color: red;
		margin-bottom: 18rpx;
	}
	.desc .time {
		color: #ccc;
		font-size: 28rpx;
	}
	.inputs::placeholder {
	  color: #000; /* 将placeholder文本颜色修改为红色 */
	}
</style>