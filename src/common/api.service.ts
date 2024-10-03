import { Injectable } from '@nestjs/common';
import { getAllMachines, getAllProductions } from './mockarooApi.client';
import { MachineDTO } from '../modules/machine/machine.dto';
import { MachineRepository } from '../modules/machine/machine.repository';
import { ProductionDTO } from '../modules/production/production.dto';
import { ProductionRepository } from '../modules/production/production.repository';

@Injectable()
export class ApiService {
  constructor(
    private machineRepository: MachineRepository,
    private productionRepository: ProductionRepository,
  ) {}

  async synchronizeAllMachines() {
    try {
      console.log('Starting - Getting Machines');
      const machinesJson = await getAllMachines();
      const machines: MachineDTO[] = machinesJson.map((machineJson) =>
        MachineDTO.fromJSON(machineJson),
      );
      machines.forEach(async (machine) => {
        await this.machineRepository.save(machine);
      });
      console.log('Complete - Getting machines');
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  }

  async synchronizeAllProductions() {
    try {
      console.log('Starting - Getting Productions');
      const productionsJson = await getAllProductions();
      const productions: ProductionDTO[] = productionsJson.map(
        (productionJson) => ProductionDTO.fromJson(productionJson),
      );
      productions.forEach(async (production) => {
        await this.productionRepository.save(production);
      });
      console.log('Complete - Getting productions');
    } catch (error) {
      console.error('Error fetching productions:', error);
    }
  }
}
