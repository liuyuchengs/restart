"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// system module
const Koa = require("koa");
const koaRouter = require("koa-router");
const koaStatic = require("koa-static");
const parser = require("koa-bodyparser");
// router module
const proxy = require('./modules/base/proxy');
const app = new Koa();
const router = new koaRouter();
// global middlewares
app.use(parser());
app.use(function (ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var start = new Date();
        yield next();
        var ms = (new Date().valueOf() - start.valueOf());
        console.log(`%s $s - $s`, ctx.method, ctx.url, ms);
    });
});
app.use(koaStatic(__dirname + '/public'));
// mount root routes
router.post("/wx/product/queryrecommend", proxy.request);
router.post("/wx/banner/query", proxy.request);
router.post("/weixin/check/getjsconfig", proxy.request);
router.post("/wx/login/wxlogin", proxy.request);
router.post("/wx/focus/focusManCount", proxy.request);
router.post("/wx/order/queryOrderList", proxy.request);
router.post("/wx/order/orderCacel", proxy.request);
router.post("/wx/order/findAllVouchers", proxy.request);
router.post("/wx/order/activate", proxy.request);
router.post("/wx/order/overdue", proxy.request);
router.post("/wx/order/make", proxy.request);
router.post("/wx/order/querypostrGiftCode", proxy.request);
router.post("/wx/findpass/findPassPhontCheck", proxy.request);
router.post("/wx/findpass/sendsmsfindpasscode", proxy.request);
router.post("/wx/findpass/changepwd", proxy.request);
router.post("/wx/register/registercheck", proxy.request);
router.post("/wx/register/sendsmsregistercode", proxy.request);
router.post("/wx/register/register", proxy.request);
router.post("/wx/health/queryByType", proxy.request);
router.post("/wx/health/querydetail", proxy.request);
router.post("/wx/order/queryByGift", proxy.request);
router.post("/wx/order/queryGift", proxy.request);
router.post("/wx/gift/querydate", proxy.request);
router.post("/wx/gift/queryproduct", proxy.request);
router.post("/wx/order/checkCode", proxy.request);
router.post("/wx/gift/getgiftproduct", proxy.request);
router.post("/wx/product/querylist", proxy.request);
router.post("/wx/image/querybymainid", proxy.request);
router.post("/wx/hospital/querybyid", proxy.request);
router.post("/wx/doctor/queryscheduledoctorbyproductid", proxy.request);
router.post("/wx/schedule/querybydoctorid", proxy.request);
router.post("/wx/order/checkCodeMoney", proxy.request);
router.post("/wx/post/focus", proxy.request);
router.post("/wx/post/cacelFocus", proxy.request);
router.post("/wx/product/querybyid", proxy.request);
router.post("/wx/doctor/querydoctorbycityandprofession", proxy.request);
router.post("/wx/doctor/queryDoctorDetailInfo", proxy.request);
router.post("/wx/order/querybydoctorid", proxy.request);
router.post("/wx/post/focus", proxy.request);
router.post("/wx/post/cacelFocus", proxy.request);
router.post("/wx/review/showdoctorreview", proxy.request);
router.post("/wx/post/postList", proxy.request);
router.post("/wx/post/postDetail", proxy.request);
router.post("/wx/post/postMessage", proxy.request);
router.post("/wx/post/thumbUp", proxy.request);
router.post("/wx/repliesMessage/addRepliesMessage", proxy.request);
router.post("/wx/post/myPost", proxy.request);
router.post("/wx/repliesMessage/myReply", proxy.request);
router.post("/wx/repliesMessage/myMessage", proxy.request);
router.post("/wx/post/doctorMessage", proxy.request);
router.post("/wx/focus/focuspostrMan", proxy.request);
router.post("/wx/focus/focusDoctorMan", proxy.request);
router.post("/wx/focus/focusProductMan", proxy.request);
router.post("/wx/product/packagedetal", proxy.request);
router.post("/wx/product/hospitalbyid", proxy.request);
router.post("/wx/product/packagedetalItem", proxy.request);
router.post("/wx/schedule/querybyhospitalid", proxy.request);
router.post("/wx/hospital/querylist", proxy.request);
router.post("/wx/product/queryActivity", proxy.request);
router.post("/wx/postr/createReferralCode", proxy.request);
router.post("/wx/share/queryById", proxy.request);
router.post("/wx/withDraw/bound", proxy.request);
router.post("/wx/withDraw/myBound", proxy.request);
router.post("/wx/post/deletePost", proxy.request);
router.post("/wx/repliesMessage/deleteReplies", proxy.request);
router.post("/wx/mycount/getpostrBWyToken", proxy.request);
router.post("/wx/withdraw/myMoney", proxy.request);
router.post("/wx/withDraw/apply", proxy.request);
//配置中转路由->图片上传
/*
router.use("/wx/mycount/updateUserInfo",proxyUserRoute);
router.use("/wx/post/addPost",proxyPostRoute);*/
app.use(router.routes());
app.use(router.allowedMethods());
app.on('error', function (err, ctx) {
    console.log(err);
});
module.exports = app;
//# sourceMappingURL=proxyApp.js.map