"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGICodeMap = exports.CGIResponse = void 0;
const types_1 = require("../types");
class CGIResponse {
    static success(data, msg) {
        return {
            t: Date.now(),
            status: 'success',
            message: msg,
            data,
            code: 400000,
        };
    }
    static failed(code, reason) {
        return {
            t: Date.now(),
            status: 'failed',
            message: reason || CGIReasonMap[code] || `ErrorCode: ${code}`,
            code,
        };
    }
}
exports.CGIResponse = CGIResponse;
var CGICodeMap;
(function (CGICodeMap) {
    CGICodeMap[CGICodeMap["BizExists"] = 400001] = "BizExists";
    CGICodeMap[CGICodeMap["PageExists"] = 400002] = "PageExists";
    CGICodeMap[CGICodeMap["PageNotExists"] = 400003] = "PageNotExists";
    CGICodeMap[CGICodeMap["PageUpdateFailed"] = 400004] = "PageUpdateFailed";
})(CGICodeMap = exports.CGICodeMap || (exports.CGICodeMap = {}));
const CGIReasonMap = {
    [CGICodeMap.BizExists]: 'biz exists',
    [CGICodeMap.PageExists]: 'page exists',
    [CGICodeMap.PageNotExists]: 'page not exists',
    [CGICodeMap.PageUpdateFailed]: '',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQWlDO0FBRWpDLE1BQWEsV0FBVztJQUN0QixNQUFNLENBQUMsT0FBTyxDQUFVLElBQVEsRUFBRSxHQUFZO1FBQzVDLE9BQU87WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNiLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRSxHQUFHO1lBQ1osSUFBSTtZQUNKLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBTSxDQUFVLElBQWdCLEVBQUUsTUFBZTtRQUN0RCxPQUFPO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLEVBQUUsUUFBUTtZQUNoQixPQUFPLEVBQUUsTUFBTSxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxjQUFjLElBQUksRUFBRTtZQUM3RCxJQUFJO1NBQ0wsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQW5CRCxrQ0FtQkM7QUFFRCxJQUFZLFVBS1g7QUFMRCxXQUFZLFVBQVU7SUFDcEIsMERBQWtCLENBQUE7SUFDbEIsNERBQW1CLENBQUE7SUFDbkIsa0VBQXNCLENBQUE7SUFDdEIsd0VBQXlCLENBQUE7QUFDM0IsQ0FBQyxFQUxXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBS3JCO0FBRUQsTUFBTSxZQUFZLEdBQW9DO0lBQ3BELENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQVk7SUFDcEMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsYUFBYTtJQUN0QyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxpQkFBaUI7SUFDN0MsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFO0NBQ2xDLENBQUMifQ==