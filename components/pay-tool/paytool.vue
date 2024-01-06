<template>
	<u-popup v-model="show" mode="bottom" border-radius="14">
		<u-cell-group>
			<u-cell-item v-for="(item, idx) for payM" :key="idx" :icon="item.icon" title="个人设置" @click="() => handleClick(item.type)"></u-cell-item>
		</u-cell-group>
	</u-popup>
</template>

<script>
	export default {
		props: {
			pshow: {
				type: Boolean,
				default() {
					return false
				}
			}
		},
		data() {
			return {
				payM: [
					{
						method: '微信支付',
						icon: 'weixin-fill',
						type: 'weixin'
					},
					{
						method: '好友代付款',
						icon: 'account-fill',
						type: 'dai'
					},
					{
						method: '余额支付',
						icon: 'red-packet-fill',
						type: 'owner'
					}
				]
			}
		},
		methods: {
			handleClick(type) {
				this.$emit('checkMethod', type)
			}
		}
	}
</script>

<style>
</style>