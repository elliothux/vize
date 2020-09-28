"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const biz_entity_1 = require("../biz/biz.entity");
const history_entity_1 = require("../history/history.entity");
let PageEntity = class PageEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn({ unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], PageEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128, nullable: false }),
    tslib_1.__metadata("design:type", String)
], PageEntity.prototype, "key", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: false }),
    tslib_1.__metadata("design:type", Date)
], PageEntity.prototype, "createdTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128, nullable: false }),
    tslib_1.__metadata("design:type", String)
], PageEntity.prototype, "author", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 16, nullable: false }),
    tslib_1.__metadata("design:type", String)
], PageEntity.prototype, "layoutMode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 16, nullable: false }),
    tslib_1.__metadata("design:type", String)
], PageEntity.prototype, "pageMode", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'tinyint', nullable: false, default: 1 }),
    tslib_1.__metadata("design:type", Number)
], PageEntity.prototype, "status", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => biz_entity_1.BizEntity, biz => biz.id, { nullable: false }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", biz_entity_1.BizEntity)
], PageEntity.prototype, "biz", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => history_entity_1.HistoryEntity, history => history.id, { nullable: true }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", history_entity_1.HistoryEntity)
], PageEntity.prototype, "latestHistory", void 0);
PageEntity = tslib_1.__decorate([
    typeorm_1.Entity()
], PageEntity);
exports.PageEntity = PageEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wYWdlL3BhZ2UuZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxQ0FNaUI7QUFDakIsa0RBQW1EO0FBQ25ELDhEQUEwRDtBQUcxRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0NBcUN0QixDQUFBO0FBbkNDO0lBREMsZ0NBQXNCLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NDQUNoQztBQUdYO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O3VDQUM5QztBQUdaO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUNqQyxJQUFJOytDQUFDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzBDQUMzQztBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzhDQUN0QztBQUduQjtJQURDLGdCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOzs0Q0FDeEM7QUFHakI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs7MENBQzFDO0FBUWY7SUFOQyxtQkFBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLHNCQUFTLEVBQ2YsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUNiLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUNwQjtJQUNBLG9CQUFVLEVBQUU7c0NBQ1Isc0JBQVM7dUNBQUM7QUFRZjtJQU5DLG1CQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsOEJBQWEsRUFDbkIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUNyQixFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FDbkI7SUFDQSxvQkFBVSxFQUFFO3NDQUNHLDhCQUFhO2lEQUFDO0FBcENuQixVQUFVO0lBRHRCLGdCQUFNLEVBQUU7R0FDSSxVQUFVLENBcUN0QjtBQXJDWSxnQ0FBVSJ9