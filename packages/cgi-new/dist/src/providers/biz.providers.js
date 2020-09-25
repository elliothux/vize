"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bizProviders = void 0;
const biz_entity_1 = require("../entities/biz.entity");
const utils_1 = require("../utils");
exports.bizProviders = [
    {
        provide: utils_1.ProviderTypes.BizProvider,
        inject: [utils_1.ProviderTypes.DBConnection],
        useFactory: (connection) => connection.getRepository(biz_entity_1.BizEntity),
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LnByb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wcm92aWRlcnMvYml6LnByb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSx1REFBZ0Q7QUFDaEQsb0NBQXlDO0FBRTVCLFFBQUEsWUFBWSxHQUFHO0lBQzFCO1FBQ0UsT0FBTyxFQUFFLHFCQUFhLENBQUMsV0FBVztRQUNsQyxNQUFNLEVBQUUsQ0FBQyxxQkFBYSxDQUFDLFlBQVksQ0FBQztRQUNwQyxVQUFVLEVBQUUsQ0FBQyxVQUFzQixFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLHNCQUFTLENBQUM7S0FDNUU7Q0FDRixDQUFDIn0=