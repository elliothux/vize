"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const page_service_1 = require("../services/page.service");
let BizController = class BizController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    getHello() {
        return this.pageService.getHello();
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
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService])
], BizController);
exports.BizController = BizController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlcnMvYml6LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFpRDtBQUVqRCwyREFBdUQ7QUFHdkQsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUN4QixZQUVtQixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUN4QyxDQUFDO0lBR0osUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsWUFBRyxFQUFFOzs7OzZDQUdMO0FBVFUsYUFBYTtJQUR6QixtQkFBVSxDQUFDLFVBQVUsQ0FBQzs2Q0FJVywwQkFBVztHQUhoQyxhQUFhLENBVXpCO0FBVlksc0NBQWEifQ==