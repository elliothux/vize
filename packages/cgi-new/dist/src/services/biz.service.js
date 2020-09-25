"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
const biz_entity_1 = require("../entities/biz.entity");
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
    tslib_1.__param(0, common_1.Inject(utils_1.ProviderTypes.BizProvider)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], BizService);
exports.BizService = BizService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYml6LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFvRDtBQUNwRCxxQ0FBcUM7QUFDckMsb0NBQXNDO0FBQ3RDLHVEQUFnRDtBQUdoRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCLFlBRW1CLGFBQW9DO1FBQXBDLGtCQUFhLEdBQWIsYUFBYSxDQUF1QjtJQUNwRCxDQUFDO0lBRUosS0FBSyxDQUFDLE9BQU87UUFDWCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUFUWSxVQUFVO0lBRHRCLG1CQUFVLEVBQUU7SUFHUixtQkFBQSxlQUFNLENBQUMscUJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTs2Q0FDRixvQkFBVTtHQUhqQyxVQUFVLENBU3RCO0FBVFksZ0NBQVUifQ==