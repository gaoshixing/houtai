<style lang="less">
.errorPageF{
	/* width:100%;
	height:100%;
	background-color:#000;
	position: fixed;
	z-index: 999;
	.errorContent{
		background-color: #F00;
		width: 100px;
		height: 100px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	} */
}
</style>
<template>
	<div>
		<div class="loadingView" v-show="show" :style="loadingStyle">
			<div class="loadingViewFrame">
				<div class="loadingBox1 loadingBox"></div>
				<div class="loadingBox2 loadingBox"></div>
				<div class="loadingBox4 loadingBox"></div>
				<div class="loadingBox3 loadingBox"></div>
			</div>
		</div>
		<!-- <div v-show="showErrorStatu" class="errorPageF">
			<div class="errorContent">
				
			</div>
		</div> -->
		<router-view></router-view>
	</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	data() {
		return {
			
		};
	},
	computed:{
		...mapState(['isLoading','loadingBg','showError']),
		loadingStyle(){
			if(this.loadingBg){
				return {backgroundColor:this.loadingBg};
			}
			return {};
		},
		show(){
			return this.isLoading || this.loadingBg;
		},
		showErrorStatu(){
			return this.showError;
		}
	},
}
</script>
