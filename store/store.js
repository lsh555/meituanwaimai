import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)




const screendata = {
	// 存储筛选出来的数据
	screenarr:[]
}

// 数据仓库
const state = {
	screendata
}

export default new Vuex.Store({
	state,
	// 同步存储
	mutations:{
		screenmuta(state,payload){
			console.log(payload)
			// 存储到数据仓库
			state.screendata = {
				screenarr:payload
			}
		}
	},
	actions:{
		screenmutaAction(context,payload){
			context.commit('screenmuta',payload)
		}
	}
})