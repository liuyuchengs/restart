define(["require","exports"],function(require,exports){"use strict";function write($scope,$rootScope,$http,ToolService,AjaxService){$scope.postData=new FormData,$scope.noBeforeSelect=!0,$scope.noAfterSelect=!0,$scope.beforeParams={input1:{has:!1,url:"",val:"#input1"},input2:{has:!1,url:"",val:"#input2"},input3:{has:!1,url:"",val:"#input3"},input4:{has:!1,url:"",val:"#input4"},input5:{has:!1,url:"",val:"#input5"},input6:{has:!1,url:"",val:"#input6"}},$scope.afterParams={input7:{has:!1,url:"",val:"#input7"},input8:{has:!1,url:"",val:"#input8"},input9:{has:!1,url:"",val:"#input9"}},$scope.queryParams={postName:null,postIntro:null,postContent:null,hospitalId:null,doctorId:null,productId:null,img1:null,img2:null,img3:null,p1:null,p2:null,p3:null,flag:1},$scope.switchParams=[{has:!0,val:"看牙",id:1},{has:!1,val:"求美",id:2},{has:!1,val:"孕·生",id:3}],$scope.order={has:!1,orderInfo:null},$scope.select={has:!1,value:""},$scope.goTo=function(path){ToolService.checkLogin()?ToolService.changeRoute(path):ToolService.comfirm("您还没有登录，请先登录",function(){$rootScope.messageTip.has=!1,ToolService.changeRoute("/user")})},$scope.listen=function(){$("#input1").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input1.has=!0,$scope.beforeParams.input1.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input2").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input2.has=!0,$scope.beforeParams.input2.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input3").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input3.has=!0,$scope.beforeParams.input3.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input4").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input4.has=!0,$scope.beforeParams.input4.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input5").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input5.has=!0,$scope.beforeParams.input5.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input6").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.beforeParams.input6.has=!0,$scope.beforeParams.input6.url=url,$scope.noBeforeSelect=!1,$scope.$apply()}),$("#input7").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.afterParams.input7.has=!0,$scope.afterParams.input7.url=url,$scope.noAfterSelect=!1,$scope.$apply()}),$("#input8").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.afterParams.input8.has=!0,$scope.afterParams.input8.url=url,$scope.noAfterSelect=!1,$scope.$apply()}),$("#input9").on("change",function(){var url=$scope.getUrl(this.files[0]);$scope.afterParams.input9.has=!0,$scope.afterParams.input9.url=url,$scope.noAfterSelect=!1,$scope.$apply()})},$scope.getUrl=function(obj){var url=null;return void 0!=window.URL&&(url=window.URL.createObjectURL(obj)),url},$scope["switch"]=function(index){ToolService.select(index,$scope.switchParams),$scope.switchParams[index]&&($scope.queryParams.flag=$scope.switchParams[index].id)},$scope.mergeSay=function(){var imgStr="img",pStr="p",count=1,afterCount=3,file=new Blob([""],{type:"image/jpeg"});for(var index in $scope.beforeParams){var prototype=$scope.beforeParams[index];prototype.has&&(count<4?($scope.postData.append(imgStr+count,$(prototype.val).get(0).files[0]),count++):($scope.postData.append(pStr+(count-afterCount),$(prototype.val).get(0).files[0]),count++))}for(count;count<7;count++)count<4?$scope.postData.append(imgStr+count,file):$scope.postData.append(pStr+(count-afterCount),file);$scope.postData.append("postName",$scope.queryParams.postName),$scope.postData.append("postContent",$scope.queryParams.postContent),$scope.postData.append("flag",$scope.queryParams.flag),$scope.postData.append("postFlags",2)},$scope.mergeNote=function(){var imgStr="img",beforeCount=1,file=new Blob([""],{type:"image/jpeg"});for(var index in $scope.beforeParams){var prototypeB=$scope.beforeParams[index];prototypeB.has&&($scope.postData.append(imgStr+beforeCount,$(prototypeB.val).get(0).files[0]),beforeCount++)}if(beforeCount<4)for(;beforeCount<4;beforeCount++)$scope.postData.append(imgStr+beforeCount,file);var pStr="p",afterCount=1;for(var index in $scope.afterParams){var prototypeA=$scope.afterParams[index];prototypeA.has&&($scope.postData.append(pStr+afterCount,$(prototypeA.val).get(0).files[0]),afterCount++)}if(afterCount<4)for(;afterCount<4;afterCount++)$scope.postData.append(pStr+afterCount,file);$scope.postData.append("postName",$scope.queryParams.postName),$scope.postData.append("postContent",$scope.queryParams.postContent),$scope.postData.append("flag",$scope.queryParams.flag),$scope.postData.append("productId",$scope.queryParams.productId),$scope.postData.append("doctorId",$scope.queryParams.doctorId),$scope.postData.append("hospitalId",$scope.queryParams.hospitalId),$scope.postData.append("postFlags",1)},$scope.addPost=function(merge){if(""==$scope.queryParams.postName||null==$scope.queryParams.postName||""==$scope.queryParams.postContent||null==$scope.queryParams.postContent)ToolService.alert("请填写发帖内容!");else{var url=ToolService.host+"/wx/post/addPost";merge(),$rootScope.load.has=!0,$http.post(url,$scope.postData,{headers:{"Content-Type":void 0,accessToken:ToolService.user.accessToken}}).success(function(data){$rootScope.load.has=!1,0==data.code?ToolService.changeRoute("/interaction"):ToolService.alert("连接失败，请稍后再试!")}).error(function(){$rootScope.load.has=!1,$scope.postData=new FormData,ToolService.alert("连接失败，请稍后再试!")})}},$scope.addSayPost=function(){$scope.addPost($scope.mergeSay)},$scope.addNotePost=function(){$scope.select.has?ToolService.alert("您还没有已完成的项目，暂不能写日记"):null==$scope.queryParams.productId||null==$scope.queryParams.hospitalId||null==$scope.queryParams.doctorId?ToolService.alert("请选择项目信息"):$scope.addPost($scope.mergeNote)},$scope.chooseSayPic=function(){var count=0;for(var item in $scope.beforeParams){var prototype=$scope.beforeParams[item];if(count++,!prototype.has)return void $(prototype.val).click()}6==count&&ToolService.alert("最多只能上传6张图片!")},$scope.chooseBeforePic=function(){var count=0;for(var item in $scope.beforeParams)if(count++,count<4){var prototype=$scope.beforeParams[item];if(!prototype.has)return void $(prototype.val).click()}else ToolService.alert("术后最多上传三张照片")},$scope.chooseAfterPic=function(){var count=0;for(var item in $scope.afterParams){count++;var prototype=$scope.afterParams[item];if(!prototype.has)return void $(prototype.val).click()}3==count&&ToolService.alert("术后最多上传三张照片")},$scope.removeBefore=function(item){$scope.beforeParams[item]&&($scope.beforeParams[item].has=!1,$scope.beforeParams[item].url="",$scope.clear(item),$scope.listen())},$scope.removeAfter=function(item){$scope.afterParams[item]&&($scope.afterParams[item].has=!1,$scope.afterParams[item].url="",$scope.clear(item),$scope.listen())},$scope.clear=function(selector){var element=document.getElementById(selector);element.outerHTML=element.outerHTML},$scope.loadOrder=function(){AjaxService.post({url:ToolService.host+"/wx/order/queryOrderList",data:{status:"",userId:ToolService.user.id},headers:{accessToken:ToolService.user.accessToken}}).then(function(data){if(0===data.code){var result=data.data.filter(function(item){return 4==item.status});result.length>0&&($scope.order.has=!0,$scope.order.orderInfo=result);for(var index in $scope.order.orderInfo)$scope.order.orderInfo[index].has=!1}})},$scope.chooseOrder=function(){$scope.order.has?$scope.select.has=!$scope.select.has:ToolService.alert("您还没有已完成的项目，暂不能写日记")},$scope.chooseProduct=function(id){for(var prototype in $scope.order.orderInfo)$scope.order.orderInfo[prototype].has&&($scope.order.orderInfo[prototype].has=!1,$scope.queryParams.productId=null,$scope.queryParams.doctorId=null,$scope.queryParams.hospitalId=null);for(var prototype in $scope.order.orderInfo)$scope.order.orderInfo[prototype].id==id&&($scope.order.orderInfo[prototype].has=!0,$scope.select.value=$scope.order.orderInfo[prototype].productName,$scope.select.has=!1,$scope.queryParams.productId=$scope.order.orderInfo[prototype].productId,$scope.queryParams.doctorId=$scope.order.orderInfo[prototype].doctorId,$scope.queryParams.hospitalId=$scope.order.orderInfo[prototype].hospitalId)},ToolService.reset(),$rootScope.globalProp.hasBgColor=!0,ToolService.checkLogin()?(ToolService.loadUser(),$scope.loadOrder(),$scope.listen()):ToolService.comfirm("请先登录",function(){$rootScope.followTip.has=!1,ToolService.changeRoute("/login")})}return write});