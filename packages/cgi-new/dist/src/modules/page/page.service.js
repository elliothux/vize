"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const page_entity_1 = require("./page.entity");
let PageService = class PageService {
    constructor(pageRepository) {
        this.pageRepository = pageRepository;
    }
    createPageEntity({ key, author, layoutMode, pageMode, biz, }) {
        return this.pageRepository.insert({
            key,
            createdTime: new Date(),
            author,
            layoutMode,
            pageMode,
            biz: { id: biz },
        });
    }
    queryPageEntity({ page = 0, pageSize = 20 }) {
        return this.pageRepository.find({
            take: pageSize,
            skip: page * pageSize,
        });
    }
    getPageById(id) {
        return this.pageRepository.findOne(id);
    }
    updatePage(id, updatePageDto) {
        return this.pageRepository.update(id, updatePageDto);
    }
    deletePage(id) {
        return this.pageRepository.update(id, { status: -1 });
    }
    async checkPageExists(key) {
        const count = await this.pageRepository.count({ key });
        return count > 0;
    }
};
PageService = tslib_1.__decorate([
    common_1.Injectable(),
    tslib_1.__param(0, typeorm_2.InjectRepository(page_entity_1.PageEntity)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository])
], PageService);
exports.PageService = PageService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcGFnZS9wYWdlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsNkNBQW1EO0FBQ25ELCtDQUEyQztBQUkzQyxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFXO0lBQ3RCLFlBRW1CLGNBQXNDO1FBQXRDLG1CQUFjLEdBQWQsY0FBYyxDQUF3QjtJQUN0RCxDQUFDO0lBRUcsZ0JBQWdCLENBQUMsRUFDdEIsR0FBRyxFQUNILE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLEdBQUcsR0FDYztRQUNqQixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO1lBQ2hDLEdBQUc7WUFDSCxXQUFXLEVBQUUsSUFBSSxJQUFJLEVBQUU7WUFDdkIsTUFBTTtZQUNOLFVBQVU7WUFDVixRQUFRO1lBQ1IsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTtTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sZUFBZSxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFlO1FBQzdELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7WUFDOUIsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsSUFBSSxHQUFHLFFBQVE7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLFdBQVcsQ0FBQyxFQUFVO1FBQzNCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLFVBQVUsQ0FBQyxFQUFVLEVBQUUsYUFBNEI7UUFDeEQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxFQUFVO1FBQzFCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRU0sS0FBSyxDQUFDLGVBQWUsQ0FBQyxHQUFXO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELE9BQU8sS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0NBQ0YsQ0FBQTtBQTlDWSxXQUFXO0lBRHZCLG1CQUFVLEVBQUU7SUFHUixtQkFBQSwwQkFBZ0IsQ0FBQyx3QkFBVSxDQUFDLENBQUE7NkNBQ0ksb0JBQVU7R0FIbEMsV0FBVyxDQThDdkI7QUE5Q1ksa0NBQVcifQ==