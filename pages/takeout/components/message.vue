<template>
	<view class="message-view">
		<!-- 分类 -->
		<view v-if="enptylist">
			<view class="menu-block">
				<block v-for="(item,index) in tabmessage" :key="index">
					<view :class="{activetext: index == num}" @click="menubtn(index,item)">{{item}}</view>
				</block>	
			</view>
			<!-- 评价 -->
			<block v-for="(item,index) in leaveword" :key="index">
			<view class="message-dist">
				<view class="users-message">
					<view class="cont-name">
						<image :src="item.avatarUrl" mode="widthFix"></image>	
						<text>{{item.nickName}}</text>
					</view>
					<!-- 时间 -->
					<view class="message-time">
						{{item.time}}
					</view>
				</view>	
				<view class="cont-name-text">
					<text>{{item.usermess}}</text>
				</view>
			</view>
			</block>
		</view>
		<!-- 没有评论的情况 -->
		<view class="claenpty" v-if="!enptylist">该商家还没有商品评论哦!</view>
	</view>
</template>

<script>
	export default{
		props:{
			messagedata:Array,
			tabmessage:Array,
			empty:String
		},
		data() {
			return {
				num:0,
				// 评论内容
				leaveword: [],
				enptylist:false
			}
		},
		
		methods:{
			// 评价分类
			menubtn(index,item){
				this.num = index
				// 子组件调用父组件某个函数去发送请求
				this.$parent.messageMethod(item)
			}
		},
		
		watch:{
			messagedata(newValue,oldValue){
				this.enptylist = true
				// console.log(newValue)
				let leaveword = newValue.map((item)=>{
					return item.messagedata
				})
				// console.log(leaveword)
				this.leaveword = leaveword
			},
			
			// 评论为空
			empty(newValue,oldValue){
				console.log(newValue)
				this.enptylist = false
			}
			
		}
	}
</script>

<style scoped>
	.message-view{margin: 0 20upx 100upx 20upx;}
	.activetext{color: #4CD964; background: #ffdd00 !important; border: 1px solid #ffdd00 !important;}
	.menu-block view {
		background: #ffffff;
		border: 1px solid #c2c5cc;
		border-radius: 6upx;
		font-size: 25upx;
		color: #292c33;
		font-weight: bold;
		text-align: center;
		padding: 15upx;
		margin: 10upx 15upx 5upx 0;
	}
	
	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		/* margin-bottom: 20upx; */
	}
	/* 评价 */
	 .users-message{display: flex; justify-content: space-between; height: 50upx; align-items: center; margin-bottom: 15upx;}
	 .message-time{font-size: 25upx; color: #a8a8a8;}
	 .cont-name image{width: 50upx !important; height: 50upx !important; border-radius: 50%; margin-right: 9upx;}
	 .cont-name text{font-size: 30upx; color: #a8a8a8;}
	 .cont-name{display: flex; align-items: center; height: 50upx;}
	 .cont-name-text text{font-size: 27upx; color: #333333; line-height: 1.5;
	 display: -webkit-box;
	 -webkit-box-orient: vertical;
	 -webkit-line-clamp: 2;
	 overflow: hidden;}
	 .message-dist{margin-top: 30upx; border-bottom: 1rpx solid #f8f8f8;
	 padding-bottom: 25upx;}
	 /* 没有评价 */
	 .claenpty{font-size: 30upx; color: #cccccc; text-align: center;
	 padding-top: 40upx;}
</style>

