"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="./../../typings/index.d.ts"/>
const HttpResult = require("./../modules/HttpResult");
const MysqlConnect = require("./../modules/MysqlConnect");
const Tool = require("./../modules/Tool");
/**
 * @module MycountCtrl
 */
/**
 * 根据用户token获取用户信息
 * @param {any} params - 经过express parser转换的req.body,需要accessToken字段
 * @returns {HttpResult} 返回登录结果,异常时返回error异常对象
 */
function getUserByToken(params) {
    return __awaiter(this, void 0, Promise, function* () {
        let result;
        let sqlResult;
        let sql = "select * from user where id in (select user_id from user_token where access_token = '" + params.accessToken + "')";
        try {
            sqlResult = yield MysqlConnect.query(sql);
            return new Promise((resolve, reject) => {
                let filterResult = Tool.FilterResult(["id", "nickname", "phone", "face", "sex", "realname", "email", "gift_code", "alipay", "wxpay", "referralCode"], sqlResult[0]);
                filterResult["accessToken"] = params.accessToken;
                result = HttpResult.CreateResult(filterResult, 0, "查询成功!");
                resolve(result);
            });
        }
        catch (err) {
            return new Promise((resolve, reject) => {
                reject(err);
            });
        }
    });
}
exports.getUserByToken = getUserByToken;
//# sourceMappingURL=MycountCtrl.js.map