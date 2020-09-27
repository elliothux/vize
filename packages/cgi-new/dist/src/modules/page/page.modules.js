"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const page_service_1 = require("./page.service");
const page_controller_1 = require("./page.controller");
const page_entity_1 = require("./page.entity");
let PageModule = class PageModule {
};
PageModule = tslib_1.__decorate([
    common_1.Global(),
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([page_entity_1.PageEntity])],
        providers: [page_service_1.PageService],
        controllers: [page_controller_1.PageController],
        exports: [page_service_1.PageService],
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5tb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFnZS9wYWdlLm1vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFnRDtBQUNoRCw2Q0FBZ0Q7QUFDaEQsaURBQTZDO0FBQzdDLHVEQUFtRDtBQUNuRCwrQ0FBMkM7QUFTM0MsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtDQUFHLENBQUE7QUFBYixVQUFVO0lBUHRCLGVBQU0sRUFBRTtJQUNSLGVBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsd0JBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakQsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztRQUN4QixXQUFXLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1FBQzdCLE9BQU8sRUFBRSxDQUFDLDBCQUFXLENBQUM7S0FDdkIsQ0FBQztHQUNXLFVBQVUsQ0FBRztBQUFiLGdDQUFVIn0=