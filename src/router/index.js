//官方元件
import Vue from 'vue'
import VueRouter from 'vue-router'
import '../assets/styles/reset.css'

// 自訂的分頁元件 先把HelloWorld自訂為首頁
import Home from '@/components/Home'
import More from '@/components/More'
import Main from '@/components/Main'





Vue.use(VueRouter)

//自訂元件必須要可以匯出給main使用 所以用export

export default new VueRouter({
	routes: [
		{
			name: 'index',	
			path: '/',
			component: Home
		},

		{
			name: 'Home',	
			path: '/',
			component: Home
		},

		{
			name: 'More',	
			path: '/More',
			component: More
		},

		{
			name: 'Main',	
			path: '/Main',
			component: Main,
			params: 'tourId'
			
		},
	]
})