"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const page_service_1 = require("./page.service");
const utils_1 = require("../../utils");
let PageController = class PageController {
    constructor(pageService) {
        this.pageService = pageService;
    }
    async createPage() {
        const page = {
            key: 'test2',
            author: 'qy',
            layoutMode: 'stream',
            pageMode: 'multi',
            biz: 3,
        };
        if (await this.pageService.checkPageExists(page.key)) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.BizExists);
        }
        console.log(await this.pageService.createPageEntity(page));
        return utils_1.CGIResponse.success();
    }
};
tslib_1.__decorate([
    common_1.Post(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "createPage", null);
PageController = tslib_1.__decorate([
    common_1.Controller('/cgi/page'),
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFnZS9wYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFrRDtBQUNsRCxpREFBNkM7QUFFN0MsdUNBQXNEO0FBR3RELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFBNkIsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBR3pELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxJQUFJLEdBQXFCO1lBQzdCLEdBQUcsRUFBRSxPQUFPO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixVQUFVLEVBQUUsUUFBUTtZQUNwQixRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUsQ0FBQztTQUNQLENBQUM7UUFFRixJQUFJLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BELE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBaEJDO0lBREMsYUFBSSxFQUFFOzs7O2dEQWdCTjtBQW5CVSxjQUFjO0lBRDFCLG1CQUFVLENBQUMsV0FBVyxDQUFDOzZDQUVvQiwwQkFBVztHQUQxQyxjQUFjLENBb0IxQjtBQXBCWSx3Q0FBYyJ9