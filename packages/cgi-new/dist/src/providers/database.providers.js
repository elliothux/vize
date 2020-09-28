"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const utils_1 = require("../utils");
exports.databaseProviders = [
    {
        provide: utils_1.ProviderTypes.DBConnection,
        useFactory: async () => await typeorm_1.createConnection({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: '2333',
            database: 'vize',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UucHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy9kYXRhYmFzZS5wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQTJDO0FBQzNDLG9DQUFzQztBQUV6QixRQUFBLGlCQUFpQixHQUFHO0lBQy9CO1FBQ0UsT0FBTyxFQUFFLHFCQUFhLENBQUMsWUFBWTtRQUNuQyxVQUFVLEVBQUUsS0FBSyxJQUFJLEVBQUUsQ0FDckIsTUFBTSwwQkFBZ0IsQ0FBQztZQUNyQixJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLENBQUMsU0FBUyxHQUFHLDBCQUEwQixDQUFDO1lBQ2xELFdBQVcsRUFBRSxJQUFJO1NBQ2xCLENBQUM7S0FDTDtDQUNGLENBQUMifQ==