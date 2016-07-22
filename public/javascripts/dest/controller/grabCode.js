define(["require","exports"],function(require,exports){"use strict";function grabCode($scope,$rootScope,$location,ToolService,AjaxService){$scope.queryParams={productId:"",hospitalId:"",dayDate:"",code:""},$scope.userInfo={};var loadQueryParams=function(){$location.search().productId&&($scope.queryParams.productId=$location.search().productId),$location.search().hospitalId&&($scope.queryParams.hospitalId=$location.search().hospitalId),$location.search().dayDate&&($scope.queryParams.dayDate=$location.search().dayDate)};$scope.checkCode=function(){$scope.queryParams.code.length<1?ToolService.alert("请填写惠赠码!"):5!=$scope.queryParams.code.length?ToolService.alert("惠赠码错误，请填写正确的惠赠码！如需帮助请致电：0755-26905699"):5==$scope.queryParams.code.length&&AjaxService.post({url:ToolService.host+"/wx/order/checkCode",data:$scope.queryParams,headers:{accessToken:ToolService.user.accessToken}}).then(function(data){0==data.code?getGift($scope.queryParams):ToolService.alert(data.message)})};var getGift=function(queryParams){AjaxService.post({url:ToolService.host+"/wx/gift/getgiftproduct",data:queryParams,headers:{accessToken:ToolService.user.accessToken}}).then(function(data){if(0==data.code){var user=ToolService.getLocal("user");user.giftCode=0,ToolService.setLocal("user",user),ToolService.setLocal("gift",data.data),ToolService.changeRoute("/grab/order")}})};ToolService.reset(),$rootScope.globalProp.hasBgColor=!0,loadQueryParams(),ToolService.checkLogin()&&ToolService.loadUser()}return grabCode});