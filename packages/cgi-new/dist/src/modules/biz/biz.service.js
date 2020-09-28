"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const types_1 = require("../../types");
const biz_entity_1 = require("./biz.entity");
let BizService = class BizService {
    constructor(bizRepository) {
        this.bizRepository = bizRepository;
    }
    async getBizEntity(id) {
        return this.bizRepository.findOne(id);
    }
    async queryBizEntities({ startPage = 0, pageSize }) {
        return this.bizRepository.find({
            take: pageSize,
            skip: pageSize * startPage,
        });
    }
    async createBizEntity({ key, name, logo }) {
        return this.bizRepository.insert({
            key,
            name,
            logo,
            createdTime: new Date(),
        });
    }
    async checkBizExists(key) {
        const count = await this.bizRepository.count({ key });
        return count > 0;
    }
};
BizService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_1.InjectRepository(biz_entity_1.BizEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_2.Repository])
], BizService);
exports.BizService = BizService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYml6LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9iaXovYml6LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUE0QztBQUM1Qyw2Q0FBbUQ7QUFDbkQscUNBQXFDO0FBQ3JDLHVDQUFvQztBQUNwQyw2Q0FBeUM7QUFJekMsSUFBYSxVQUFVLEdBQXZCLE1BQWEsVUFBVTtJQUNyQixZQUVtQixhQUFvQztRQUFwQyxrQkFBYSxHQUFiLGFBQWEsQ0FBdUI7SUFDcEQsQ0FBQztJQUVHLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBVTtRQUNsQyxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFTSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFFBQVEsRUFBZTtRQUNwRSxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQzdCLElBQUksRUFBRSxRQUFRO1lBQ2QsSUFBSSxFQUFFLFFBQVEsR0FBRyxTQUFTO1NBQzNCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQW1CO1FBQy9ELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDL0IsR0FBRztZQUNILElBQUk7WUFDSixJQUFJO1lBQ0osV0FBVyxFQUFFLElBQUksSUFBSSxFQUFFO1NBQ3hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQVc7UUFDckMsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDdEQsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7Q0FDRixDQUFBO0FBOUJZLFVBQVU7SUFEdEIsbUJBQVUsRUFBRTtJQUdSLG1CQUFBLDBCQUFnQixDQUFDLHNCQUFTLENBQUMsQ0FBQTs2Q0FDSSxvQkFBVTtHQUhqQyxVQUFVLENBOEJ0QjtBQTlCWSxnQ0FBVSJ9