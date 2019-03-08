
## 门户模块


顶级模块 `src/component/` 目录下包含其他子模块

子模块为单独的gitlab仓库

子模块目录规范为

```

|____router.js
|____src
| |____assets
| | |____svg
| |____libs
| | |____request.js
| |____modules
| |____views

```

根目录必须存在此模块的路由规则，`router.js`

此路由为多级路由嵌套，顶级须为此模块的项目名（去除`-web`）

定义路由须有`name`字段，命名规范`项目简写名称.自定义路由名称` 如 `core.organization`

应用内跳转均使用路由名跳转。

应用内小图标均使用`svg`格式。托管于iconfont,有些图标使用方式不同亦可以存在本地模块内的`assets`目录。

公共模块在`vendors.js`中申明。

路由均使用异步路由


## 开发

开发仅需顶级门户模块安装依赖，子模块无需安装依赖和配置。


`npm run dev`

启动整个门户模块,应用启动时会加载定义好的子模块列（见`src/router.js`中配置使用的模块。）

并加载子模块路由，合并为新路由

注意：子模块`router.js`导出时使用的是`CommonJs`模块规范，而非es6模块



### 应用列表路由定义

控制台 `portal.app`

消息 `message.index`

任务 `task.index`

网盘 `disk.index`

通讯录 `contact.index`

选校 `choiceschool.schoolManage`

组织机构 `core.organization`

资源管理 `core.resource`







