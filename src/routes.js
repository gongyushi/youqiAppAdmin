import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import homePage from './views/nav1/homePage.vue'
import order from './views/nav2/order.vue'
import appManage from './views/nav3/appManage.vue'
import basic from './views/nav3/basic.vue'
import sitePush from './views/nav3/sitePush.vue'
import userManage from './views/nav3/userManage.vue'
import withdraw from './views/nav3/withdraw.vue'
import article from './views/nav3/article.vue'
import business from './views/nav3/business.vue'
import create from './views/nav3/create.vue'
import service from './views/nav3/service.vue'
import officialBasic from './views/nav4/officialBasic.vue'
import officialOwner from './views/nav4/officialOwner.vue'
import officialPush from './views/nav4/officialPush.vue'
import officialArticle from './views/nav4/officialArticle.vue'
import officialHome from './views/nav4/officialHome.vue'
import officialNotice from './views/nav4/officialNotice.vue'
import help from './views/nav5/help.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/homePage', component: homePage, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/order', component: order, name: 'APP订购' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'APP管理',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/basic', component: basic, name: '基本设置'},
            { path: '/service', component: service, name: '客服信息'},
            { path: '/sitePush', component: sitePush, name: '站点消息推送' },
            { path: '/userManage', component: userManage, name: '用户管理' },
            { path: '/withdraw', component: withdraw, name: '提现管理' },
            { path: '/article', component: article, name: '文章管理' },
            { path: '/business', component: business, name: '电商管理' },
            { path: '/create', component: create, name: '生成APP' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'APP管理（优栖官方）',
        iconCls: 'fa fa-address-card',
        children: [
            { path: '/officialNotice', component: officialNotice, name: '公告'},
            { path: '/officialBasic', component: officialBasic, name: '基本设置'},
            { path: '/officialOwner', component: officialOwner, name: '所有者查看' },
            { path: '/officialPush', component: officialPush, name: '消息推送' },
            { path: '/officialArticle', component: officialArticle, name: '文章管理' },
            { path: '/officialHome', component: officialHome, name: '关于我们' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/help', component: help, name: '帮助中心' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;