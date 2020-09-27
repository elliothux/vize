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
            key: '2222',
            author: 'xunzhi',
            layoutMode: 'stream',
            pageMode: 'multi',
            biz: 1,
            status: 1,
        };
        if (await this.pageService.checkPageExists(page.key)) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.PageExists);
        }
        console.log(await this.pageService.createPageEntity(page));
        return utils_1.CGIResponse.success();
    }
    async getPages(query = { page: 0, pageSize: 20 }) {
        const pages = await this.pageService.queryPageEntity(query);
        return utils_1.CGIResponse.success(pages);
    }
    async getPageById(id) {
        if (!id) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.PageNotExists);
        }
        const page = await this.pageService.getPageById(id);
        if (!page) {
            return utils_1.CGIResponse.success(page, 'the page id is not found!');
        }
        return utils_1.CGIResponse.success(page);
    }
    async updatePageInfo(id, updatePageDto) {
        const res = await this.pageService.updatePage(id, updatePageDto);
        if (!res) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.PageUpdateFailed, 'the page update failed!');
        }
        return utils_1.CGIResponse.success();
    }
    async deletePage(id) {
        const res = await this.pageService.deletePage(id);
        if (!res) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.PageUpdateFailed, 'the page update failed!');
        }
        return utils_1.CGIResponse.success();
    }
};
tslib_1.__decorate([
    common_1.Post(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "createPage", null);
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__param(0, common_1.Query()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "getPages", null);
tslib_1.__decorate([
    common_1.Get(':id'),
    tslib_1.__param(0, common_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "getPageById", null);
tslib_1.__decorate([
    common_1.Put(':id'),
    tslib_1.__param(0, common_1.Param('id')),
    tslib_1.__param(1, common_1.Body()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "updatePageInfo", null);
tslib_1.__decorate([
    common_1.Delete(':id'),
    tslib_1.__param(0, common_1.Param('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PageController.prototype, "deletePage", null);
PageController = tslib_1.__decorate([
    common_1.Controller('/cgi/page'),
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFnZS9wYWdlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQVN3QjtBQUN4QixpREFBNkM7QUFFN0MsdUNBQXNEO0FBR3RELElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWM7SUFDekIsWUFBNkIsV0FBd0I7UUFBeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7SUFBRyxDQUFDO0lBR3pELEtBQUssQ0FBQyxVQUFVO1FBQ2QsTUFBTSxJQUFJLEdBQXFCO1lBQzdCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsTUFBTSxFQUFFLFFBQVE7WUFDaEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsUUFBUSxFQUFFLE9BQU87WUFDakIsR0FBRyxFQUFFLENBQUM7WUFDTixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUM7UUFFRixJQUFJLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BELE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFHRCxLQUFLLENBQUMsUUFBUSxDQUFVLFFBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1FBQ3BFLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsT0FBTyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBYyxFQUFVO1FBQ3ZDLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDUCxPQUFPLG1CQUFXLENBQUMsTUFBTSxDQUFDLGtCQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDckQ7UUFFRCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLG1CQUFXLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1NBQy9EO1FBQ0QsT0FBTyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FDTCxFQUFVLEVBQ2YsYUFBNEI7UUFFcEMsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNSLE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQ3ZCLGtCQUFVLENBQUMsZ0JBQWdCLEVBQzNCLHlCQUF5QixDQUMxQixDQUFDO1NBQ0g7UUFDRCxPQUFPLG1CQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUdELEtBQUssQ0FBQyxVQUFVLENBQWMsRUFBRTtRQUM5QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLG1CQUFXLENBQUMsTUFBTSxDQUN2QixrQkFBVSxDQUFDLGdCQUFnQixFQUMzQix5QkFBeUIsQ0FDMUIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBOURDO0lBREMsYUFBSSxFQUFFOzs7O2dEQWlCTjtBQUdEO0lBREMsWUFBRyxFQUFFO0lBQ1UsbUJBQUEsY0FBSyxFQUFFLENBQUE7Ozs7OENBR3RCO0FBRUQ7SUFEQyxZQUFHLENBQUMsS0FBSyxDQUFDO0lBQ1EsbUJBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7O2lEQVU3QjtBQUVEO0lBREMsWUFBRyxDQUFDLEtBQUssQ0FBQztJQUVSLG1CQUFBLGNBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNYLG1CQUFBLGFBQUksRUFBRSxDQUFBOzs7O29EQVVSO0FBR0Q7SUFEQyxlQUFNLENBQUMsS0FBSyxDQUFDO0lBQ0ksbUJBQUEsY0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBOzs7O2dEQVU1QjtBQWpFVSxjQUFjO0lBRDFCLG1CQUFVLENBQUMsV0FBVyxDQUFDOzZDQUVvQiwwQkFBVztHQUQxQyxjQUFjLENBa0UxQjtBQWxFWSx3Q0FBYyJ9