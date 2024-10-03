import { Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Machine } from '../model/machine.entity';

export class MachineDTO {
  @Expose({ name: 'id' })
  @IsNumber()
  id: number;

  @Expose({ name: 'name' })
  @IsString()
  name: string;

  @Expose({ name: 'type' })
  @IsString()
  type: string;

  @Expose({ name: 'productionCapacity' })
  @IsNumber()
  productionCapacity: number;

  @Expose({ name: 'plannedProductionTime' })
  @IsNumber()
  plannedProductionTime: number;

  @Expose({ name: 'location' })
  @IsString()
  @IsOptional()
  location: string;

  @Expose({ name: 'status' })
  @IsString()
  status: string;

  @Expose({ name: 'oeePercentage' })
  @IsNumber()
  @IsOptional()
  oeePercentage: number;

  toEntity(): Machine {
    const machine = new Machine();
    machine.id = this.id;
    machine.name = this.name;
    machine.type = this.type;
    machine.productionCapacity = this.productionCapacity;
    machine.plannedProductionTime = this.plannedProductionTime;
    machine.location = this.location;
    machine.status = this.status;
    machine.oeePercentage = this.oeePercentage;
    return machine;
  }

  static fromEntity(entity: Machine): MachineDTO {
    const dto = new MachineDTO();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.type = entity.type;
    dto.productionCapacity = entity.productionCapacity;
    dto.plannedProductionTime = entity.plannedProductionTime;
    dto.location = entity.location;
    dto.status = entity.status;
    dto.oeePercentage = entity.oeePercentage;
    return dto;
  }

  static fromJSON(json: any): MachineDTO {
    const dto = new MachineDTO();
    dto.id = json.id;
    dto.name = json.name;
    dto.type = json.type;
    dto.productionCapacity = json.productionCapacity;
    dto.plannedProductionTime = json.plannedProductionTime;
    dto.location = json.location;
    dto.status = json.status;
    dto.oeePercentage = json.oeePercentage;
    return dto;
  }
}
