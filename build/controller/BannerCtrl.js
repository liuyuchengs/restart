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
/**
 * BannerCtrl
 */
class BannerCtrl {
    constructor() {
    }
    static queryBanner(type, host) {
        return __awaiter(this, void 0, Promise, function* () {
            let sql = "select path from tb_image_banner where type = '" + type + "'";
            try {
                let sqlResult = yield MysqlConnect.query(sql);
                return new Promise((resolve, reject) => {
                    if (sqlResult.length && sqlResult.length > 0) {
                        for (let index in sqlResult) {
                            sqlResult[index].path = host + sqlResult[index].path;
                        }
                    }
                    resolve(HttpResult.CreateSuccessResult(sqlResult));
                });
            }
            catch (err) {
                console.log(err);
                return new Promise((resolve, reject) => {
                    reject(err);
                });
            }
        });
    }
}
module.exports = BannerCtrl;
//# sourceMappingURL=BannerCtrl.js.map