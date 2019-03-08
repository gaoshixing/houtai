export default {
	updateShowErrorStatus(state, payload) {
		state.showError = payload.showError;
	},
	updateLoadingStatus(state, payload) {
		state.isLoading = payload.isLoading;
		if( typeof payload.loadingBg!=='undefined') {
			state.loadingBg = payload.loadingBg;
		}
	},
	updateUserInfo(state,payload){
		state.userInfo = payload.userInfo;
	},
	updateAsideApp(state,payload){
		state.asideApp = payload.asideApp;
	},
	updateCurrentAside(state,payload){
		state.currentAsideApp = payload.currentAsideApp;
	},
	appMenuList(state,payload){
		state.appMenuList = payload.appMenuList;
	},
	updatePid(state,{pid}){
		state.pid = pid;
	}
    
};