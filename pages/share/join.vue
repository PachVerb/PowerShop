<template>
	<view>
		<u-navbar back-text="返回" :title="title"></u-navbar>
		<view class="content">
			<u-form :model="form" ref="uForm">
				<u-form-item label="邀请码" prop="shareCode">
					<u-input placeholder="输入邀请码" v-model="form.shareCode" />
				</u-form-item>
			</u-form>
			<u-button @click="submit" type="primary">提交</u-button>
		</view>
	</view>
</template>

<script>
	import {
		setRole
	} from "@/api/user/index.js";
	export default {
		data() {
			return {
				title: '',
				rules: {
					shareCode: [
						{
							required: true,
							message: '请输入邀请码',
							trigger: ['blur', 'change']
						}
					]
				},
				form: {
					shareCode: ''
				},
				closeType: ''
			}
		},
		onLoad(query) {
			console.log(query)
			this.title = query.type != 'tuan' ? '注册达人' : '注册团长'
			this.closeType = query.type
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid) {
						setRole(this.form).then(res => {
							if(res.data.code ==200 && res.data.success) {
								uni.showToast({
									title: this.title,
									icon:'success',
									complete() {
										uni.redirectTo({
											url: `/pages/share/cheer?type=${this.closeType}`
										});
									}
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style scoped>
	.content {
		padding: 12px;
	}
</style>