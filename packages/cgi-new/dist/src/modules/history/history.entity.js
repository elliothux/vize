"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const page_entity_1 = require("../page/page.entity");
let HistoryEntity = class HistoryEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn({ unsigned: true }),
    tslib_1.__metadata("design:type", Number)
], HistoryEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(() => page_entity_1.PageEntity, page => page.id, { nullable: false }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", page_entity_1.PageEntity)
], HistoryEntity.prototype, "page", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: false }),
    tslib_1.__metadata("design:type", Date)
], HistoryEntity.prototype, "createdTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128, nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "author", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128, nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 256, nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "desc", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], HistoryEntity.prototype, "startTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], HistoryEntity.prototype, "endTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 256, nullable: true }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "expiredJump", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "globalProps", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "globalStyle", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'mediumtext', nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "pageInstances", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', nullable: true }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "pluginInstances", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'text', nullable: false }),
    tslib_1.__metadata("design:type", String)
], HistoryEntity.prototype, "editInfo", void 0);
HistoryEntity = tslib_1.__decorate([
    typeorm_1.Entity()
], HistoryEntity);
exports.HistoryEntity = HistoryEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9oaXN0b3J5L2hpc3RvcnkuZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxQ0FNaUI7QUFDakIscURBQWlEO0FBR2pELElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0ErQ3pCLENBQUE7QUE3Q0M7SUFEQyxnQ0FBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7eUNBQ2hDO0FBUVg7SUFOQyxtQkFBUyxDQUNSLEdBQUcsRUFBRSxDQUFDLHdCQUFVLEVBQ2hCLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFDZixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FDcEI7SUFDQSxvQkFBVSxFQUFFO3NDQUNQLHdCQUFVOzJDQUFDO0FBR2pCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3NDQUNqQyxJQUFJO2tEQUFDO0FBR2xCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzZDQUMzQztBQUdmO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzRDQUM1QztBQUdkO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzJDQUM3QztBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3NDQUNsQyxJQUFJO2dEQUFDO0FBR2hCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO3NDQUNwQyxJQUFJOzhDQUFDO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7a0RBQ3JDO0FBR3BCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOztrREFDdEI7QUFHcEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7O2tEQUN0QjtBQUdwQjtJQURDLGdCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7b0RBQzFCO0FBR3RCO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztzREFDakI7QUFHeEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OytDQUN6QjtBQTlDTixhQUFhO0lBRHpCLGdCQUFNLEVBQUU7R0FDSSxhQUFhLENBK0N6QjtBQS9DWSxzQ0FBYSJ9