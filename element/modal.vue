<template>
	<view>
		<view class="warp" v-if="modaishow">
			<view class="warp-view">
				<view class="warp-text">请登陆后再操作</view>
				<view class="warp-flex">
					<button @click="messcancel()" plain="true">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
				</view>
			</view>
		</view>
		<!-- 提示组件 -->
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages" @clickMessage="clickMessage"></HMmessages>
	</view>
</template>

<script>
	var {
		log
	} = console
	import {
		publicing
	} from "@/api/api.js"
	import {
		wxloginurl
	} from '@/api/request.js'
	// 引入提示组件
	import HMmessages from "@/components/HM-messages/HM-messages.vue"
	//引入类
	// let logins = require('../login/login.js')
	export default {
		components: {HMmessages},
		data() {
			return {
				modaishow: false
			}
		},

		methods: {
			// 显示
			init() {
				this.modaishow = true
			},
			// 取消
			messcancel() {
				this.modaishow = false
			},

			//获取头像和昵称
			getUserInfo(event) {
				log(event)
				if (event.detail.userInfo) {
					let wxing = event.detail.userInfo
					this.wxCode(wxing.avatarUrl, wxing.nickName)
				}
				this.messcancel()
			},
			//获取code
			wxCode(avatarUrl, nickName) {
				wx.login({
					success: (res) => {
						log(res)
						let code = res.code
						this.wxLogin(avatarUrl, nickName, code)
					},
					fail: (err) => {
						log(err)
					}
				})
			},
			//请求后端登录
			wxLogin(avatarUrl, nickName, code) {
				let data = {
					appid: 'wx81a0f57187f6fda9',
					secret: 'dfb0542f4581f6b65e94dd93bf6de42d',
					avatarUrl,
					nickName,
					code
				}
				publicing(wxloginurl, data)
					.then((res) => {
						console.log(res)
						if (res.data.msg === 'success') {
							//存入本地
							uni.setStorageSync('usermen', res.data.datas)
							let succ = '登录成功'
							let ico = 'success'
							this.tIps(succ,ico)
						}
					})
					.catch((err) => {
						log(err)
						let succ = '登录失败'
						let ico = 'error'
						this.tIps(succ,ico)
					})
			},
         // 提示
         	tIps(succ,ico){
         			this.HMmessages.show(succ,{icon:ico,fontColor:"#ffffff",iconColor:"#ffffff",background:"rgba(102,0,51,0.8)"})
         		}

		}
	}
</script>

<style scoped>
	/* 模态弹窗布局 */
	.warp {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999;
	}

	.warp-view {
		width: 500upx;
		height: 200upx;
		background: #FFFFFF;
		margin: auto;
		position: absolute;
		-webkit-position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 8upx;
		overflow: hidden;
	}

	.warp-text {
		text-align: center;
		margin-top: 30upx;
		font-size: 34upx;
		color: #666666;
	}

	.warp-flex {
		display: flex;
		justify-content: space-around;
		border-top: 1upx solid #EEEEEE;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80upx;
		line-height: 80upx;
	}

	.warp-flex button {
		border: none;
		font-size: 30upx;
	}
</style>
