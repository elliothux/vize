"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const history_service_1 = require("./history.service");
const history_controller_1 = require("./history.controller");
const history_entity_1 = require("./history.entity");
let HistoryModule = class HistoryModule {
};
HistoryModule = tslib_1.__decorate([
    common_1.Global(),
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([history_entity_1.HistoryEntity])],
        providers: [history_service_1.HistoryService],
        controllers: [history_controller_1.HistoryController],
        exports: [history_service_1.HistoryService],
    })
], HistoryModule);
exports.HistoryModule = HistoryModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5tb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaGlzdG9yeS9oaXN0b3J5Lm1vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFnRDtBQUNoRCw2Q0FBZ0Q7QUFDaEQsdURBQW1EO0FBQ25ELDZEQUF5RDtBQUN6RCxxREFBaUQ7QUFTakQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtDQUFHLENBQUE7QUFBaEIsYUFBYTtJQVB6QixlQUFNLEVBQUU7SUFDUixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx1QkFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLDhCQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLGdDQUFjLENBQUM7UUFDM0IsV0FBVyxFQUFFLENBQUMsc0NBQWlCLENBQUM7UUFDaEMsT0FBTyxFQUFFLENBQUMsZ0NBQWMsQ0FBQztLQUMxQixDQUFDO0dBQ1csYUFBYSxDQUFHO0FBQWhCLHNDQUFhIn0=