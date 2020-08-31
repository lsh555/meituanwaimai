<template>
	<view class="order-no" v-if="modaishow">
			<image src="../../../static/coen/meoyopu.png" mode="widthFix"></image>
			<text>{{tips}}</text>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				tips: '',
				modaishow:false
			}
		},
		methods:{
			init(bull,tips){
				this.modaishow = bull
				this.tips = tips
			}
		}
	}
</script>

<style scoped>
	.order-no{width: 400upx; height: 400upx;
	margin: 90upx auto 0 auto;
	text-align: center;
	font-size: 28upx;}
	.order-no image{display: block;
	width: 250upx; height: 250upx;
	margin: 0 auto;
	padding-bottom: 30upx;
	}
</style>
