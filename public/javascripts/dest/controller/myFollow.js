define(["require","exports"],function(require,exports){"use strict";function myFollow($scope,$rootScope,$location,ToolService,AjaxService){$scope.params={doctor:!1,user:!0,product:!1},$scope.queryParams={pageRows:10,currentPage:1,flag:1},$scope.follows=[];var getQuery=function(){$location.search().item?$scope["switch"]($location.search().item):ToolService.changeRoute("/user")};$scope["switch"]=function(item){for(var proto in $scope.params)proto==item?$scope.params[proto]=!0:$scope.params[proto]=!1;clearData(),"user"===item&&(setNext($scope.queryUser),$scope.queryUser()),"doctor"===item&&(setNext($scope.queryDoctor),$scope.queryDoctor()),"product"===item&&(setNext($scope.queryProduct),$scope.queryProduct())};var clearData=function(){$scope.follows=[],$rootScope.followTip.has=!1,$scope.queryParams.currentPage=1};$scope.queryUser=function(){$scope.queryParams.flag=1,AjaxService.post({url:ToolService.host+"/wx/focus/focusUserMan",data:$scope.queryParams,headers:{accessToken:ToolService.user.accessToken}}).then(function(data){0===data.code?data.data.length<1?($scope.follows.length<1?$rootScope.followTip.val=$rootScope.followTip.empty:$rootScope.followTip.val=$rootScope.followTip.no,$rootScope.followTip.has=!0):(data.data.forEach(function(item){item.hasFollow=!0,item.followText="已关注"}),$scope.follows=$scope.follows.concat(data.data)):ToolService.alert("数据连接失败，请稍后再试!")})},$scope.queryDoctor=function(){$scope.queryParams.flag=2,AjaxService.post({url:ToolService.host+"/wx/focus/focusDoctorMan",data:$scope.queryParams,headers:{accessToken:ToolService.user.accessToken}}).then(function(data){0===data.code?data.data.length<1?($scope.follows.length<1?$rootScope.followTip.val=$rootScope.followTip.empty:$rootScope.followTip.val=$rootScope.followTip.no,$rootScope.followTip.has=!0):(data.data.forEach(function(item){item.hasFollow=!0,item.followText="已关注"}),$scope.follows=$scope.follows.concat(data.data)):ToolService.alert("数据连接失败，请稍后再试!")})},$scope.queryProduct=function(){$scope.queryParams.flag=3,AjaxService.post({url:ToolService.host+"/wx/focus/focusProductMan",data:$scope.queryParams,headers:{accessToken:ToolService.user.accessToken}}).then(function(data){0===data.code?data.data.length<1?($scope.follows.length<1?$rootScope.followTip.val=$rootScope.followTip.empty:$rootScope.followTip.val=$rootScope.followTip.no,$rootScope.followTip.has=!0):(data.data.forEach(function(item){item.hasFollow=!0,item.followText="已关注"}),$scope.follows=$scope.follows.concat(data.data)):ToolService.alert("数据连接失败，请稍后再试!")})},$scope.switchFollow=function(id,flag){if(ToolService.checkLogin()){if(ToolService.loadUser(),selectFollow(id)){var follow=selectFollow(id);follow.hasFollow?cacelFollow(id,flag):tofollow(id,flag)}}else ToolService.comfirm("请先登录!",function(){$rootScope.followTip.has=!1,ToolService.changeRoute("/login")})};var tofollow=function(id,flag){AjaxService.post({url:ToolService.host+"/wx/post/focus",data:{flag:flag,userId:id},headers:{accessToken:ToolService.user.accessToken}}).then(function(data){if(0==data.code){if(selectFollow(id)){var follow=selectFollow(id);follow.hasFollow=!0,follow.followText="已关注"}}else ToolService.alert("关注失败，稍后再试!")})},cacelFollow=function(id,flag){AjaxService.post({url:ToolService.host+"/wx/post/cacelFocus",data:{flag:flag,userId:id},headers:{accessToken:ToolService.user.accessToken}}).then(function(data){if(0==data.code){if(selectFollow(id)){var follow=selectFollow(id);follow.hasFollow=!1,follow.followText="关注"}}else ToolService.alert("取消关注失败，稍后再试!")})},selectFollow=function(id){for(var proto in $scope.follows){var follow=$scope.follows[proto];if(follow.id==id)return follow}},setNext=function(fn){ToolService.onWindowListen(function(){$scope.queryParams.currentPage++,fn()})};ToolService.reset(),ToolService.checkLogin()?(ToolService.loadUser(),getQuery()):ToolService.changeRoute("/user")}return myFollow});