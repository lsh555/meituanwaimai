<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text"  placeholder-class="inputclass" confirm-type ="search" 
				focus="true"
				placeholder="请输入关键字"
				v-model="searchdata"
				@confirm="onKeyInput"/>
			</view>
			<view class="search-code" @click="seArch()">
				搜索
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>搜索历史</view>
				<view @click="removeStorage()"><image src="../../static/coen/searchend.svg" mode="widthFix"></image></view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view @click="menubtn(item)">{{item}}</view>
				</block>
			</view>
		</view>
		
		
		<!-- 内容展示 -->
		<view class="content-left" v-if="shopcont">
			<block v-for="(item,index) in takeshop" :key="index">
				<view class="content-view">
					<view class="content-img">
						<image :src="item.logo" mode="aspectFill"></image>
					</view>
					<view class="content-title">
						<text class="conteng-take">{{item.shop}}</text>
						<view class="conteng-monthly">
							<text>月售200</text>
							<text>约{{item.duration}}分钟</text>
						</view>
						<view class="conteng-starting">
							<text>起送¥{{item.delivering}}</text>
							<text>配送¥{{item.physical}}</text>
							<text>人均¥{{item.capita}}</text>
						</view>
						<view class="conteng-starting">
							<image src="../../static/coen/liwu.svg" mode="widthFix"></image>
							<text>{{item.types}}</text>
						</view>
					</view>
				</view>
			</block>
		</view>
		
		<!-- 反馈组件 -->
		<tips ref="tips"></tips>
	</view>
</template>

<script>
	import {publicing} from '../../api/api.js'
	import {searchurl} from '../../api/request.js'
	// 引入反馈组件
	import tips from '../../element/tips.vue'
	// es6解构
	var {log} = console
	export default{
		components:{
			tips
		},
		data() {
			return {
				// 搜索关键词
				searchdata:'',
				// 搜索结果
				takeshop:[],
				// 搜索历史
				setdata:[],
				// 是否有搜索历史
				ifhistory:false,
				// 内容展示区
				shopcont:false
			}
		},
		
		
		methods:{
			// 点击搜索按钮触发的
			seArch(){
				log(this.searchdata)
				if(this.searchdata != ''){
					this.ifhistory = false
					let searchkey = this.searchdata
					this.searchData(searchkey)
					this.getStorage(searchkey)
				}
			},
			
			// 搜索键盘的触发
			onKeyInput(e){
				log(e.detail.value)
				let searchkey = e.detail.value
				if(searchkey != ''){
					this.ifhistory = false
					this.searchData(searchkey)
					this.getStorage(searchkey)
				}
			},
			
			// 本地存入搜索历史
			getStorage(searchkey){
				// 先取出本地缓存的数据
				let seararray = uni.getStorageSync('search_key') || []
				// 要存入一个数组array
				seararray.unshift(searchkey)
				uni.setStorageSync('search_key', seararray);
			},
			
			// 取出本地缓存的数据
			setStorage(){
				let setdata = uni.getStorageSync('search_key')
				// 数组去重
				let setdataarr = Array.from(new Set(setdata))
				// log(setdataarr)
				if(setdataarr == ''){
					this.ifhistory = false
				}else{
					this.setdata = setdataarr
					this.ifhistory = true
				}
			},
			
			// 手动清除搜索历史
			removeStorage(){
				uni.removeStorageSync('search_key');
				this.setStorage()
			},
			
			// 搜索历史的搜索
			menubtn(item){
				// log(item)
				this.ifhistory = false
				this.searchData(item)
			},
			
			
			// 发送请求搜索
			searchData(searchkey){
				let data = {
					searchdata:searchkey
				}
				publicing(searchurl,data)
				.then((res)=>{
					log(res)
					if(res.data == '没有商品数据'){
						log('没有商品数据')
						this.shopcont = false
						let bull = true
						let tips = '没有你要找的商品'
						this.tising(bull,tips)
					}else{
						let bull = false
						let tips = ''
						this.tising(bull,tips)
						this.shopcont = true
						this.takeshop = res.data
					}
					
				})
				.catch((err)=>{
					log(err)
				})
			},
			
			// 反馈提示
			tising(bull,tips){
				this.$nextTick(()=>{
					this.$refs.tips.init(bull,tips)
				})
			}
			
		},
		computed:{
			clearItem(){
				if(this.searchdata ==''){
					this.takeshop = []
				}
			}
		},
		
		created() {
			this.setStorage()
		}
		
		
	}
</script>

<style scoped>
	@import "../../common/meituan.css";
	.content-left{margin: 0 20upx;}
	.search{
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background:#f8f8f8;
		border-radius: 20upx;
		margin-left: 20upx;
		}
	.search input{
			height: 70upx;
			line-height: 70upx;
			width: 100%;
			font-size: 30upx;
			color: #666666; 
			padding-left: 30upx;
			  } 
	.search-cont{display: flex; justify-content: space-between; height: 70upx; align-items: center;
				padding: 30upx 0;
				}
	.search-code{width: 150upx; height: 50upx; text-align: center; font-size: 30upx;}
	/* 搜索历史 */
	.search-history{margin: 20upx;}
	.search-title{font-size: 30upx; font-weight: bold;
				display: flex;
				justify-content:space-between;
				align-items: center;
				height: 60upx;
				line-height: 60upx;}
	.search-title image{width: 36upx; height: 36upx; display: block;}
	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}
	
	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
