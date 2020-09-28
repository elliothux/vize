"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BizEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let BizEntity = class BizEntity {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], BizEntity.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128 }),
    tslib_1.__metadata("design:type", String)
], BizEntity.prototype, "key", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 128 }),
    tslib_1.__metadata("design:type", String)
], BizEntity.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'varchar', length: 256 }),
    tslib_1.__metadata("design:type", String)
], BizEntity.prototype, "logo", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime' }),
    tslib_1.__metadata("design:type", Date)
], BizEntity.prototype, "createdTime", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ type: 'datetime', nullable: true }),
    tslib_1.__metadata("design:type", Date)
], BizEntity.prototype, "modifiedTime", void 0);
BizEntity = tslib_1.__decorate([
    typeorm_1.Entity()
], BizEntity);
exports.BizEntity = BizEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlzdG9yeS5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wYWdlL2hpc3RvcnkuZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxQ0FBaUU7QUFHakUsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztDQWtCckIsQ0FBQTtBQWhCQztJQURDLGdDQUFzQixFQUFFOztxQ0FDZDtBQUdYO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOztzQ0FDN0I7QUFHWjtJQURDLGdCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQzs7dUNBQzVCO0FBR2I7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7O3VDQUM1QjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztzQ0FDaEIsSUFBSTs4Q0FBQztBQUdsQjtJQURDLGdCQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDL0IsSUFBSTsrQ0FBQztBQWpCUixTQUFTO0lBRHJCLGdCQUFNLEVBQUU7R0FDSSxTQUFTLENBa0JyQjtBQWxCWSw4QkFBUyJ9