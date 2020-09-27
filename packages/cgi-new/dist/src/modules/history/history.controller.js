"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const history_service_1 = require("./history.service");
let HistoryController = class HistoryController {
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
], HistoryController.prototype, "getHello", null);
HistoryController = tslib_1.__decorate([
    common_1.Controller('/cgi/history'),
    tslib_1.__metadata("design:paramtypes", [history_service_1.HistoryService])
], HistoryController);
exports.HistoryController = HistoryController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvaGlzdG9yeS9oaXN0b3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFpRDtBQUNqRCx1REFBbUQ7QUFHbkQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFDNUIsWUFBNkIsV0FBMkI7UUFBM0IsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUcsQ0FBQztJQUc1RCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxZQUFHLEVBQUU7Ozs7aURBR0w7QUFOVSxpQkFBaUI7SUFEN0IsbUJBQVUsQ0FBQyxjQUFjLENBQUM7NkNBRWlCLGdDQUFjO0dBRDdDLGlCQUFpQixDQU83QjtBQVBZLDhDQUFpQiJ9