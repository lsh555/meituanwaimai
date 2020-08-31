<template>
	<view class="">
		<!-- 定位 -->
		<view class="search-view">
			<image src="../../../static/coen/dingwei.svg" mode="widthFix"></image>
			<text class="search-text">阿里巴巴淘宝城2期西溪园区</text>
			<text>></text>
		</view>
		<!-- 搜索 -->
		<view class="search-cont">
			<view class="search" @click="seaRch()">
				<image src="../../../static/coen/sousuo.svg" mode="widthFix" class="search-img"></image>
				<input type="text" placeholder="麻辣烫" disabled />
			</view>
		</view>
		<!-- 自定义轮播 -->
		<view class="swiper-view">
			<swiper :autoplay="false" :interval="2000" :duration="1000" @change="bannerfun">
				<block v-for="(item,index) in lable" :key="index">
					<swiper-item>
						<view class="swiper-item">
							<block v-for="(listdata,index) in item" :key="index">
								<view class="conteng-img">
									<image :src="listdata.img" mode="widthFix" class="uploadimg"></image>
									<text>{{listdata.title}}</text>
								</view>
							</block>
						</view>
					</swiper-item>
				</block>
			</swiper>
			<!-- 指示点 -->
			<view class="instruct-view">
				<block v-for="(item, index) in instructdata" :key="index">
					<view class="instruct" :class="{active:index == num}">{{item}}</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num: 0,
				// 面板指示点
				instructdata: ['', ''],
				// 轮播数组
				lable: [
					[{
							'img': '../../../static/inster/meishi.png',
							'title': '美食'
						},
						{
							'img': '../../../static/inster/chaoshi.png',
							'title': '超市便利'
						},
						{
							'img': '../../../static/inster/shuiguo.png',
							'title': '蔬菜水果'
						},
						{
							'img': '../../../static/inster/meituan.png',
							'title': '美团专送'
						},
						{
							'img': '../../../static/inster/paotui.png',
							'title': '跑腿代购'
						},
						{
							'img': '../../../static/inster/yexiao.png',
							'title': '夜宵'
						},
						{
							'img': '../../../static/inster/jintie.png',
							'title': '津贴联盟'
						},
						{
							'img': '../../../static/inster/pinping.png',
							'title': '甜点饮品'
						},
						{
							'img': '../../../static/inster/shaokao.png',
							'title': '龙虾烧烤'
						},
						{
							'img': '../../../static/inster/dangao.png',
							'title': '甜蜜蛋糕'
						}
					],
					[{
							'img': '../../../static/inster/hanbao.png',
							'title': '汉堡披萨'
						},
						{
							'img': '../../../static/inster/liaoli.png',
							'title': '日韩料理'
						},
						{
							'img': '../../../static/inster/malatang.png',
							'title': '麻辣烫'
						},
						{
							'img': '../../../static/inster/kuaican.png',
							'title': '快食简餐'
						},
						{
							'img': '../../../static/inster/xianhua.png',
							'title': '浪漫鲜花'
						},
						{
							'img': '../../../static/inster/lazi.png',
							'title': '无辣不欢'
						},
						{
							'img': '../../../static/inster/jiaozi.png',
							'title': '饺子馆'
						},
						{
							'img': '../../../static/inster/xiaochi.png',
							'title': '小吃馆'
						},
						{
							'img': '../../../static/inster/baofan.png',
							'title': '煲仔饭'
						},
						{
							'img': '../../../static/inster/qita.png',
							'title': '其他'
						}
					]
				]
			}
		},
		methods: {
			// 滑块事件
			bannerfun(e) {
				console.log(e.detail.current)
				this.num = e.detail.current
			},
			// 到搜索页面
			seaRch() {
				wx.navigateTo({
					url: '../search/search'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	/* 定位 */
	.search-view image {
		width: 35upx;
		height: 35upx;
	}

	.search-view {
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		align-items: center;
		height: 80upx;
	}

	.search-text {
		padding: 0 10upx;
	}

	/* 搜索 */
	.search-img {
		margin: auto 0 auto 20upx;
		width: 40upx;
		height: 40upx;
	}

	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: flex;
		background: #eff3f4;
		border-radius: 10rpx;
	}

	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 25upx;
		color: #666666;
	}

	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
	}

	/* 轮播 */

	swiper {
		height: 320upx !important;
	}

	/* 九宫格 */
	.swiper-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		height: 320upx;
	}

	.conteng-img {
		width: calc((100% / 5) - 12px) !important;
		margin: 6px;
		/* height: 120upx; */
		position: relative;
		text-align: center;
	}

	.conteng-img text {
		padding-top: 20upx;
		font-size: 25upx;
	}

	.uploadimg {
		width: 70upx;
		height: 70upx;
		border-radius: 50upx;
		display: block;
		margin: 0 auto;
	}

	/* 指示点 */
	.instruct-view {
		display: flex;
		justify-content: center;
		padding-top: 10upx;
	}

	.instruct {
		background: #e6e6e6;
		height: 10upx;
		width: 30upx;
		border-radius: 50upx;
		margin: 0 10upx;
	}

	.active {
		background: #fbae22 !important;
	}
</style>
