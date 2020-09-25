"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const biz_entity_1 = require("./biz.entity");
const biz_service_1 = require("./biz.service");
const biz_controller_1 = require("./biz.controller");
const page_modules_1 = require("../page/page.modules");
let BizModule = class BizModule {
};
BizModule = tslib_1.__decorate([
    common_1.Global(),
    common_1.Module({
        imports: [page_modules_1.PageModule, typeorm_1.TypeOrmModule.forFeature([biz_entity_1.BizEntity])],
        controllers: [biz_controller_1.BizController],
        providers: [page_modules_1.PageModule, biz_service_1.BizService],
        exports: [biz_service_1.BizService],
    })
], BizModule);
exports.BizModule = BizModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6Lm1vZHVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iaXovYml6Lm1vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFnRDtBQUNoRCw2Q0FBZ0Q7QUFDaEQsNkNBQXlDO0FBQ3pDLCtDQUEyQztBQUMzQyxxREFBaUQ7QUFDakQsdURBQWtEO0FBU2xELElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7Q0FBRyxDQUFBO0FBQVosU0FBUztJQVByQixlQUFNLEVBQUU7SUFDUixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyx5QkFBVSxFQUFFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsc0JBQVMsQ0FBQyxDQUFDLENBQUM7UUFDNUQsV0FBVyxFQUFFLENBQUMsOEJBQWEsQ0FBQztRQUM1QixTQUFTLEVBQUUsQ0FBQyx5QkFBVSxFQUFFLHdCQUFVLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUMsd0JBQVUsQ0FBQztLQUN0QixDQUFDO0dBQ1csU0FBUyxDQUFHO0FBQVosOEJBQVMifQ==