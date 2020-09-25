"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const biz_service_1 = require("./biz.service");
const page_service_1 = require("../page/page.service");
let BizController = class BizController {
    constructor(pageService, bizService) {
        this.pageService = pageService;
        this.bizService = bizService;
    }
    getHello() {
        console.log(this.pageService, this.bizService);
        return '1';
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Object)
], BizController.prototype, "getHello", null);
BizController = tslib_1.__decorate([
    common_1.Controller('/cgi/biz'),
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService,
        biz_service_1.BizService])
], BizController);
exports.BizController = BizController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iaXovYml6LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFpRDtBQUNqRCwrQ0FBMkM7QUFDM0MsdURBQW1EO0FBR25ELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFDeEIsWUFDbUIsV0FBd0IsRUFDeEIsVUFBc0I7UUFEdEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUN0QyxDQUFDO0lBR0osUUFBUTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDL0MsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQTtBQUpDO0lBREMsWUFBRyxFQUFFOzs7OzZDQUlMO0FBVlUsYUFBYTtJQUR6QixtQkFBVSxDQUFDLFVBQVUsQ0FBQzs2Q0FHVywwQkFBVztRQUNaLHdCQUFVO0dBSDlCLGFBQWEsQ0FXekI7QUFYWSxzQ0FBYSJ9