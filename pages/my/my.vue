<template>
	<view>
		<view class="myhome">
			<!-- 已登录 -->
			<view class="wx-name" v-if="wxlogin">
				<view>
					<image :src="usering.avatarUrl"></image>	
				</view>
				<view class="wx-text">
					<text>{{usering.nickName}}</text>
				</view>
			</view>
			<!-- </block> -->
			<!-- 未登录 -->
			<view class="wx-button" v-if="!wxlogin">
				<view class="wx-button-view">登录美团外卖，开启吃货旅程</view>
				<view>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登录</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	 // post请求
	import {publicing} from '../../api/api.js'
	 // 请求地址
	import {wxloginurl} from '../../api/request.js'
	//引入类
	let logins = require('../../login/login.js')
	var {log} = console
	export default{
		data(){
			return{
				wxlogin: true,
				usering:{}
			}
		},
		methods:{
				// 获取头像昵称
						getUserInfo(event){
							log(event)
							let wxing = event.detail.userInfo
							// 实例化类
							const logclass = new logins(wxing)
							// 实例化类之后。可以访问类中的方法和属性
							logclass.listing()
							.then((res)=>{
								log(res)
								this.ifUser()
							})
							.catch((err)=>{
								log(err)
							})
			
						},
						
						// 是否已登录
						ifUser(){
							let setdata = uni.getStorageSync('usermen')
							if(!setdata){
								this.wxlogin = false
							}else{
								this.wxlogin = true
								this.usering = setdata
							}
						}
						
					},
					
					onShow() {
						log('每次都执行')
						this.ifUser()
					}
	}
</script>

<style scoped>
	.myhome{background: linear-gradient(to top, #ffe566 10%, #ffd300 100%); height: 350upx; display: flex; align-items: center;}
	.wx-name image{width: 120upx !important; height: 120upx !important; border-radius: 50%; margin-right: 20upx;
					border: 10rpx solid #999999;}
	text{display: block; margin: 10upx 0; color: #999999;}
	.wx-name{display: flex; align-items: center; padding: 0 30upx; align-content: center;
			height: 200upx;}
	.wx-text text{font-size: 35upx;}
	/* 登录 */
	.wx-button button{border: none;font-size: 30upx; background: linear-gradient(to right, #28a6f1 10%, #0e8dd7 80%);
	 border-radius: 50upx;
	color: #FFFFFF;}							
	.wx-button-view{font-size: 35upx; color: #FFFFFF; margin-bottom: 25upx;}
	.wx-button{margin: 0 auto;}
</style>
