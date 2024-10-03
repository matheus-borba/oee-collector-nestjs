import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Production } from './production.entity';

export class ProductionDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  productionTime: number;

  @IsNumber()
  itemsProduced: number;

  @IsNumber()
  defectiveItems: number;

  @IsNumber()
  productionDate: number;

  @IsString()
  shift: string;

  @IsNumber()
  machineId: number;

  @IsOptional()
  @IsNumber()
  oeePercentage?: number;

  toEntity(): Production {
    const production = new Production();
    production.id = this.id;
    production.productionTime = this.productionTime;
    production.itemsProduced = this.itemsProduced;
    production.defectiveItems = this.defectiveItems;
    production.productionDate = this.productionDate;
    production.shift = this.shift;
    production.oeePercentage = this.oeePercentage;
    return production;
  }

  static fromEntity(entity: Production): ProductionDTO {
    const dto = new ProductionDTO();
    dto.id = entity.id;
    dto.productionTime = entity.productionTime;
    dto.itemsProduced = entity.itemsProduced;
    dto.defectiveItems = entity.defectiveItems;
    dto.productionDate = entity.productionDate;
    dto.shift = entity.shift;
    dto.machineId = entity.machine.id;
    dto.oeePercentage = entity.oeePercentage;
    return dto;
  }

  static fromJson(json: any): ProductionDTO {
    const dto = new ProductionDTO();
    dto.id = json.id;
    dto.productionTime = json.productionTime;
    dto.itemsProduced = json.itemsProduced;
    dto.defectiveItems = json.defectiveItems;
    dto.productionDate = json.productionDate;
    dto.shift = json.shift;
    dto.machineId = json.machineId;
    dto.oeePercentage = json.oeePercentage;
    return dto;
  }
}
