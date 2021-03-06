/// <reference path="./../../typings/index.d.ts" />
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express = require("express");
const proxyRequest = require("./../modules/proxyRequest");
const router = express.Router();
const url = "https://www.uokang.com";
router.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let result = yield proxyRequest(req, url);
    res.send(result);
}));
module.exports = router;
//# sourceMappingURL=proxyRoute.js.map