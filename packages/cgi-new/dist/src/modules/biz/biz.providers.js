"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bizProviders = void 0;
const biz_entity_1 = require("./biz.entity");
const utils_1 = require("../../utils");
exports.bizProviders = [
    {
        provide: utils_1.ProviderTypes.BizProvider,
        inject: [utils_1.ProviderTypes.DBConnection],
        useFactory: (connection) => connection.getRepository(biz_entity_1.BizEntity),
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jpei9iaXoucHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQUF5QztBQUN6Qyx1Q0FBc0M7QUFFekIsUUFBQSxZQUFZLEdBQUc7SUFDMUI7UUFDRSxPQUFPLEVBQUUscUJBQWEsQ0FBQyxXQUFXO1FBQ2xDLE1BQU0sRUFBRSxDQUFDLHFCQUFhLENBQUMsWUFBWSxDQUFDO1FBQ3BDLFVBQVUsRUFBRSxDQUFDLFVBQXNCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsc0JBQVMsQ0FBQztLQUM1RTtDQUNGLENBQUMifQ==