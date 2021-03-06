/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");

/**
 * mycountCtrl
 */
class MycountCtrl {
    constructor() {}

    /**
     * 根据用户token获取用户信息
     */
    static async getUserByToken(params:any):Promise<HttpResult>{
        let result:HttpResult;
        let sqlResult:any;
        let sql = "select * from user where id in (select user_id from user_token where access_token = '"+params.accessToken+"')";        
        try{
            sqlResult = await MysqlConnect.query(sql);
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void,reject:(value:HttpResult)=>void)=>{
                let filterResult = Tool.FilterResult(["id","nickname","phone","face","sex","realname","email","gift_code","alipay","wxpay","referralCode"],sqlResult[0]);
                filterResult["accessToken"] = params.accessToken;
                result = HttpResult.CreateResult(filterResult,0,"查询成功!");
                resolve(result);
            })
        }catch(err){
            return new Promise<any>((resolve:(value:any)=>void,reject:(vlaue:any)=>void)=>{
                reject(err);
            })
        }
        
    }
}

export = MycountCtrl;