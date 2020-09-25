"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const config_2 = require("../config");
const biz_modules_1 = require("./modules/biz/biz.modules");
const page_modules_1 = require("./modules/page/page.modules");
const config = config_2.getConfig();
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [config_2.getConfig],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({}, config.db), { autoLoadEntities: true, synchronize: true })),
            biz_modules_1.BizModule,
            page_modules_1.PageModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsNkNBQWdEO0FBQ2hELDJDQUE4QztBQUM5QyxzQ0FBc0M7QUFDdEMsMkRBQXNEO0FBQ3RELDhEQUF5RDtBQUV6RCxNQUFNLE1BQU0sR0FBRyxrQkFBUyxFQUFFLENBQUM7QUFpQjNCLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7Q0FBRyxDQUFBO0FBQVosU0FBUztJQWZyQixlQUFNLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDUCxxQkFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUMsa0JBQVMsQ0FBQztnQkFDakIsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDO1lBQ0YsdUJBQWEsQ0FBQyxPQUFPLGlDQUNoQixNQUFNLENBQUMsRUFBRSxLQUNaLGdCQUFnQixFQUFFLElBQUksRUFDdEIsV0FBVyxFQUFFLElBQUksSUFDakI7WUFDRix1QkFBUztZQUNULHlCQUFVO1NBQ1g7S0FDRixDQUFDO0dBQ1csU0FBUyxDQUFHO0FBQVosOEJBQVMifQ==