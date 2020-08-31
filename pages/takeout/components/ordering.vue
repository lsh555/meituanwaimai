<template>
	<view class="ordering-fls">
		<!-- 商品分类左边 -->
		<view class="ordering-left">
			<block v-for="(item,index) in orderclass" :key="index">
				<text :class="{activeord:index == numing}" @click="ordermeClic(index,item)">{{item}}</text>
			</block>
		</view>
		<!-- 商品列表：右边 -->
		<view class="ordering-right">
			<text class="ordering-right-title">{{ordertitle}}</text>
			<view>
				<block v-for="(item,index) in classifarr" :key="index">
					<view class="content-view">
						<!-- 左边商品图片 -->
						<view class="content-img">
							<image :src="item.objdis.image" mode="aspectFill"></image>
						</view>
						<!-- 右边商品 -->
						<view class="content-title">
							<text class="conteng-take">{{item.objdis.input}}</text>
							<view class="conteng-monthly">
								<block v-for="(itemdata,index) in item.objdis.tags" :key="index">
									<text>{{itemdata}}</text>
								</block>
							</view>
							<view class="conteng-starting">
								<text>月售10</text>
							</view>
							<view class="conteng-price">
								<view class="conteng-shi">¥{{item.objdis.Discount}}</view>
								<view class="conteng-hua">¥{{item.objdis.Price}}</view>
								<view class="ordering-price">
									<image @click="reDuce(item.amount,item._id,index,item.objdis.Discount,item.objdis.image,item.objdis.input)"
									 src="../../../static/coen/jianhao.png" mode="widthFix"></image>
									<text class="amounting">{{item.amount}}</text>
									<image @click="pLus(item.amount,item._id,index,item.objdis.Discount,item.objdis.image,item.objdis.input)" src="../../../static/coen/jiahao.png"
									 mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<!-- 总价计算区域 -->
			<view class="Shopping">
				<!-- 骑手 -->
				<view class="qishou">
					<image v-if="!isActive" src="../../../static/coen/weigou.png" mode="widthFix"></image>
					<image v-if="isActive" src="../../../static/coen/yigou.png" mode="widthFix"></image>
				</view>
				<!-- 多少量 -->
				<view class="Numbering" v-if="isActive">{{Takeleng.length}}</view>
				<!-- 金额 -->
				<view class="Shopping-dis">
					<view class="Shopping-left">
						<view class="Cost-mony">
							<text class="Total-price">¥{{Takeawayprice}}</text>
							<text class="Delivery">另需配送费{{physical}}元</text>
						</view>
					</view>
					<view class="Shopping-right" :class="{shoppactive: isActive}" @click="flat && settLement()">
						<text v-if="!isActive">{{delivering}}元起送</text>
						<text v-if="isActive">{{difference}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 登录模态弹窗组件 -->
		<motal ref="mon"></motal>
	</view>
</template>

<script>
	// 引入登录模态弹窗组件
	import motal from '../../../element/modal.vue'
	export default {
		props: {
			orderingdata: Array,
			busidata: Object
		},
		components: {
			motal
		},
		data() {
			return {
				// 禁止点击
				flat: false,
				// 商品分类左边
				numing: 0,
				isActive: false,
				// 左边的分类
				orderclass: [],
				// 右边默认展示的分类
				ordertitle: '',
				// 右边默认展示的商品
				classifarr: [],
				// 所有的商品数据
				commodity: [],
				// 配送费
				physical: Number,
				// 起送费
				delivering: Number,
				// 商品数量
				amount: '',
				// 存放得到总价的商品
				arrtotalPrice: [],
				// 所有商品累积的总价
				Takeawayprice: 0,
				// 选择了几份商品
				Takeleng: [],
				//还差多少满足起送金额
				difference: '',
				// 商家标识
				MerchantId: '',
				// 商家名称
				nameshop: '',
				// 商家logo
				logo: ''
			}
		},
		methods: {
			//去结算
			settLement() {
				//去结算的条件必须是先登录,到本地存储去查看是否已经有用户信息
				let setdata = uni.getStorageSync('usermen')
				if (!setdata) {
					this.$nextTick(() => {
						this.$refs.mon.init()
					})
				} else {
					console.log('已经登录')
					//做支付
					//需要支付的总金额
					//配送费
					//用户的openid
					//商家标识:身份证
					//商家名称
					//商家的logo
					//点的商品个数
					let payment = parseFloat((this.Takeawayprice + this.physical).toFixed(10))
					let Ordering = {
						payment,
						physical: this.physical,
						openid: setdata.openid,
						MerchantId: this.MerchantId,
						nameshop: this.nameshop,
						logo: this.logo,
						allorder: this.Takeleng
					}
					//路径带数据不能带数组，对象，只能字符串
					let strorder = JSON.stringify(Ordering)
					uni.navigateTo({
						url:'../placeorder/placeorder?ide='+strorder
					})
				}
			},
			//左边商品分类切换
			ordermeClic(index, itemclass) {
				this.numing = index
				this.ordertitle = itemclass
				// 分类切换
				let itemarr = this.commodity.filter((item) => {
					return item.optidata == itemclass
				})
				// log(itemarr)
				this.classifarr = itemarr
			},
			//减价
			reDuce(amounts, indexs, indexdata, price, image, input) {
				//商品数量
				this.amount = Number(amounts) - Number(1)
				this.pullData(indexs, indexdata, price, image, input)
			},
			//加价
			pLus(amounts, indexs, indexdata, price, image, input) {
				//商品数量
				this.amount = Number(amounts) + Number(1)
				this.pullData(indexs, indexdata, price, image, input)
			},
			// 加减价公用函数
			pullData(indexs, indexdata, price, image, input) {
				let findarr = this.classifarr.filter((item, index) => {
					if (item._id == indexs) {
						if (this.amount < 1) {
							return item.amount = '0'
						} else {
							return item.amount = this.amount
						}
					}
				})
				// 得到更改的数组重新更新classifarr数组，数组顺序要保持不变
				this.classifarr[indexdata] = findarr[0]
				// 计算总价：单价 *数量
				if (Number(this.amount) <= 0) {
					this.amount = 0
				}
				let Totalnum = price * Number(this.amount)
				// 解决总价为浮点数的情况
				let Totalprice = parseFloat((Totalnum).toFixed(10))
				// 把单个商品得到的总价作为一个对象push到数组里，方便后面
				// 多个商品总价计算时来得到最终的价格
				let fands = {
					indexs,
					Totalprice,
					image,
					input,
					"amount": this.amount,
					price
				}
				this.arrtotalPrice.push(fands)
				// 查询当前点击的商品_id，替换总价
				let findarrdata = this.arrtotalPrice.map((item) => {
					return item.indexs == indexs ? fands : item
				})
				this.arrtotalPrice = findarrdata
			},
		},
		computed: {
			calculation() {
				// 监听总价
				// 1数组对象去重 :累加器：reduce()
				let arr = {}
				let arrdata = this.arrtotalPrice.reduce((preVal, curVal) => {
					arr[curVal.indexs] ? '' : arr[curVal.indexs] = true && preVal.push(curVal)
					return preVal
				}, [])
				// log(arrdata)
				// 剔除总价为0的商品
				this.Takeleng = arrdata.filter((item) => {
					return item.Totalprice != 0
				})
				// log(taoarr)
				// 所有商品的总价累积之和
				let numdata = 0
				arrdata.forEach((item) => {
					numdata += item.Totalprice
				})
				// log(numdata)
				// 得到的总价
				this.Takeawayprice = parseFloat((numdata).toFixed(10))
			},
			// 时候满足下单的条件
			condition() {
				// 时候选择任何一个商品
				if (this.Takeawayprice === 0) {
					this.isActive = false
					this.flat = false
					// log('没有选择任何一件商品')
				} else {
					this.isActive = true
					this.flat = true
					// log('选择了一件或多件商品')
					if (this.Takeawayprice < this.delivering) {
						// 不达到起送金额  还差多少满足 = 起送金额 - 总价 
						let preceMen = parseFloat((this.delivering - this.Takeawayprice).toFixed(10))
						// log(preceMen)
						this.difference = '还差' + preceMen + '元'
						this.flat = false
					} else {
						this.difference = '去结算'
						this.flat = true
					}
				}
			}
		},
		watch: {
			// 用户进入该页面，1.默认展示在第一个tab上（盖浇饭），2.并且展示该分类下面的商品
			orderingdata(newvalue, oldvalue) {
				// 1取出左边的商品分类
				let classifdata = newvalue.map((item) => {
					return item.optidata
				})
				// 数组去重
				let setdataarr = Array.from(new Set(classifdata))
				// log(stadataarr)
				this.orderclass = setdataarr
				// 2右边的商品
				this.commodity = newvalue
				// 3右边默认分类为第一个分类
				this.ordertitle = newvalue[0].optidata
				// 4往商品里添加一个字段为0
				let commoditytata = newvalue.map((item) => {
					let key = 'amount'
					let value = 0
					return item[key] = value
				})
				// 5右边默认展示的商品是第一个分类下的商品
				let classifarr = this.commodity.filter((item) => {
					return item.optidata == newvalue[0].optidata
				})
				this.classifarr = classifarr
			},
			// 商家介绍
			busidata(newvalue, oldvalue) {
				console.log(newvalue)
				// 配送费
				this.physical = newvalue.physical
				// 起送价
				this.delivering = newvalue.delivering
				// 商家标识
				this.MerchantId = newvalue.openid
				// 商家名称
				this.nameshop = newvalue.shop
				// 商家logo
				this.logo = newvalue.logo
			}
		}
	}
</script>

<style scoped>
	.ordering-fls {
		display: flex;
		justify-content: space-between;
	}

	/* 左边商品分类 */
	.ordering-left {
		width: 190upx;
		background: #fafafa;
		overflow-y: auto;
		height: 100%;
	}

	.ordering-left text {
		color: #a8a8a8;
		display: block;
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
	}

	.activeord {
		background: #FFFFFF !important;
		font-weight: bold !important;
	}

	/* 右边 */
	.ordering-right {
		width: 100%;
		padding: 9upx 9upx 130upx 9upx;
		overflow: hidden;
		overflow-y: auto;
	}

	.activeord {
		background: #FFFFFF !important;
		font-weight: bold !important;
	}

	.ordering-right-title {
		font-size: 28upx;
		height: 60upx;
		line-height: 60upx;
	}

	.content-view {
		display: flex;
		justify-content: space-between;
		height: 200upx !important;
		overflow: hidden;
		margin: 30upx 0;
		color: #898989;
	}

	.content-img {
		width: 180rpx !important;
		height: 200rpx !important;
		overflow: hidden;
	}

	.content-img image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
		overflow: hidden;
	}

	.content-title {
		/* width: 100%; */
		padding-left: 10upx;
		font-size: 24upx;
	}

	.conteng-take {
		color: #333333;
		height: 50upx;
		font-size: 33upx;
		font-weight: bold;
		line-height: 50upx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.conteng-monthly {
		display: flex;
	}

	.conteng-monthly text {
		background: #f1f1f1;
		margin-right: 9upx;
		padding: 4upx 13upx;
		border-radius: 7upx;
		display: block;
	}

	.conteng-starting {
		display: flex;
		align-items: center;
		height: 50upx;
		line-height: 50upx;
	}

	.conteng-price image {
		width: 60upx;
		height: 60upx;
	}

	.conteng-price {
		display: flex;
		align-items: center;
	}

	.ordering-price {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100%;
	}

	/* 数量 */
	.amounting {
		width: 50upx;
		text-align: center;
	}

	.conteng-hua {
		text-decoration: line-through;
	}

	.conteng-shi {
		color: #fb4e44;
		font-size: 33upx;
		width: 180upx;
		overflow: hidden;
	}

	/* 购物车 */
	.Shopping {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
	}

	.Shopping-left {
		height: 130upx;
		background: #000000;
		flex-grow: 2;
		border-top-left-radius: 50upx;
		border-bottom-left-radius: 50upx;
	}

	.Shopping-right {
		height: 130upx;
		line-height: 130upx;
		font-size: 30upx;
		color: #7f7f7f;
		text-align: center;
		background: #000000;
		flex-grow: 1;
		border-top-right-radius: 50upx;
		border-bottom-right-radius: 50upx;
	}

	.Shopping-dis {
		display: flex;
		height: 130upx;
		margin: 0 20upx;
	}

	.qishou {
		width: 120upx;
		height: 150upx;
		position: fixed;
		bottom: 0upx;
		left: 50upx;
	}

	.qishou image {
		width: 120upx;
		height: 150upx !important;
	}

	/* 定位 */
	.Delivery {
		color: #999999;
		font-size: 28upx;
		height: 65upx;
	}

	.Shopping-left text {
		display: block;
	}

	.Total-price {
		font-size: 40upx;
		color: #FFFFFF;
		height: 65upx;
		line-height: 65upx;
	}

	.Cost-mony {
		padding-left: 170upx;
		color: #4CD964;
		height: 130upx;
	}

	/* 数量 */
	.Numbering {
		background: red;
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		font-size: 20upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 40upx;
		position: fixed;
		bottom: 50upx;
		left: 130upx;
	}

	/* 选中菜品 */
	.shoppactive {
		background: #ffd300 !important;
		color: #000000 !important;
	}
</style>
