<style lang="less" scoped>
	@utypeColor: #3b9ad1;
	.userInfo {
		height: 60px;
		margin: 0;
		padding: 10px 15px 10px;
		box-sizing: content-box;
		.uleft {
			width: 28%;
			height: 100%;
			float: left;
		}
		.uright {
			width: 72%;
			height: 100%;
			float: left;
		}
		.uimg {
			display: block;
			background-color: #ddd;
			width: 50px;
			height: 50px;
		}
		.uname {
			display: block;
			max-width: 68px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-weight: 500;
			font-size: 14px;
			height: 22px;
			line-height: 22px;
			float: left;
		}
		.utype {
			background-color: @utypeColor;
			display: block;
			padding: 0 6px;
			color: #fff;
			border-radius: 14px;
			font-size: 12px;
			height: 22px;
			line-height: 22px;
			float: left;
			transform: scale(0.85);
			max-width: 76px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			&.long {
				max-width: 99px;
			}
		}
		.p1 {
			height: 22px;
			padding-left: 10px;
			overflow: hidden;
			zoom: 1;
			letter-spacing: -0.5px;
		}
		.p2 {
			margin-top: 5px;
			padding-left: 10px;
			.iconfont {
				&+.iconfont {
					margin-left: 18px;
				}
				cursor: pointer;
				&:hover {
					color: #000;
				}
			}
		}
	}
