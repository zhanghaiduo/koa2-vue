# koa2-vue
- 洞见人才库
- 技术栈：
    - 后端主要技术栈：Node.js + Koa2 + Sequelize + jsonwebtoken.
    - 前端主要技术栈：Vue.js + ElementUi + es6/es7
    - 后台系统模板使用 vue-admin-template 
    - 数据库：mySql
- 功能模块：
    - 登录（JWT验证）
    - 简历列表（按职位划分权限）
    - 系统管理
    - 用户列表
    - 职位列表....

## 可能遇到的问题
```
由于koa2需要node7版本以上支持， CentOS 无法通过 yum 安装新版 nodejs 解决办法
第一步：
curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
第二步：
sudo yum clean all
如果以上步骤不能安装 最新版 node，执行以下命令后再执行第二步：
sudo yum clean all
如果存在多个 nodesoucre，执行以下命令删除，然后重新执行第一第二步：：
sudo rm -fv /etc/yum.repos.d/nodesource*

```

## Project setup
```
npm install
```

### 开发运行
```
npm start 
node server/server 
```

### 打包
```
npm run build:prod
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
