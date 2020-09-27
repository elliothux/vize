"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageEntity = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const biz_entity_1 = require("../biz/biz.entity");
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
    typeorm_1.ManyToOne(() => biz_entity_1.BizEntity, biz => biz.id, { nullable: false }),
    typeorm_1.JoinColumn(),
    tslib_1.__metadata("design:type", biz_entity_1.BizEntity)
], PageEntity.prototype, "biz", void 0);
PageEntity = tslib_1.__decorate([
    typeorm_1.Entity()
], PageEntity);
exports.PageEntity = PageEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS5lbnRpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9wYWdlL3BhZ2UuZW50aXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxQ0FNaUI7QUFDakIsa0RBQW1EO0FBR25ELElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7Q0E2QnRCLENBQUE7QUEzQkM7SUFEQyxnQ0FBc0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7c0NBQ2hDO0FBR1g7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7dUNBQzlDO0FBR1o7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7c0NBQ2pDLElBQUk7K0NBQUM7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7MENBQzNDO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7OENBQ3RDO0FBR25CO0lBREMsZ0JBQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUM7OzRDQUN4QztBQVFqQjtJQU5DLG1CQUFTLENBQ1IsR0FBRyxFQUFFLENBQUMsc0JBQVMsRUFDZixHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQ2IsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQ3BCO0lBQ0Esb0JBQVUsRUFBRTtzQ0FDUixzQkFBUzt1Q0FBQztBQXpCSixVQUFVO0lBRHRCLGdCQUFNLEVBQUU7R0FDSSxVQUFVLENBNkJ0QjtBQTdCWSxnQ0FBVSJ9