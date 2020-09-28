"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
const page_service_1 = require("../page/page.service");
const biz_service_1 = require("./biz.service");
let BizController = class BizController {
    constructor(pageService, bizService) {
        this.pageService = pageService;
        this.bizService = bizService;
    }
    async createBiz() {
        const biz = {
            key: 'test',
            name: '测试业务',
            logo: 'https://image.flaticon.com/icons/png/128/3428/3428693.png',
        };
        if (await this.bizService.checkBizExists(biz.key)) {
            return utils_1.CGIResponse.failed(utils_1.CGICodeMap.BizExists);
        }
        console.log(await this.bizService.createBizEntity(biz), this.pageService);
        return utils_1.CGIResponse.success();
    }
};
tslib_1.__decorate([
    common_1.Get(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], BizController.prototype, "createBiz", null);
BizController = tslib_1.__decorate([
    common_1.Controller('/cgi/biz'),
    tslib_1.__metadata("design:paramtypes", [page_service_1.PageService,
        biz_service_1.BizService])
], BizController);
exports.BizController = BizController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iaXovYml6LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFpRDtBQUNqRCx1Q0FBZ0Q7QUFDaEQsdURBQXdEO0FBQ3hELCtDQUEyQztBQUkzQyxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBQ3hCLFlBQ21CLFdBQXdCLEVBQ3hCLFVBQXNCO1FBRHRCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDdEMsQ0FBQztJQUdKLEtBQUssQ0FBQyxTQUFTO1FBQ2IsTUFBTSxHQUFHLEdBQW9CO1lBQzNCLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsMkRBQTJEO1NBQ2xFLENBQUM7UUFFRixJQUFJLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELE9BQU8sbUJBQVcsQ0FBQyxNQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUUsT0FBTyxtQkFBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQy9CLENBQUM7Q0FDRixDQUFBO0FBZEM7SUFEQyxZQUFHLEVBQUU7Ozs7OENBY0w7QUFwQlUsYUFBYTtJQUR6QixtQkFBVSxDQUFDLFVBQVUsQ0FBQzs2Q0FHVywwQkFBVztRQUNaLHdCQUFVO0dBSDlCLGFBQWEsQ0FxQnpCO0FBckJZLHNDQUFhIn0=