<template>
	<view>
		<view
			id="_drag_button"
			class="drag"
			:style="'left: ' + left + 'px; top:' + top + 'px;'"
			@touchstart="touchstart"
			@touchmove.stop.prevent="touchmove"
			@touchend="touchend"
			
			:class="{transition: isDock && !isMove }"
		>
		<view class="carbox" @click="show">
			<view class="addIcon" :animation="animationData" >
				<text>{{cartnum}}</text>
				<image :src="mainImg" mode="aspectFill" class="mainimg"></image>
			</view>
			<view class="menu" v-if="isShow" :class="{menuleft:postitionName,menuright:!postitionName}" :style="{top:(top-37)+'px'}"   @tap="menuClick(1)" >
				<image :src="imgLists[0]" mode="aspectFill" class='menuimage'></image>
			</view>
			<view class="menu" v-if="isShow"  :style="{top:(top-70)  +'px'}"  @tap="menuClick(2)">
				<image :src="imgLists[1]" mode="aspectFill" class='menuimage'></image>
			</view>
		</view>
		
<!-- :class="{menu0:!isShow,menu2:isShow ,menu2R:isShow ,menu0R:!isShow }" 
:class="{menu0:!isShow,menu1:isShow ,menu1R:isShow ,menu0R:!isShow}" -->
<!-- :style="{top:(top-53)+'px'}"
:style="{top:(top-75)  +'px'}" -->
		</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		name: 'drag-button',
		props: {
			isDock:{
				type: Boolean,
				default: false
			},
			existTabBar:{
				type: Boolean,
				default: false
			},
			cartnum:{
				type: String,
				default: ''
			},
			imgLists:{
				type:Array
			},
			mainImg:{
				type:String,
				default:"../../static/customer.png"
			},
			storeId: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				top:0,
				left:0,
				width: 0,
				height: 0,
				offsetWidth: 0,
				offsetHeight: 0,
				windowWidth: 0,
				windowHeight: 0,
				isMove: true,
				edge: 10,
				text: '',
				isShow:false,
				animationData:'',
				postitionName:false//代表右边
			}
		},
		mounted() {
			const sys = uni.getSystemInfoSync();
			
			this.windowWidth = sys.windowWidth;
			this.windowHeight = sys.windowHeight;
			
			// #ifdef APP-PLUS
				this.existTabBar && (this.windowHeight -= 50);
			// #endif
			if (sys.windowTop) {
				this.windowHeight += sys.windowTop;
			}
			console.log(sys)
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#_drag_button').boundingClientRect(data => {
				this.width = data.width;
				this.height = data.height;
				this.offsetWidth = data.width / 2;
				this.offsetHeight = data.height / 2;
				this.left = this.windowWidth - this.width - this.edge;
				this.top = this.windowHeight - this.height - this.edge;
			}).exec();
		},
		methods: {
			menuClick:function(index){
				this.$emit("menuClick",index);
			},
			show:function(){
				// this.isShow = !this.isShow;
				// this.spred();
				this.contact()
			},
			contact(storeId = '1743985169242599426'){
			  this.$options.filters.talkIm(this.storeId || '1743985169242599426')
			},
			spred:function(e){
				var animation = uni.createAnimation({
				  duration: 200,
				  timingFunction: 'ease',
				});
				this.animationData = animation.export();
				
				if(this.isShow){
					animation.rotate(135).step();
				}
				else{
					animation.rotate(0).step();
				}
				this.animationData = animation.export();
			},
			
			touchstart(e) {
				
				this.$emit('btnTouchstart');
			},
			touchmove(e) {
				// 单指触摸
				if (e.touches.length !== 1) {
					return false;
				}
				this.isMove = true;
				this.isShow=false
				this.spred()
				this.left = e.touches[0].clientX - this.offsetWidth;
				
				let clientY = e.touches[0].clientY - this.offsetHeight;
				// #ifdef H5
					clientY += this.height;
				// #endif
				let edgeBottom = this.windowHeight - this.height - this.edge;
 
				// 上下触及边界
				if (clientY < this.edge) {
					this.top = this.edge;
				} else if (clientY > edgeBottom) {
					this.top = edgeBottom;
				} else {
					this.top = clientY
				}
				
			},
			touchend(e) {
				if (this.isDock) {
					let edgeRigth = this.windowWidth - this.width - this.edge;
					
					if (this.left < this.windowWidth / 2 - this.offsetWidth) {
						this.left = this.edge;
					} else {
						this.left = edgeRigth;
					}
					if(this.left>200){
						this.postitionName=false
					}else{
						this.postitionName=true
					}
				}
				
				this.isMove = false;
				
				this.$emit('btnTouchend');
			},
		}}
</script>
 
<style>
	.drag {
		display: flex;
		justify-content: center;
		align-items: center;
		
		color: $uni-text-color-inverse;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		font-size: $uni-font-size-sm;
		position: fixed;
		z-index: 999999;
		
		
	}
	.drag .transition {
		transition: left .3s ease,top .3s ease;
	}
	.carbox{
		position: relative;
	}
	.carbox text{
		color: #fff;
		position: absolute;
		right: -10rpx;
		top: -15rpx;
	}
	.mainimg{
		width: 96upx;
		height: 96upx;
	}
	.menuimage {
		width: 80rpx;
		height: 80rpx;
		z-index: 99;
		margin: 20rpx;
	}
	.menu{
		color:white;
		position: fixed;
		width: 96upx;
		height: 96upx;
		border-radius: 50%;
	}
	.menuleft{
		left:128rpx
	}
	.menuright{
		right:128rpx
	}
</style>