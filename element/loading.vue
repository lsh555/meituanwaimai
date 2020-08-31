<template>
	<view class="loading" :catchtouchmove="true">
		<view>
			<image src="../static/loadingmeituan.jpg"></image>
			<text>努力加载中...</text>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.loading{position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	background: #FFFFFF;
	z-index: 9999;}
	.loading view{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%; height: 100%;
	}
	.loading image{width: 50px; height: 60px; display: block;}
	.loading text{font-size: 25upx;}
</style>
