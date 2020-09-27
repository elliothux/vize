"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const biz_modules_1 = require("./modules/biz/biz.modules");
const page_modules_1 = require("./modules/page/page.modules");
const history_modules_1 = require("./modules/history/history.modules");
const config_2 = require("../config");
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
            history_modules_1.HistoryModule,
            page_modules_1.PageModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyQ0FBd0M7QUFDeEMsNkNBQWdEO0FBQ2hELDJDQUE4QztBQUM5QywyREFBb0Q7QUFDcEQsOERBQXVEO0FBQ3ZELHVFQUFnRTtBQUNoRSxzQ0FBc0M7QUFFdEMsTUFBTSxNQUFNLEdBQUcsa0JBQVMsRUFBRSxDQUFDO0FBa0IzQixJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0NBQUcsQ0FBQTtBQUFaLFNBQVM7SUFoQnJCLGVBQU0sQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNQLHFCQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNuQixJQUFJLEVBQUUsQ0FBQyxrQkFBUyxDQUFDO2dCQUNqQixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUM7WUFDRix1QkFBYSxDQUFDLE9BQU8saUNBQ2hCLE1BQU0sQ0FBQyxFQUFFLEtBQ1osZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixXQUFXLEVBQUUsSUFBSSxJQUNqQjtZQUNGLHVCQUFTO1lBQ1QsK0JBQWE7WUFDYix5QkFBVTtTQUNYO0tBQ0YsQ0FBQztHQUNXLFNBQVMsQ0FBRztBQUFaLDhCQUFTIn0=