// 登录公用
// 面向对象：ES6 -------class（类） ：python   =》属性，方法，
// post请求
import {publicing} from '../api/api.js'
// 请求地址
import {wxloginurl} from '../api/request.js'
var {log} = console

class logins{
	// 构造方法执行：必须是类已经实例化
	constructor(wxuser) {
	    this.wxuser = wxuser
		log(wxuser)
	}
	
	// 先获取发起请求的必须条件
	async listing(){
		// 拿到用户头像，昵称，code
		let userdata = await this.wxlogin()
		log(userdata)
		// 请求接口：登录
		let usermen = await this.gologin(userdata)
		return usermen
	}
	
	// 拿到用户头像，昵称，code
	wxlogin(){
		let wxuser = this.wxuser
		return new Promise((resolve,reject)=>{
			if(wxuser != undefined){
				wx.login({
					success: (res) => {
						log(res)
						let data = {
							appid:'',
							secret:'',
							nickName:wxuser.nickName,
							avatarUrl:wxuser.avatarUrl,
							code:res.code
						}
						resolve(data)
					},
					fail:(err)=>{
						log(err)
						reject('获取code失败')
					}
				})
			}else{
				console.log('拒绝登录')
				reject('FAIL')
			}
		})		
	}
	
	// 请求接口：登录
	gologin(userdata){
		return new Promise((resolve,reject)=>{
			publicing(wxloginurl,userdata)
			.then((res)=>{
				log(res)
				if(res.data.msg == 'success'){
					// 存入本地
					resolve('SUCCESS')
					uni.setStorageSync('usermen',res.data.datas)
				}
			})
			.catch((err)=>{
				log(err)
			})
		})
	}
	
	
	
	// 获取用户信息和code
	
}

// 模块
module.exports = logins