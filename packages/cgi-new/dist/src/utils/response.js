"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CGIResponse = void 0;
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
                reason,
            },
        };
    }
}
exports.CGIResponse = CGIResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0NBQWlDO0FBRWpDLE1BQWEsV0FBVztJQUN0QixNQUFNLENBQUMsT0FBTyxDQUFVLElBQVE7UUFDOUIsT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2IsTUFBTSxFQUFFLFNBQVM7WUFDakIsSUFBSTtTQUNMLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBVSxJQUFZLEVBQUUsTUFBYztRQUNqRCxPQUFPO1lBQ0wsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDYixNQUFNLEVBQUUsUUFBUTtZQUNoQixLQUFLLEVBQUU7Z0JBQ0wsSUFBSTtnQkFDSixNQUFNO2FBQ1A7U0FDRixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBbkJELGtDQW1CQyJ9