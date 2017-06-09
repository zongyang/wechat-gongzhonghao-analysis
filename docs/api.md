# 前端所需接口

1. 最大化的依据爬虫结果（[微信返回内容](./%E5%BE%AE%E4%BF%A1%E8%BF%94%E8%BF%98%E5%86%85%E5%AE%B9.docx)）定义接口

2. 采用RESTful设计风格，POST、DELETE、PUT、GET表示增删改查的动作

3. 分页计算约定
	```
	1.page:当前请求页面，默认1
	2.limit:一页的记录数，默认为15
	3.pages:总页数
	4.total:总记录条数
	5.当前页（page）的记录:(page-1)*limit~page*limit-1
	6.总页数:pages=total/limit+1
	```


### 目录

---

####[前台接口](./前台.md)

<a href="./前台.md#read-rank">1.1. 获得阅读排行</a>

<a href="./前台.md#like-rank">1.2. 获得点赞排行</a>

<a href="./前台.md#hot-rank">1.3. 获得热搜排行</a>

<a href="./前台.md#neirong-rank">1.4. 获得内容排行</a>

<a href="./前台.md#shoucang-rank">1.5. 获得收藏排行</a>

<a href="./前台.md#index">1.6. 获得系统启动页面</a>

####[后台接口](./后台.md)

<a href="./后台.md#get-login">2.1. 获得登录界面</a>

<a href="./后台.md#post-user">2.2. 登录处理</a>

<a href="./后台.md#get-user">2.3. 获得管理员信息</a>

<a href="./后台.md#put-user">2.4. 修改管理员信息</a>

<a href="./后台.md#get-crawler">2.5. 启动爬虫（测试环境使用）</a>

<a href="./后台.md#get-tnickname">2.6. 获得公众号列表</a>

<a href="./后台.md#post-tnickname">2.7. 添加公众号</a>

<a href="./后台.md#put-tnickname">2.8. 修改公众号</a>

<a href="./后台.md#delete-tnickname">2.9. 删除公众号</a>

<a href="./后台.md#get-article">2.10. 获得文章列表</a>

<a href="./后台.md#delete-article">2.11. 文章删除</a>

<a href="./后台.md#get-topic">2.12. 获得话题报告</a>

<a href="./后台.md#post-topic">2.13. 添加话题</a>

<a href="./后台.md#delete-topic">2.14. 删除话题</a>
