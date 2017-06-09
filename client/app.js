var wechatApp = angular.module('wechatApp', [
	//	angularjs components
	'ui.router',
	// servers
	'services',
	// controllers
	'adminCtrls',
	'frontCtrls',
	// directives
	'adminDirs',
	'frontDirs',
	'pluginDirs',
	// filter
	'filters'

]);

wechatApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/front/index');
	$urlRouterProvider.when('/front', '/front/index')
	$urlRouterProvider.when('/admin', '/admin/index');
	$stateProvider
	// index
		.state('front', {
			url: '/front',
			templateUrl: 'tpls/front.layout.html'
		})
		.state('front.index', {
			url: '/index',
			templateUrl: 'tpls/front.index.html'
		})
		.state('front.read', {
			url: '/read',
			templateUrl: 'tpls/front.read.page.html'
		})
		.state('front.hot', {
			url: '/hot',
			templateUrl: 'tpls/front.hot.page.html'
		})
		.state('front.like', {
			url: '/like',
			templateUrl: 'tpls/front.like.page.html'
		})
		.state('front.neirong', {
			url: '/neirong',
			templateUrl: 'tpls/front.neirong.page.html'
		})
		.state('front.shoucang', {
			url: '/shoucang',
			templateUrl: 'tpls/front.shoucang.page.html'
		})
		//admin
		.state('admin', {
			url: '/admin',
			templateUrl: 'tpls/admin.layout.html'
		})
		.state('admin.index', {
			url: '/index',
			templateUrl: 'tpls/admin.index.html'
		})
		.state('admin.gongzhonghao', {
			url: '/gongzhonghao',
			templateUrl: 'tpls/admin.gongzhonghao.html'
		})
		.state('admin.article', {
			url: '/article',
			templateUrl: 'tpls/admin.article.html'
		})
		.state('admin.topic', {
			url: '/topic',
			templateUrl: 'tpls/admin.topic.html'
		})
		.state('admin.user', {
			url: '/user',
			templateUrl: 'tpls/admin.user.html'
		})
		//login
		.state('login', {
			url: '/login',
			templateUrl: 'tpls/login.tpl.html'
		})

});