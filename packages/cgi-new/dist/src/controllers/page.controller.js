"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const page_service_1 = require("../services/page.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXJzL3BhZ2UuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMkNBQWlEO0FBQ2pELDJEQUFvRDtBQUdwRCxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBQ3pCLFlBQTZCLFdBQXdCO1FBQXhCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztJQUd6RCxRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3JDLENBQUM7Q0FDRixDQUFBO0FBSEM7SUFEQyxZQUFHLEVBQUU7Ozs7OENBR0w7QUFOVSxjQUFjO0lBRDFCLG1CQUFVLENBQUMsV0FBVyxDQUFDOzZDQUVvQiwwQkFBVztHQUQxQyxjQUFjLENBTzFCO0FBUFksd0NBQWMifQ==