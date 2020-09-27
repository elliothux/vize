"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const page_service_1 = require("./page.service");
const page_controller_1 = require("./page.controller");
let PageModule = class PageModule {
};
PageModule = tslib_1.__decorate([
    common_1.Global(),
    common_1.Module({
        providers: [page_service_1.PageService],
        controllers: [page_controller_1.PageController],
        exports: [page_service_1.PageService],
    })
], PageModule);
exports.PageModule = PageModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5tb2R1bGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaGlzdG9yeS9wYWdlLm1vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFnRDtBQUVoRCxpREFBNkM7QUFDN0MsdURBQW1EO0FBU25ELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0FBRyxDQUFBO0FBQWIsVUFBVTtJQVB0QixlQUFNLEVBQUU7SUFDUixlQUFNLENBQUM7UUFFTixTQUFTLEVBQUUsQ0FBQywwQkFBVyxDQUFDO1FBQ3hCLFdBQVcsRUFBRSxDQUFDLGdDQUFjLENBQUM7UUFDN0IsT0FBTyxFQUFFLENBQUMsMEJBQVcsQ0FBQztLQUN2QixDQUFDO0dBQ1csVUFBVSxDQUFHO0FBQWIsZ0NBQVUifQ==