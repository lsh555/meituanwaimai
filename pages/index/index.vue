<template>
	<view class="contenting">
		<Search></Search>
		<Preference :preferdata="preferdata"></Preference>
		<Title></Title>
		<view @click="poll()" :catchtouchmove="true">
			<Delicacy id="boxFixed" :class="{'is_fixed' : isfixed}"></Delicacy>
		</view>
			<view style="height: 50upx;"></view>
		<Takeout :takeshop="takeshop"></Takeout>
	</view>
</template>

<script>
	import Search from './components/search.vue';
	import Preference from './components/preference.vue';
	import Title from './components/title.vue';
	import Takeout from './components/takeout.vue';
	import Delicacy from './components/delicacy.vue';

	// 引入接口
	import {
		listing
	} from '../../api/api.js'
	// 引入请求地址
	import {
		getpreferurl,
		wxshopurl
	} from '../../api/request.js'
	// 引入vuex的mapstate
	import {mapState} from 'vuex'
	export default {
		components: {
			Search,
			Preference,
			Title,
			Takeout,
			Delicacy
		},
		data() {
			return {
				preferdata: [],
				takeshop:[],
				menutop: '',
				rect: '',
				topdata: '',
				isfixed: false,
			}
		},
		onLoad() {

		},
		methods: {
			preference() {
				// 批量并发请求多个接口，Promise.all =>可以并发请求多个接口。并且同时得到多个接口的数据
				Promise.all([listing(getpreferurl), listing(wxshopurl)])
					.then((res) => {
						console.log(res)
						// 为你优选
						this.preferdata = res[0].data
						// 商家列表
						this.takeshop = res[1].data
						// loading取消
						this.efinition = false
					})
					.catch((err) => {
						console.log(err)
					})
			},
			// 回到顶部
			poll() {
				uni.pageScrollTo({
					scrollTop: this.topdata + 2,
					duration: 300
				})
			},
		},
		onLoad() {
			// 监听筛选组件距离顶部的距离
			const query = uni.createSelectorQuery()
			query.select('#boxFixed').boundingClientRect()
			query.exec((res) => {
				this.menutop = res[0].top
				this.topdata = res[0].top
				console.log(this.topdata)
			})
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			// console.log(e.scrollTop)
			this.rect = e.scrollTop
		},
		computed: {
			...mapState(['screendata']),
			// 监听筛选组件置顶和不置顶
			namepage() {
				// 如果页面滚动的高度大于筛选组件距离顶部的高度，那就置顶，反之不置顶
				if (this.rect > this.menutop) {
					this.isfixed = true
				} else {
					this.isfixed = false
				}
			},
			// 筛选来的商家数据
			count(){
				this.takeshop = this.screendata.screenarr
			}
		},
		mounted() {
			this.preference()
		},

	}
</script>

<style lang="scss" scoped>
	.contenting {
		margin: 0 15upx;
	}

	.is_fixed {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
	}
</style>
