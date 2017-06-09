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

});;
(function() {
    var adminCtrls = angular.module('adminCtrls', []);
    adminCtrls.controller('adminRootCtrl', function($scope, $http, $state, modal, login) {
        $scope.sibarCls = {};
        $scope.$on('sideBarChange', function(event, key) {
            $scope.sibarCls = {};
            $scope.sibarCls[key] = 'active'
        });
        $scope.logout = function(e) {
            e.preventDefault();
            login.setState(null);
            $state.go('login')
        }
        $scope.preventDefault = function(e) {
            e.preventDefault()
        };
        $scope.user = {
            username: login.getState()
        }
    });
    adminCtrls.controller('indexCtrl', function($scope, $http, modal) {
        $scope.$emit('sideBarChange', 'index');
        $scope.startCrawler = function() {
            $http.get('crawler').success(function(res) {
                modal.alertShow(res.msg)
            })
        }
    });
    adminCtrls.controller('gongzhonghaoCtrl', function($scope, $http, modal, util, connectServer) {
        $scope.$emit('sideBarChange', 'gongzhonghao');
        $scope.editOp = true;
        $scope.delOp = true;
        $scope.modelKeys = ['tnickname', 'tnicknameUrl'];
        $scope.thNames = ['公众号', '公众号地址', '操作'];
        $scope.getData = connectServer.getData($scope, 'tnickname/');
        $scope.delData = function(data) {
            $http.delete('tnickname/' + data.tnickname).success(function(res) {
                if (res.success) {
                    $scope.getData()
                }
                modal.alertShow(res.msg)
            })
        }
        $scope.editData = function() {
            $http.put('tnickname', $scope.selectedData).success(function(res) {
                modal.alertShow(res.msg);
                if (res.success) {
                    util.updateGongzhonghao($scope.trDatas, $scope.selectedData)
                }
            })
        }
        $scope.addData = function() {
            $http.post('tnickname', $scope.selectedData).success(function(res) {
                modal.alertShow(res.msg);
                if (res.success) {
                    $scope.getData()
                }
            })
        }
        $scope.getData()
    });
    adminCtrls.controller('articleCtrl', function($scope, $http, modal, util, connectServer) {
        $scope.delOp = true;
        $scope.$emit('sideBarChange', 'article');
        $scope.modelKeys = ['title', 'tnickname', 'tcontent', 'titleUrl', 'ttime'];
        $scope.thNames = ['标题', '公众号', '内容', '文章地址', '添加日期', '操作'];
        $scope.getData = connectServer.getData($scope, 'article/');
        $scope.delData = function(data) {
            $http.delete('article/' + data.tnickname + '/' + data.title).success(function(res) {
                if (res.success) {
                    $scope.getData()
                }
                modal.alertShow(res.msg)
            })
        }
        $scope.getData()
    });
    adminCtrls.controller('topicCtrl', function($scope, $http, modal, util, connectServer) {
        $scope.delOp = true;
        $scope.$emit('sideBarChange', 'topic');
        $scope.modelKeys = ['title', 'titleSum', 'treadNum', 'treadAvgNum', 'tlikeNum', 'tlikeAvgNum'];
        $scope.thNames = ['话题', '文章总数', '阅读总数', '平均阅读书', '点赞总数', '平均点赞数', '操作'];
        $scope.getData = connectServer.getData($scope, 'topic/');
        $scope.getData();

        //添加话题
        $scope.addData = function(isValid) {
            if (!isValid) {
                return;
            }
            $http.post('topic', {
                title: $scope.title
            }).success(function(res) {
                modal.alertShow(res.msg);
                if (res.success) {
                    $scope.getData();
                }
            });

        };
        //删除话题
        $scope.delData = function(data) {
            $http.delete('topic/' + data.title).success(function(res) {
                if (res.success) {
                    $scope.getData()
                }
                modal.alertShow(res.msg)
            })
        }
    });
    adminCtrls.controller('userCtrl', function($scope, $http, modal) {
        $scope.$emit('sideBarChange', 'user');
        $scope.username = $scope.user.username;
        $scope.submit = function(isValid) {
            if (!isValid) {
                return;
            }
            if ($scope.newPassword != $scope.confirmPassword) {
                modal.alertShow('两次密码输入不一致');
                return;
            }
            $http.put('user', {
                username: $scope.username,
                password: $scope.password,
                newPassword: $scope.newPassword
            }).success(function(res) {
                modal.alertShow(res.msg);
                if (res.success) {
                    $scope.user.username = $scope.username;
                }
            })
        }
    })
})();
(function() {
    var frontCtrls = angular.module('frontCtrls', []);
    frontCtrls.controller('frontRootCtrl', function($scope) {});
    frontCtrls.controller('readRankCtrl', function($scope, $http) {
        $http.get('read-rank/1/5').success(function(res) {
            $scope.readRankData = res.msg.data
        })
    });
    frontCtrls.controller('hotRankCtrl', function($scope, $http) {
        $http.get('hot-rank/1/5').success(function(res) {
            $scope.hotRankData = res.msg.data
        })
    });
    frontCtrls.controller('likeRankCtrl', function($scope, $http) {
        $http.get('like-rank/1/5').success(function(res) {
            $scope.likeRankData = res.msg.data
        })
    });
    frontCtrls.controller('neirongRankCtrl', function($scope, $http) {
        $http.get('neirong-rank/1/5').success(function(res) {
            $scope.neirongRankData = res.msg.data
        })
    });
    frontCtrls.controller('shoucangRankCtrl', function($scope, $http) {
        $http.get('shoucang-rank/1/5').success(function(res) {
            $scope.shoucangRankData = res.msg.data
        })
    });
    frontCtrls.controller('readCtrl', function($scope, $http, connectServer) {
        $scope.modelKeys = ['tnickname', 'title', 'tcontent', 'titleUrl', 'treadNum', 'ttime'];
        $scope.thNames = ['公众号', '文章标题', '文章内容', '文章地址', '阅读数', '时间'];
        $scope.getData = connectServer.getData($scope, 'read-rank/');
        $scope.getData()
    });
    frontCtrls.controller('hotCtrl', function($scope, $http, connectServer) {
        $scope.modelKeys = ['hotTitle', 'hotUrl'];
        $scope.thNames = ['热搜词', '热搜词地址'];
        $scope.getData = connectServer.getData($scope, 'hot-rank/');
        $scope.getData()
    });
    frontCtrls.controller('likeCtrl', function($scope, $http, connectServer) {
        $scope.modelKeys = ['tnickname', 'title', 'tcontent', 'titleUrl', 'tlikeNum', 'ttime'];
        $scope.thNames = ['公众号', '文章标题', '文章内容', '文章地址', '点赞数', '时间'];
        $scope.getData = connectServer.getData($scope, 'like-rank/');
        $scope.getData()
    });
    frontCtrls.controller('neirongCtrl', function($scope, $http, connectServer) {
        $scope.modelKeys = ['nrUserName', 'nrUserUrl', 'nrTit', 'nrTitUrl', 'nrTime'];
        $scope.thNames = ['公众号', '公众号地址', '文章标题', '文章地址', '时间'];
        $scope.getData = connectServer.getData($scope, 'neirong-rank/');
        $scope.getData()
    });
    frontCtrls.controller('shoucangCtrl', function($scope, $http, connectServer) {
        $scope.modelKeys = ['scUserName', 'scUserUrl', 'scTit', 'scTitUrl', 'scTime'];
        $scope.thNames = ['公众号', '公众号地址', '文章标题', '文章地址', '时间'];
        $scope.getData = connectServer.getData($scope, 'shoucang-rank/');
        $scope.getData()
    })
})();
(function() {
    var services = angular.module('services', []);
    services.service('login', function() {
        this.getState = function() {
            return sessionStorage.getItem('user');
        }
        this.setState = function(value) {
            sessionStorage.setItem('user', value);
        }
    })

    // dataStruct:{keys:[]}
    services.service('connectServer', function($http, pageConfig, modal) {
        var _this = this;

        this.getData = function($scope, url, dataStruct, cb) {
            pageConfig.init();
            $scope.pageConfig = pageConfig;
            return function() {
                $http.get(url + $scope.pageConfig.curentPage + '/' + $scope.pageConfig.limit).success(function(res) {
                    if (res.success) {
                        $scope.trDatas = _this.setDataStruct($scope.modelKeys, res.msg.data);
                        $scope.pageConfig.pages = res.msg.pages;
                        $scope.pageConfig.total = res.msg.total;

                        if (cb)
                            cb(res.msg);
                    } else {
                        modal.alertShow(res.msg)
                    }
                })
            }
        }

        this.setDataStruct = function(keys, data) {
            var obj = {};
            var arr = [];
            var i, j;
            for (i = 0; i < data.length; i++) {
                obj = {};
                for (j = 0; j < keys.length; j++) {
                    obj[keys[j]] = data[i][keys[j]];
                }
                arr.push(obj);
            }
            return arr;
        }

    })
    services.service('util', function() {
        //本地更新公众号数组
        this.updateGongzhonghao = function(arr, obj) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]['tnickname'] == obj['tnickname']) {
                    arr[i] = obj;
                    break;
                }
            }

        }
        this.objIsEqual = function(a, b) {
            // 获取对象属性的所有的键
            var aProps = Object.getOwnPropertyNames(a);
            var bProps = Object.getOwnPropertyNames(b);

            // 如果键的数量不同，那么两个对象内容也不同
            if (aProps.length != bProps.length) {
                return false;
            }

            for (var i = 0, len = aProps.length; i < len; i++) {
                var propName = aProps[i];

                // 如果对应的值不同，那么对象内容也不同
                if (a[propName] !== b[propName]) {
                    return false;
                }
            }

            return true;
        }
    })
    services.service('pageConfig', function() {
        this.limit = 10;
        this.curentPage = 1;
        this.pages = 1;
        this.total = 0;

        this.init = function() {
            this.limit = 10;
            this.curentPage = 1;
            this.pages = 1;
            this.total = 0;
        }
    });
    services.service('match', function() {
        this.isUrl = function(str) {
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/.test(str)
        }
        this.hasSpace = function(str) {
            return /\s+/.test(str)
        }
    })

    services.service('modal', function($timeout) {

        var $alert;
        var $loading;
        var $confirm;

        //confirm
        this.confirmShow = function(content, okCb, cancleCb) {
            $confirm = $confirm || $('.confirm-modal');
            $confirm.find('.confirm-modal-content').text(content);
            $confirm.modal('show');

            $confirm.find('.ok').one('click', function() {
                if (okCb)
                    okCb();
            })

            $confirm.find('.cancle').one('click', function() {
                if (cancleCb)
                    cancleCb();
            })
        }

        this.confirmClose = function() {
            var $confirm = $confirm || $('.confirm-modal');
            $confirm.modal('hide');
        }

        // alert
        this.alertShow = function(content) {
            $alert = $alert || $('.alert-modal');
            $alert.find('.alert-modal-content').text(content);
            $alert.modal('show');

            $timeout(function() {
                $alert.modal('hide');
            }, 1000)

        }

        // loading
        this.loadingShow = function() {
            $loading = $loading || $('.loading-modal');
            $loading.modal('show');
        }

        this.loadingClose = function() {
            $loading = $loading || $('.loading-modal');
            $loading.modal('hide');
        }

        //gongzhonghao-edit-modal
        this.gongzhonghaoEditModalShow = null;
        this.gongzhonghaoEditModalClose = null;
        this.gongzhonghaoEditModalOkHandle = null;

        //topic-edit-modal
        this.topicAddModalShow = null;
        this.topicAddModalClose = null;
    })
})();
(function() {
    var filters = angular.module('filters', []);

    filters.filter('ellipsis', function() {
        return function(input, length) {
            length = length || 125;
            if (!angular.isString(input)) {
                return input;
            }
            if (input.length > length)
                return input.substring(0, length) + '...';
            else
                return input;
        }
    })
})();
(function() {
    var adminDirs = angular.module('adminDirs', []);
    adminDirs.directive('pSidebar', function() {
        // 写个filter控制显示字数
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/admin.sidebar.html',
            link: function(scope, element, attr) {

            }
        }
    })

    adminDirs.directive('pGongzhonghaoAddBtn', function(modal) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/admin.gongzhonghao.addBtn.html',
            link: function(scope, element, attr) {
                scope.addDataHandle = function() {
                    scope.edit = false;

                    scope.gongzhonghaoEditForm.$setPristine();
                    scope.selectedData = {
                        tnickname: null,
                        tnicknameUrl: null
                    };
                    modal.gongzhonghaoEditModalShow();
                }
            }
        }
    })

    adminDirs.directive('pTopicAddBtn', function(modal) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/admin.topic.addBtn.html',
            link: function(scope, element, attr) {
                scope.addDataHandle = function() {
                    scope.topicAddFrom.$setPristine();
                    scope.title = null;
                    modal.topicAddModalShow();
                }
            }
        }
    })
    adminDirs.directive('pTopicAddModdal', function(modal) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/admin.topic.add.html',
            link: function(scope, element, attr) {
                modal.topicAddModalShow = function() {
                    element.modal('show');
                }
                modal.topicAddModalClose = function() {
                    element.modal('hide');
                }

                element.find('.cancle,.close,.ok').bind('click', function(e) {
                    element.modal('hide');
                })
            }
        }
    })


    adminDirs.directive('pGongzhonghaoEditModdal', function(modal) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/admin.gongzhonghao.edit.html',
            link: function(scope, element, attr) {
                modal.gongzhonghaoEditModalShow = function() {
                    element.modal('show');
                }
                modal.gongzhonghaoEditModalClose = function() {
                    element.modal('hide');
                }

                element.find('.cancle,.close,.ok').bind('click', function(e) {
                    element.modal('hide');
                })

                scope.submit = function(isValid) {
                    if (isValid && scope.edit) {
                        scope.editData();
                    } else if (isValid) {
                        scope.addData();
                    }
                }
            }
        }
    })

})();
(function() {
    var frontDirs = angular.module('frontDirs', []);
    frontDirs.directive('pRead', function() {
        return {
            restrict: 'AE',
            scope: false,
            templateUrl: 'tpls/front.read.html',
            link: function(scope, element, attr) {

            }
        }
    })

    frontDirs.directive('pHot', function() {
        return {
            restrict: 'AE',
            scope: false,
            templateUrl: 'tpls/front.hot.html',
            link: function(scope, element, attr) {

            }
        }
    })

    frontDirs.directive('pShoucang', function() {
        return {
            restrict: 'AE',
            scope: false,
            templateUrl: 'tpls/front.shoucang.html',
            link: function(scope, element, attr) {}
        }
    })
    frontDirs.directive('pLike', function() {
        return {
            restrict: 'AE',
            scope: false,
            templateUrl: 'tpls/front.like.html',
            link: function(scope, element, attr) {}
        }
    })

    frontDirs.directive('pNeirong', function() {
        return {
            restrict: 'AE',
            scope: false,
            templateUrl: 'tpls/front.neirong.html',
            link: function(scope, element, attr) {}
        }
    })
})();
(function() {
    var wechatApp = angular.module('wechatApp');
    wechatApp.controller('wechatAppLoginCtrl', function($scope, $http, $state, modal, login) {

        $scope.submit = function(isValid) {
            if (!isValid)
                return

            $http.post('login', {
                username: $scope.username,
                password: $scope.password
            }).success(function(res) {
                modal.alertShow(res.msg);
                if (res.success) {
                    login.setState($scope.username);
                    //					window.location.href = '/#/admin/index'
                    $state.go('admin');
                }

            })

        }
    })

})();
(function() {
    var pluginDirs = angular.module('pluginDirs', []);
    pluginDirs.directive('pTable', function(match, modal) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/plugin.table.html',
            link: function(scope, element, attr) {
                scope.isUrl = function(str) {
                    var rst = match.isUrl(str);
                    return rst;
                }

                element.delegate('.p-table-remove,.p-table-edit', 'click', function(e) {
                    e.preventDefault();
                })

                scope.delDataHandle = function(data) {
                    modal.confirmShow('是否要删除这条记录 ?', function() {
                        scope.delData(data);
                    });
                }
                scope.selectDataHandle = function(data) {
                    scope.edit = true;
                    scope.selectedData = angular.copy(data); //复制选中行数据，避免编辑时就已经反映到表格上
                    modal.gongzhonghaoEditModalShow();
                }


            }
        }
    })
    pluginDirs.directive('pPager', function(pageConfig) {
        return {
            restrict: 'AE',
            replace: true,
            scope: false,
            templateUrl: 'tpls/plugin.pager.html',
            link: function(scope, element, attr) {

                //将数字转化成数据，用于ng-repeat
                scope.num2Arr = function(num) {
                    return new Array(num);
                }

                //阻止a标签的默认事件
                element.delegate('a', 'click', function(e) {
                    e.preventDefault();
                })

                //如果当前页码处于激活状态，则阻止该页码的后续事件，避免重复获取相同的数据
                element.delegate('li', 'click', function(e) {
                    if ($(e.currentTarget).hasClass('active'))
                        e.stopImmediatePropagation();
                })

                //页码点击事件
                element.delegate('.page-turn', 'click', function(e) {
                    scope.pageConfig.curentPage = $(e.target).text();
                    scope.getData();

                    $(e.currentTarget)
                        .addClass('active')
                        .siblings().filter('.page-turn')
                        .removeClass('active')
                })

                //下一页按钮点击事件
                element.find('.page-up').click(function(e) {
                    var $active = element.find('.page-turn.active');
                    var nextBtn = $active.find('+li.page-turn');

                    if (nextBtn.length != 1) {
                        return
                    }

                    $active.removeClass('active');
                    nextBtn.addClass('active');

                    scope.pageConfig.curentPage = parseInt($active.find('a').text()) + 1;
                    scope.getData();

                })

                //上一页按钮点击事件
                element.find('.page-down').click(function(e) {
                    var $active = element.find('.page-turn.active');
                    var prevBtn = $active.prev('.page-turn');

                    if (prevBtn.length != 1) {
                        return
                    }

                    $active.removeClass('active');
                    prevBtn.addClass('active');

                    scope.pageConfig.curentPage = parseInt($active.find('a').text()) - 1;
                    scope.getData();

                })
            }
        }
    })

    //还不知怎么提供方法给控制调用，其暴露的给控制器或者其他服务的功能写在了services.js里面
    pluginDirs.directive('pModal', function() {
        return {
            restrict: 'AE',
            replace: true,
            templateUrl: 'tpls/plugin.modal.html',
            link: function(scope, element, attr) {
                var $confirm = element.find('.confirm-modal');
                var $alert = element.find('.alert-modal');
                var $loading = element.find('.loading-modal');

                element.find('.close,.ok,.cancle').click(function(e) {
                    $(e.target).parents('.modal').modal('hide');
                });

            }
        }
    })
})()