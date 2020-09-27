"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGICodeMap = exports.CGIResponse = void 0;
const types_1 = require("../types");
class CGIResponse {
    static success(data) {
        return {
            t: Date.now(),
            status: 'success',
            data,
        };
    }
    static failed(code, reason) {
        return {
            t: Date.now(),
            status: 'failed',
            error: {
                code,
                reason: reason || CGIReasonMap[code] || `ErrorCode: ${code}`,
            },
        };
    }
}
exports.CGIResponse = CGIResponse;
var CGICodeMap;
(function (CGICodeMap) {
    CGICodeMap[CGICodeMap["BizExists"] = 0] = "BizExists";
    CGICodeMap[CGICodeMap["PageExists"] = 1] = "PageExists";
})(CGICodeMap = exports.CGICodeMap || (exports.CGICodeMap = {}));
const CGIReasonMap = {
    [CGICodeMap.BizExists]: 'biz exists',
    [CGICodeMap.PageExists]: 'page exists',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQWlDO0FBRWpDLE1BQWEsV0FBVztJQUN0QixNQUFNLENBQUMsT0FBTyxDQUFVLElBQVE7UUFDOUIsT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxFQUFFLFNBQVM7WUFDakIsSUFBSTtTQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBVSxJQUFnQixFQUFFLE1BQWU7UUFDdEQsT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxFQUFFLFFBQVE7WUFDaEIsS0FBSyxFQUFFO2dCQUNMLElBQUk7Z0JBQ0osTUFBTSxFQUFFLE1BQU0sSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksY0FBYyxJQUFJLEVBQUU7YUFDN0Q7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbkJELGtDQW1CQztBQUVELElBQVksVUFHWDtBQUhELFdBQVksVUFBVTtJQUNwQixxREFBUyxDQUFBO0lBQ1QsdURBQVUsQ0FBQTtBQUNaLENBQUMsRUFIVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUdyQjtBQUVELE1BQU0sWUFBWSxHQUFvQztJQUNwRCxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRSxZQUFZO0lBQ3BDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLGFBQWE7Q0FDdkMsQ0FBQyJ9