</style>
<template>
	<div class="userInfo">
		<div class="uleft">
			<img :src="info.photo" alt="" class="uimg">
		</div>
		<div class="uright">
			<p class="p1" v-if="info.name">
				<span class="uname" v-text="info.name" :title="info.name"></span>
				<span class="utype" v-if="roleName" v-text="roleName" :title="roleName" :class="{long:info.name.length<4}"></span>
			</p>
			<p class="p2">
				<i class="iconfont icon-gongzuotai2" @click="jump('plan.portal')"></i>
				<i class="iconfont icon-geren" @click="jump('plan.portal.selfcentred')"></i>
				<i class="iconfont icon-fankui" @click="addBackModel = true"></i>
				<i class="iconfont icon-shezhi1" @click="jump('plan.portal.newSet')"></i>
			</p>
		</div>
		<Modal v-model="addBackModel" width="730" class-name="vertical-center-modal" @on-visible-change="isloading=false" :mask-closable="false" :closable="false">
			<p slot="header" style="line-height: 22px;font-size: 16px;">
				提交反馈
			</p>
			<div class="addBackBody">
				<Form ref="addBackForm1" :model="addBackForm" :rules="addBackRuler" :label-width="120">
					<FormItem prop="priority" label="优先级：">
						<RadioGroup v-model="addBackForm.priority">
							<Radio v-for="item in priorityList" :key="item.id" :label="item.value">{{item.label}}</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem prop="type" label="问题分类：">
						<Select v-model="addBackForm.type" style="width: 300px;">
							<Option v-for="item in classList" :key="item.id" :value="item.value">{{item.label}}</Option>
						</Select>
					</FormItem>
					<FormItem prop="content" label="问题描述：">
						<editor v-model="addBackForm.content"></editor>
					</FormItem>
				</Form>
			</div>
			<div slot="footer">
				<Button @click="closeAddBackModel('addBackForm1')">取消</Button>
				<Button type="primary" @click="addBackOk('addBackForm1')" :loading="isloading">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import { mapMutations, mapState, mapGetters } from 'vuex';
	import editor from './editor.vue'
	import valid, {
		errors,
		sys
	} from '@public/libs/request';
	export default {
		props: {
			info: {
				required: true,
				type: Object,
				default: function() {
					return {};
				}
			}
		},
		data() {
			return {
				isloading:false,
				addBackModel: false,
				addBackForm: {
					id: '',
					priority: "1",
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				},
				addBackRuler: {
					priority: {
						required: true,
						message: '优先级不能为空',
						trigger: 'change'
					},
					type: {
						required: true,
						message: '问题分类不能为空',
						trigger: 'change'
					},
					content: {
						required: true,
						message: '问题描述不能为空',
						trigger: 'blur'
					},
				},
				classList:[],
				priorityList:[]
			};
		},
		computed: {
			...mapGetters(['roleName']),
			...mapState(['userInfo', 'noLogin']),
			allinfo() {
				let navigate = {};
				navigate.appName = navigator.appName; //浏览器的正式名称
				navigate.appVersion = navigator.appVersion; //浏览器的版本号
				navigate.cookieEnabled = navigator.cookieEnabled; // 返回用户浏览器是否启用了cookie
				navigate.cpuClass = navigator.cpuClass; //返回用户计算机的cpu的型号，通常intel芯片返回"x86"（火狐没有）

				navigate.mimeType = navigator.mimeTypes; // 浏览器支持的所有MIME类型的数组
				navigate.platform = navigator.platform; // 浏览器正在运行的操作系统平台，包括Win16(windows3.x)  
				//   Win32(windows98,Me,NT,2000,xp),Mac68K(Macintosh 680x0)
				//     和ＭacPPC(Macintosh PowerPC)
				navigate.plugins = navigator.plugins; //  安装在浏览器上的所有插件的数组
				navigate.userLanguage = navigator.userLanguage; // 用户在自己的操作系统上设置的语言（火狐没有）
				navigate.userAgent = navigator.userAgent; //包含以下属性中所有或一部分的字符串：appCodeName,appName,appVersion,language,platform
				navigate.systemLanguage = navigator.systemLanguage; // 用户操作系统支持的默认语言（火狐没有）

				navigate.type = "";

				navigate.appCodeName = navigator.appCodeName; //与浏览器相关的内部代码名
				navigate.appMinorVersion = navigator.appMinorVersion; //辅版本号（通常应用于浏览器的补丁或服务包)

				navigate.language = navigator.language; //浏览器支持的语言 （IE没有）

				navigate.onLine = navigator.onLine; //返回浏览器是否处于在线模式（IE4以上版本）

				navigate.opsProfile = navigator.opsProfile; // 未定义   （IE、火狐没有）

				navigate.oscpu = navigator.oscpu; //浏览器正在运行的操作系统，其中可能有CPU的信息（IE没有）

				navigate.product = navigator.product; // 浏览器的产品名（IE没有）

				navigate.productSub = navigator.productSub; //关于浏览器更多信息（IE没有）

				navigate.securityPolicy = navigator.securityPolicy; // 浏览器支持的加密类型（IE没有）

				navigate.userProfile = navigator.userProfile; //  返回一个UserProfile对象，它存储用户的个人信息（火狐没有）

				navigate.vender = navigator.vender; // 浏览器厂商名称（IE、火狐没有）

				navigate.vendorSub = navigator.vendorSub; // 关于浏览器厂商更多的信息  

				return navigate;

			}
		},
		components: {
			editor
		},
		created() {
			let params1 = {
				type: "sys_workorder_type",
			}
			sys.dictListData(params1).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.classList = res.data.data;
				}
			}).catch(errors.call(this));
			let params2 = {
				type: "sys_workorder_priority",
			}
			sys.dictListData(params2).then(valid.call(this)).then(res => {
				if(res.ok) {
					this.priorityList = res.data.data;
				}
			}).catch(errors.call(this));
		},
		methods: {
			...mapMutations(['updateLoadingStatus']),
			jump(name) {
				this.$router.push({
					name,
					query: {}
				})
			},
			browserInfo(userAgent) {
				let broName;
				//FireFox
				if(userAgent.indexOf('Firefox') != -1) {
					let isFireFox = true;
					/*broName = 'FireFox浏览器';*/
					let strStart = userAgent.indexOf('Firefox');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号')

				}

				//Edge
				if(userAgent.indexOf('Edge') != -1) {
					let isEdge = true;
					/*broName = 'Edge浏览器';*/
					let strStart = userAgent.indexOf('Edge');
					let temp = userAgent.substring(strStart);
					broName = temp.replace('/', '版本号');
				}

				//IE浏览器
				if(userAgent.indexOf('NET') != -1 && userAgent.indexOf("rv") != -1) {
					let isIE = true;
					/*broName = 'IE浏览器'; */
					let strStart = userAgent.indexOf('rv');
					let strStop = userAgent.indexOf(')');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('rv', 'IE').replace(':', '版本号');
				}

				//360极速模式可以区分360安全浏览器和360极速浏览器
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") < 0 && userAgent.indexOf("Firefox") < 0) {
					if(navigator.javaEnabled()) {
						let is360 = true;
						broName = '360安全浏览器-极速模式';
					} else {
						let is360 = true;
						broName = '360极速浏览器-极速模式';
					}
				}

				//360兼容
				if(userAgent.indexOf('WOW') != -1 && userAgent.indexOf("NET") != -1 && userAgent.indexOf("MSIE") != -1 && userAgent.indexOf("rv") < 0) {
					let is360 = true;
					broName = '360兼容模式';
				}

				//Chrome浏览器
				if(userAgent.indexOf('WOW') < 0 && userAgent.indexOf("Edge") < 0) {
					let isChrome = true;
					/*broName = 'Chrome浏览器';*/
					let strStart = userAgent.indexOf('Chrome');
					let strStop = userAgent.indexOf(' Safari');
					let temp = userAgent.substring(strStart, strStop);
					broName = temp.replace('/', '版本号');
				}
				return broName;
			},
			setDeviceAndOS() {
				let obj = {};
				var name = "unknown";
				if(window.navigator.userAgent.indexOf("Android") != -1) {
					name = "Android";
				} else if(window.navigator.userAgent.indexOf("iPhone") != -1) {
					name = "iPhone";
				} else if(window.navigator.userAgent.indexOf("SymbianOS") != -1) {
					name = "SymbianOS";
				} else if(window.navigator.userAgent.indexOf("Windows Phone") != -1) {
					name = "Windows Phone";
				} else if(window.navigator.userAgent.indexOf("iPad") != -1) {
					name = "iPad";
				} else if(window.navigator.userAgent.indexOf("iPod") != -1) {
					name = "iPod";
				}
				if(name != "unknown") {
					_AgentInfo.OSname = name;
					_AgentInfo.deviceType = "mobile";
					return;
				}
				if(window.navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
					name = "Windows 10";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
					name = "Windows 8";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
					name = "Windows 7";
				} else if(window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
					name = "Windows Vista";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
					name = "Windows XP";
				} else if(window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
					name = "Windows 2000";
				} else if(window.navigator.userAgent.indexOf("Mac") != -1) {
					name = "Mac/iOS";
				} else if(window.navigator.userAgent.indexOf("X11") != -1) {
					name = "UNIX";
				} else if(window.navigator.userAgent.indexOf("Linux") != -1) {
					name = "Linux";
				}
				obj.OSname = name;
				obj.deviceType = "pc";
				return obj;
			},
			closeAddBackModel(name) {
				this.addBackForm = {
					id: '',
					priority: '',
					type: "",
					content: '',
					status: '',
					'url': window.location.href,
					browser: '',
					os: '',
					username: '',
					pwdFlag: '',
					sysWorkorderLogList: [],
				};
				this.$refs[name].resetFields();
				this.addBackModel = false;
			},
			addBackOk(name, id) {
				this.$refs[name].validate((valid1) => {
					if(valid1) {
           	 			this.updateLoadingStatus({isLoading:true});
						let params5 = {};
						params5 = this.addBackForm;
						params5.browser = this.browserInfo(this.allinfo.userAgent);
						params5.os = this.setDeviceAndOS().OSname;
						params5.username = this.userInfo.name;
						if(this.isEditBack) {
							params5.status = "commited";
						} else {
							params5.id = '';
							params5.status = "commited";
						}
						params5.pwdFlag = 0;

						sys.workorferSave(params5).then(valid.call(this)).then(res => {
							if(res.ok) {
								//this.$Message.success(res.data.message);
								this.closeAddBackModel(name);
								this.updateLoadingStatus({isLoading:false});
								this.$Modal.confirm({
									title: '提示',
									content: '<p>您的反馈提交成功，可前往反馈列表查看详情及解决结果。</p>',
									okText: '前往我的反馈',
									cancelText: '留在当前页面',
									onOk: () => {
										/* const {href} = this.$router.resolve({
											name: 'crm.detail',
											query: {
												id: params.row.cusId,
												from:'public'
											}
										})
										window.open(href, '_blank') */
										this.$router.push({
											name:'plan.portal.myFeedback'
										})
									},
									onCancel: () => {
									}
								})
									
							}
						}).catch(errors.call(this));
					}
				})
			},
		}

	}
</script>