"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const page_service_1 = require("./page.service");
let PageController = class PageController {
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
    tslib_1.__metadata("design:returntype", String)
], PageController.prototype, "getHello", null);
PageController = tslib_1.__decorate([
    common_1.Controller('/cgi/page'),
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFnZS9wYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFpRDtBQUNqRCxpREFBNkM7QUFHN0MsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztJQUN6QixZQUE2QixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUFHLENBQUM7SUFHekQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0NBQ0YsQ0FBQTtBQUhDO0lBREMsWUFBRyxFQUFFOzs7OzhDQUdMO0FBTlUsY0FBYztJQUQxQixtQkFBVSxDQUFDLFdBQVcsQ0FBQzs2Q0FFb0IsMEJBQVc7R0FEMUMsY0FBYyxDQU8xQjtBQVBZLHdDQUFjIn0=