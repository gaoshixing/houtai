<style>

</style>

<template>
	<div>
		<div id="editor1" ></div>
		<input type="hidden" v-model="model"/>
	</div>
</template>

<script>
	var editor;
	export default {
		props: {
			value: {
				type: String,
				required: true,
            	default:'',
			},
		},
		data() {
			return {
				model: this.value,
			}
		},
		created() {
			let _this=this
			require(['./wangEditor.js'], function(E) {
				editor = new E('#editor1')
		    	editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
    			editor.customConfig.zIndex = 10;
				editor.customConfig.menus = [
					'head', // 标题
					'bold', // 粗体
					'fontSize', // 字号
					'fontName', // 字体
					'italic', // 斜体
					'underline', // 下划线
					'strikeThrough', // 删除线
					'foreColor', // 文字颜色
					'backColor', // 背景颜色
					'justify', // 对齐方式
					'emoticon', // 表情
					'undo', // 撤销
					'redo' // 重复
				]
			    editor.customConfig.onchange = function (html) {
			        // html 即变化之后的内容
			        _this.model=html;
			    }
				editor.create()
			})
		},
		watch: {
			value(val) {
				this.model = val;
				console.log(val);
    			editor.txt.html(this.model);
			},
			model(model) {
				console.log(model);
				this.$emit('input', model);
			}
		}
	}
</script>