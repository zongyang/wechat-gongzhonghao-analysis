var express = require('express');
var router = express.Router();
router.get('/read-rank/:page/:limit', function(req, res, next) {
	var data = require('./data').readRank;
	doPageOp(req, res, data)
});
router.get('/like-rank/:page/:limit', function(req, res, next) {
	var data = require('./data').likeRank;
	doPageOp(req, res, data)
});
router.get('/hot-rank/:page/:limit', function(req, res, next) {
	var data = require('./data').hotRank;
	doPageOp(req, res, data)
});
router.get('/neirong-rank/:page/:limit', function(req, res, next) {
	var data = require('./data').neirongRank;
	doPageOp(req, res, data)
});
router.get('/shoucang-rank/:page/:limit', function(req, res, next) {
	var data = require('./data').shoucangRank;
	doPageOp(req, res, data)
});
router.get('/', function(req, res, next) {
	res.sendFile(process.cwd() + '/dest/app.html')
});
router.get('/login', function(req, res, next) {
	res.sendFile(process.cwd() + '/dest/login.html')
});
router.post('/login', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var data = require('./data').user;
	if(data.username == username && data.password == password) res.send({
		success: true,
		msg: '登录成功'
	})
	else res.send({
		success: false,
		msg: '密码或用户名错误'
	})
});
router.get('/user', function(req, res, next) {
	var data = require('./data').user;
	res.send({
		success: true,
		msg: data.username
	})
});
router.put('/user', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var newPassword = req.body.newPassword;
	var data = require('./data').user;
	if(data.password != password) {
		res.send({
			success: false,
			msg: '密码不正确'
		});
		return;
	}
	data.password = newPassword;
	data.username = username;
	res.send({
		success: true,
		msg: '账户修改成功'
	})
});
router.get('/crawler', function(req, res, next) {
	res.send({
		success: true,
		msg: '爬虫数据处理完毕'
	})
});
router.get('/tnickname/:page/:limit', function(req, res, next) {
	var data = require('./data').gongzhonghao;
	doPageOp(req, res, data)
});
router.post('/tnickname', function(req, res, next) {
	var data = require('./data').gongzhonghao;
	data.unshift(req.body);
	res.send({
		success: true,
		msg: '添加成功'
	})
});
router.put('/tnickname', function(req, res, next) {
	var data = require('./data').gongzhonghao;
	var i;
	for(i = 0; i < data.length; i++) {
		if(data[i].tnickname == req.body.tnickname) {
			data[i].tnicknameUrl = req.body.tnicknameUrl
			break
		}
	}
	if(i == data.length) {
		res.send({
			success: false,
			msg: '没有找到该记录'
		});
		return;
	}
	res.send({
		success: true,
		msg: '修改成功'
	})
});
router.delete('/tnickname/:tnickname', function(req, res, next) {
	var tnickname = req.params.tnickname;
	var data = require('./data').gongzhonghao;
	var i;
	for(i = 0; i < data.length; i++) {
		if(data[i].tnickname == tnickname) {
			break
		}
	}
	if(i == data.length) {
		res.send({
			success: false,
			msg: '没有找到该记录'
		});
		return;
	}
	data.splice(i, 1);
	res.send({
		success: true,
		msg: '删除成功'
	})
});
router.get('/article/:page/:limit', function(req, res, next) {
	var data = require('./data').article;
	doPageOp(req, res, data)
});
router.delete('/article/:tnickname/:title', function(req, res, next) {
	var tnickname = req.params.tnickname;
	var title = req.params.title;
	var data = require('./data').article;
	var i;
	for(i = 0; i < data.length; i++) {
		if(data[i].tnickname == tnickname && data[i].title == title) {
			break;
		}
	}
	if(i == data.length) {
		res.send({
			success: false,
			msg: '没有找到该记录'
		});
		return;
	}
	data.splice(i, 1);
	res.send({
		success: true,
		msg: '删除成功'
	})
});
router.get('/topic/:page/:limit', function(req, res, next) {
	var data = require('./data').topic;
	doPageOp(req, res, data)
});
router.post('/topic', function(req, res, next) {
	var data = require('./data').topic;
	data.unshift(req.body);
	res.send({
		success: true,
		msg: '添加成功'
	})
});

router.delete('/topic/:title', function(req, res, next) {
	var data = require('./data').topic;
	var title = req.params.title;
	var i;
	for(i = 0; i < data.length; i++) {
		if(data[i].title == title) {
			break;
		}
	}
	if(i == data.length) {
		res.send({
			success: false,
			msg: '没有找到该记录'
		});
		return;
	}
	data.splice(i, 1);
	res.send({
		success: true,
		msg: '删除成功'
	})
});
module.exports = router;

function doPageOp(req, res, data) {
	var page = req.params.page || 1;
	var limit = req.params.limit || 10;
	var temp = [];
	var start = (page - 1) * limit;
	var end = page * limit - 1;
	var pages = Math.ceil(data.length / limit);
	for(var i = start; i <= end && i < data.length; i++) {
		temp.push(data[i])
	}
	res.send({
		success: true,
		msg: {
			data: temp,
			total: data.length,
			pages: pages
		}
	})
}