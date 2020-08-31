<template>
	<view>
		<view class="business-view">
			<view class="business-take">
				<view class="business-img">
					<image :src="busidata.logo" mode="aspectFill"></image>
				</view>
				<view class="business-right">
					<text class="business-title">{{busidata.shop}}</text>
					<view class="business-time">
						<image src="../../../static/coen/shijian.svg" mode="widthFix"></image>
						<text>配送约{{busidata.duration}}分钟</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			busidata:Object
		}
	}
</script>

<style scoped>
	text{display: block;}
	.business-view{height: 130upx;
	background: linear-gradient(to top, #ffe566 10%, #ffd300 100%);
	border-bottom-left-radius: 10upx;
	border-bottom-right-radius: 10upx;
	
	}
	/* 1 */
	.business-img image{width: 100%; height: 100%; border-radius: 10upx;}
	.business-img{width: 150upx !important; height: 120upx !important;
	padding-right: 20upx;}
	.business-time image{width: 27upx; height: 27upx; padding-right: 9upx;}
	.business-time{display: flex; align-items: center;
	font-size: 27upx;
	height: 40upx;
	line-height: 40upx;}
	.business-take{display: flex;
	height: 130upx;
	/* background: #ffffff; */
	padding: 0 10upx;}
	.business-right{width: 100%;}
	.business-title{font-size: 37upx; margin-bottom: 19upx;
	display: block;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;}
	/* .Notice{font-size: 27upx;
	padding: 20upx 10upx 0 10upx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;} */
</style>

