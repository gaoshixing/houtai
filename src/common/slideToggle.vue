<style lang="less">
.sidecloser{
    width: 10px;
    height: 20px;
    position: absolute;
    right: -10px;
    top: 30px;
    border-radius: 0 3px 3px 0;
    text-align: center;
    z-index: 10;
    line-height: 20px;
    cursor: pointer;
    background-color: #c5c5c5;
    &:hover{
        background: #44bcb7;
    }
}
</style>
<template>
    <div class="sidecloser" @click="doAction">
        <div>
            <Icon type="chevron-right" color="#fff" v-if="closed"></Icon>
            <Icon type="chevron-left" color="#fff" v-else></Icon>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            closed:false,
            name:this.$route.name,
        };
    },
    computed:{
        bg(){
            return {
                backgroundColor:this.closed?'#c5c5c5':'#c5c5c5'
            }
        },
    },
    mounted(){
    	
		    	if(document.body.clientWidth<1400){
//		    		if(this.$route.name=='crm.pond'){
		    			this.doAction();
//		    		}
		    	}
    },
    methods:{
        doAction(){
            const dom = this.$parent.$el.querySelector('.nav-toggle');
            if(this.closed){
                dom.style.width='';
                dom.style.overflow='';
            } else {
                dom.style.width=0;
                dom.style.overflow='hidden';
            }
            this.closed=!this.closed;
            this.$emit('status-change',this.closed);
        }
    },
    watch:{
		"$route.name":{
			handler(val, oval) {
		    	if(document.body.clientWidth<1400){
//		    		if(val=='crm.pond'){
		    			this.doAction();
//		    		}
		    	}
			},
			deep: true
		},
    }
}
</script>


