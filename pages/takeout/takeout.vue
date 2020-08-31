<template>
	<view>
		<!-- uniapp生成小程序不能使用v-show = display:none -->
		<!-- 商家介绍 -->
		<Business :busidata="busidata"></Business>
		<!-- tab切换 -->
		<Tabs></Tabs>
		<view class="ordering-sceate">
			<!-- 商品下单 -->
			<Ordering :class="[hideing === 0 ? 'actineclass' : 'errorclass']"
			:orderingdata="orderingdata"
			:busidata = "busidata"
			></Ordering>
			<!-- 评价 -->
			<Message :class="[hideing === 1 ? 'actineclass' : 'errorclass']"
			:messagedata="messagedata"
			:tabmessage = "tabmessage"
			:empty = "empty"
			></Message>
			<!-- 商家详情 -->
			<Introduce :busidata="busidata" 
			:class="[hideing === 2 ? 'actineclass' : 'errorclass']"></Introduce>
		</view>
		<!-- loading -->
		<home-load v-if="efinition"></home-load>
	</view>
</template>

<script>
	import Business from './components/business.vue'
	import Tabs from './components/tabs.vue'
	import Ordering from './components/ordering.vue'
	import Message from './components/message.vue'
	import Introduce from './components/introduce.vue'
	// post
	import {publicing} from '../../api/api.js'
	// 请求地址
	import {discussurl,shopurl,getdishesurl} from '../../api/request.js'
	var {log} = console
	export default{
		components:{
			Business,
			Tabs,
			Ordering,
			Message,
			Introduce
		},
		data() {
			return {
				// loading
				efinition:true,
				hideing: 0,
				// 商家介绍
				busidata:{},
				// 商品数据
				orderingdata:[],
				// 评论
				messagedata:[],
				// 评论分类的标签
				tabmessage:[],
				// 标识没有评论
				empty:'',
				// 商家唯一标识
				ids:''
				
			}
		},
		methods:{
			// 被子组件tabs调用的方法
			fatherMethod(index){
				log(index)
				this.hideing = index
			},
			
			// 请求接口
			takeFun(ids){
				let data = {
					openid:ids
				}
				let disdata = {
					merchantid:ids
				}
				Promise.all([publicing(shopurl,data),publicing(getdishesurl,data),publicing(discussurl,disdata)])
				.then((res)=>{
					// log(res[0].data[0])
					// 商家介绍
					this.busidata = res[0].data[0]
					// 商品数据
					this.orderingdata = res[1].data
					// 评论
					// log(res[2].data)
					if(res[2].data.length === 0){
						this.empty = 'EMPTY'
					}else{
						this.messagedata = res[2].data
						// 评论分类标签去重复和去空标签
						// 取出评论分类标签放在一个数组里
						let messageword = res[2].data.map((item)=>{
							return item.classmessage
						})
						// console.log(messageword)
						// 标签去重
						let newarr = Array.from(new Set(messageword))
						// 标签去空值
						var newArr = newarr.filter(item => item)
						// console.log(newArr)
						// 数组合并
						this.tabmessage = ['全部', ...newArr]
					}
					// loading取消
					this.efinition = false
					
				})
				.catch((err)=>{
					log(err)
				})
			},
			
			// 被评论子组件调用的函数
			messageMethod(item){
				// log(item)
				if(item == '全部'){
					let data = {
						merchantid:this.ids
					}
					this.classifMess(data)
				}else{
					let data = {
						merchantid:this.ids,
						classmessage:item
					}
					this.classifMess(data)
				}
			},
			
			// 请求评论分类的数据
			classifMess(data){
				publicing(discussurl,data)
				.then((res)=>{
					log(res)
					this.messagedata = res.data
				})
				.catch((err)=>{
					log(err)
				})
			}
		},
		
		onLoad(e) {
			log(e)
			this.ids = e.id
			this.takeFun(e.id)
		}
	}
</script>

<style scoped>
	.actineclass{display: block; overflow-y: auto; height: 100%;}
	.errorclass{display: none;}
	.ordering-sceate{position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 230upx;}
</style>
