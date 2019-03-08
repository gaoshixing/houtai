
export const config = {
	homeRouter :'portal.app',
	loginRouter:'portal.login',
	fallbackLocale:'zh'
};

// 此处定义需要使用的子模块
const moduleList = 
[
	// require('./component/spoc-core-web/router.js'),//组织机构
	// require('./component/spoc-choiceschool-web/router.js'),//选校
	// require('./component/spoc-library-web/router.js'),//院校库
	require('./component/spoc-sign-web/router.js'),//签约
	// require('./component/spoc-plan-web/router.js'),//规划
	// require('./component/spoc-docu-web/router.js'),//文书
	// require('./component/spoc-crm-web/router.js'),//CRM
	// require('./component/spoc-apply-web/router.js'),//申请
	// require('./component/spoc-market-web/router.js'),//微信营销
	require('./component/spoc-salary-web/router.js')//工资薪酬  发版屏蔽？
];

const routers =
[
	{
	    path: '/',
	    component: (resolve) => require(['./component/spoc-portal/views/index.vue'], resolve),
		name:'portal.index',
		redirect:{name:'portal.appList'}, // 设置默认页跳转的路由名
	    children:
	    [
			//{{routerList}} // 须确保 portal.index 是第一个
			{
				path:'/appList.html',
				name:'portal.appList',
				component:(resolve) => require(['./component/spoc-portal/views/applist.vue'], resolve),
				meta: { title: '应用管理' },
				redirect:{name:'portal.app'}, // 设置默认页跳转的路由名
	    		children:
	    		[
					{
						path: '/app.html',
						component: (resolve) => require(['./component/spoc-portal/views/app.vue'], resolve),
					    name:'portal.app',
					},
					{
						path: '/news.html',
						component: (resolve) => require(['./component/spoc-portal/views/news/news.vue'], resolve),
					    name:'portal.news',
						meta: { title: '通知管理' },
					    children:
					    [
							{
								path:'/newsList.html',
								name:'portal.newsList',
								component:(resolve) => require(['./component/spoc-portal/views/news/newsList.vue'], resolve),
							},
							{
								path:'/newSet.html',
								name:'portal.newSet',
								component:(resolve) => require(['./component/spoc-portal/views/news/newSet.vue'], resolve),
							}
					    ]
					}
	    		]
			},
			{
				path: '/system.html',
				component: (resolve) => require(['./component/spoc-portal/views/system/index.vue'], resolve),
				name:'portal.system',
				children:
				[
					{
						path: '/system/formMean',
						component: (resolve) => require(['./component/spoc-portal/views/formMean/index.vue'], resolve),
						name:'portal.formMean',
						children: [
							
						]
					},
					{
						path: '/system/formMean/edit',
						component: (resolve) => require(['./component/spoc-portal/views/formMean/edit.vue'], resolve),
						name:'portal.formEdit',
					},
					{
						path: '/system/tag',
						name: 'portal.tag',
						meta: {
							title: '标签管理'
						},
						component: (resolve) => {
							require(['./component/spoc-portal/views/tag/tag'], resolve)
						}
					},
					{
						path: '/system/workorderM',
						name: 'portal.workorderM',
						meta: {
							title: '工单管理'
						},
						component: (resolve) => {
							require(['./component/spoc-portal/views/workorderM'], resolve)
						}
					},
					{
						path: '/system/grouping',
						name: 'fas.cae',
						meta:{ title:'分组管理' },
						component: (resolve) => require(['./component/spoc-portal/views/grouping/grouping.vue'], resolve)
					},
					{
						path: '/infoSet.html',
						component: (resolve) => require(['./component/spoc-portal/views/infoSet.vue'], resolve),
					    name:'portal.infoSet',
						meta: { title: '通知设置' },
					},
				]

			},
			{
				path: '/dictmanage',
				component: (resolve) => require(['./component/spoc-portal/views/dictmanage/index.vue'], resolve),
				name:'portal.dictmanage',
				meta: { title: '字典管理' },
			},

	    ]
	},
	{
		path: '/login.html',
		component: (resolve) => require(['./component/spoc-portal/views/login.vue'], resolve),
	    name:'portal.login',
	},
	{
		path: '/schoolApplyTable.html',
		component: (resolve) => require(['./component/spoc-portal/views/apply/schoolApplyTable.vue'], resolve),
	    name:'portal.schoolApplyTable',
	},
];

var children = [];
moduleList.forEach((item)=>
{
	children=[...children,...item];
});
routers[0].children = [...routers[0].children,...children];

export default routers;
