import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js';

Vue.use(Vuex);

// 这里为全局的，模块内的请在模块内动态注册

const store = new Vuex.Store({
	strict:true,
	state: {
		showError: false,
		isLoading:false,
		loadingBg:'',
		userInfo:{
			roleId:'',
			roleMap:{},
			roleNameMap:{},
		},
		pid:0,
		noLogin:['sign.pdfview'],
		asideApp:[],
		appMenuList:[], // 控制台所有应用列表
		currentAsideApp:{},
	},
	getters: {
		roleName(state){
			if(state.userInfo.roleNameMap){
				return state.userInfo.roleNameMap[state.pid];
			}
		}
	},
	mutations,
	actions,
});

export default store;