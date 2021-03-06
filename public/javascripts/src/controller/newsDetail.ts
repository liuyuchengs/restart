import IRootScope = require("IRootScope");
import ag = require("angular");
import Ajax = require("../modules/Ajax");
import Tool = require("../modules/Tool");

function newsDetail($scope:any,$rootScope:IRootScope.rootScope,$location:ag.ILocationService,AjaxService:Ajax,ToolService:Tool){
    $scope.detail = {};
    $scope.id = null;

    //加载资讯信息
    let loadDetail = function(){
        AjaxService.post({
            url:ToolService.host+"/wx/health/querydetail",
            data:{id:$scope.id},
        }).then((data:any)=>{
            if(data.code==0){
                data.data.content = mergeDetail(data.data.content);
                $scope.detail = data.data;
            }else{
                ToolService.alert("查询数据失败，请稍后再试!");
            }
        })
    }

    /**
     * 对资讯信息进行排版
     */
    let mergeDetail = (str:any)=>{
        var sourceArray = str.split("\r\n");
        var destArray:string[] = [];
        if(sourceArray.length>0){
            for(var index in sourceArray){
                if(sourceArray[index].trim().length>0){
                    destArray.push(sourceArray[index].trim());
                }
            }
        }else{
            destArray.push(str);
        }
        return destArray;
    }

        //初始化页面
    ToolService.reset();
    if($location.search().id){
        $scope.id = $location.search().id;
        loadDetail();
    }else{
        ToolService.changeRoute("/home");
    }
    
}

export = newsDetail;
