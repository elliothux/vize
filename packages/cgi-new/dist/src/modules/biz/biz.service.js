"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const biz_entity_1 = require("./biz.entity");
let BizService = class BizService {
    constructor(bizRepository) {
        this.bizRepository = bizRepository;
    }
    async findAll() {
        return this.bizRepository.find();
    }
};
BizService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(biz_entity_1.BizEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], BizService);
exports.BizService = BizService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iaXovYml6LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUE0QztBQUM1Qyw2Q0FBbUQ7QUFDbkQscUNBQXFDO0FBQ3JDLDZDQUF5QztBQUd6QyxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCLFlBRW1CLGFBQW9DO1FBQXBDLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtJQUNwRCxDQUFDO0lBRUosS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFUWSxVQUFVO0lBRHRCLG1CQUFVLEVBQUU7SUFHUixtQkFBQSwwQkFBZ0IsQ0FBQyxzQkFBUyxDQUFDLENBQUE7NkNBQ0ksb0JBQVU7R0FIakMsVUFBVSxDQVN0QjtBQVRZLGdDQUFVIn0=