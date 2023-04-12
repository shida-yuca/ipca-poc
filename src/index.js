"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var axios_1 = require("axios");
var URL = 'https://api.getmati.com/v2/verifications/63ade26e088492001cefd428';
var INSTANCES_QTY = 1000;
var JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOnsiX2lkIjoiNjJkMTU4Mjk0N2I3ZDkwMDFkZDIwYzFhIiwibWVyY2hhbnQiOnsiX2lkIjoiNjJkMTU4MjkzYzMzMmMwMDFjODFjMGFmIiwib3duZXIiOiI2MmQxNTgyOWU4OWJlOTAwMWNiYjc0N2UiLCJzdWJzY3JpcHRpb25TdGF0dXMiOnsidmFsdWUiOiJhY3RpdmUiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTIyVDEzOjAwOjAwLjAwM1oifX19LCJ1c2VyIjp7Il9pZCI6IjYyZDE1ODI5ZTg5YmU5MDAxY2JiNzQ3ZSJ9LCJzY29wZSI6InZlcmlmaWNhdGlvbl9mbG93IGlkZW50aXR5OnJlYWQgdmVyaWZpY2F0aW9uOnJlYWQiLCJpYXQiOjE2NzI0MzUyODUsImV4cCI6MTY3MjQzODg4NSwiaXNzIjoib2F1dGgyLXNlcnZlciJ9.xALktwOBy9xI-E9MX603W4HPOm4QA38Tslea1PoMkho';
var createRequestInstances = function () {
    var instances = [];
    for (var i = 0; i < INSTANCES_QTY; i++) {
        instances.push(axios_1["default"].create());
    }
    return instances;
};
var test = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var instances, requestConfig, responses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                instances = createRequestInstances();
                requestConfig = {
                    url: url,
                    validateStatus: function (status) {
                        return true;
                    },
                    headers: {
                        'Authorization': "Bearer ".concat(JWT_TOKEN)
                    }
                };
                return [4 /*yield*/, Promise.all(instances.map(function (instance) { return instance.request(requestConfig); }))];
            case 1:
                responses = _a.sent();
                responses.forEach(function (res, idx) { return console.log("Index: ".concat(idx + 1, " - Status: ").concat(res.status)); });
                return [2 /*return*/];
        }
    });
}); };
test(URL);
