import { Injectable } from '@nestjs/common';
import { ProductionRepository } from '../production/production.repository';
import { MachineRepository } from '../machine/machine.repository';
import { ProductionDTO } from '../production/dto/production.dto';
import { MachineDTO } from '../machine/dto/machine.dto';
import { Machine } from '../machine/model/machine.entity';
import { Production } from '../production/model/production.entity';

@Injectable()
export class OEECalculationService {
  constructor(
    private readonly productionRepository: ProductionRepository,
    private readonly machineRepository: MachineRepository,
  ) {}

  async calculateForProduction() {
    const productions: Production[] =
      await this.productionRepository.listAllProductions();
    productions.forEach(async (production) => {
      await this.calculateOEEProduction(production);
    });
  }

  async calculateForMachine() {
    const machines: Machine[] = await this.machineRepository.listAllMachines();
    machines.forEach(async (machine) => {
      await this.calculateOEEMachine(machine);
    });
  }

  async calculateOEEProduction(production: Production): Promise<void> {
    const machine = production.machine;
    console.log(machine);
    const availability = this.calculateAvailability(
      production.productionTime,
      machine.plannedProductionTime,
    );
    const performance = this.calculatePerformance(
      production.itemsProduced,
      machine.productionCapacity,
    );
    const quality = this.calculateQuality(
      production.itemsProduced,
      production.defectiveItems,
    );

    const oee = this.calculateOEE(availability, performance, quality);
    const oeeFinal = this.roundToTwoDecimalPlaces(oee);

    const dto = ProductionDTO.fromEntity(production);
    dto.oeePercentage = oeeFinal;

    await this.productionRepository.save(dto);
  }

  async calculateOEEMachine(machine: Machine): Promise<void> {
    const productions = await this.productionRepository.findByMachine(machine);
    if (productions.length === 0) {
      console.log(`There's no production for machine id ${machine.id}`);
      return;
    }

    const totalOee = productions.reduce(
      (sum, production) => sum + production.oeePercentage,
      0,
    );
    const averageOee = totalOee / productions.length;
    const averageOeeFinal = this.roundToTwoDecimalPlaces(averageOee);

    const dto = MachineDTO.fromEntity(machine);
    dto.oeePercentage = averageOeeFinal;

    await this.machineRepository.save(dto);
  }

  calculateAvailability(
    productionTime: number,
    plannedProductionTime: number,
  ): number {
    return productionTime / plannedProductionTime;
  }

  calculatePerformance(
    itemsProduced: number,
    productionCapacity: number,
  ): number {
    return itemsProduced / productionCapacity;
  }

  calculateQuality(itemsProduced: number, defectiveItems: number): number {
    return (itemsProduced - defectiveItems) / itemsProduced;
  }

  calculateOEE(
    availability: number,
    performance: number,
    quality: number,
  ): number {
    return availability * performance * quality * 100;
  }

  roundToTwoDecimalPlaces(value: number): number {
    return parseFloat(value.toFixed(2));
  }
}
