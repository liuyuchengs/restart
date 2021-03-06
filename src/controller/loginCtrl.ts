/// <reference path="./../../typings/index.d.ts"/>
import HttpResult = require("./../modules/HttpResult");
import MysqlConnect = require("./../modules/MysqlConnect");
import Tool = require("./../modules/Tool");

/**
 * loginCtrl
 */
class LoginCtrl {
    constructor() {}
    /**
     * 检查账号密码是否符合要求
     */
    static check(params:any){
        if(params.phone&&params.password){
            if(/^1[3|4|5|7|8]\d{9}$/.test(params.phone)&&params.password.length>=8&&params.password.length<=20){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
    /**
     * 登录操作
     */
    static async login(params:any):Promise<HttpResult>{
        let result:HttpResult;
        let sqlResult:any;
        let sql = "select * from (select * from user where phone = '"+params.phone+"') as users left join user_token as token on users.id = token.user_id";
        try{
            sqlResult = await MysqlConnect.query(sql);
            return new Promise<HttpResult>((resolve:(value:HttpResult)=>void)=>{
                if(sqlResult.length>0&&sqlResult[0].password===params.password){
                    let resResult = Tool.FilterResult(["id","nickname","phone","face","sex","realname","email","gift_code","alipay","wxpay","referralCode","access_token"],sqlResult[0]);
                    resResult["accessToken"] = resResult["access_token"];
                    delete resResult["access_token"];
                    result = HttpResult.CreateResult(resResult,0,"登录成功!");
                }else{
                    result = HttpResult.CreateFailResult("账号或者密码不正确!");
                }
                resolve(result);
            })
        }catch(err){
            console.log(err);
            return new Promise<HttpResult>((reject:(value:any)=>void)=>{
                reject(err);
            })
        }
        
    }
}

export = LoginCtrl;

