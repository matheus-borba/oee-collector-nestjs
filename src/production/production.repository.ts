import { InjectRepository } from '@nestjs/typeorm';
import { Production } from './model/production.entity';
import { MachineRepository } from 'src/machine/machine.repository';
import { Repository } from 'typeorm';
import { ProductionDTO } from './dto/production.dto';
import { Machine } from 'src/machine/model/machine.entity';

export class ProductionRepository {
  constructor(
    @InjectRepository(Production)
    private readonly productionRepository: Repository<Production>,
    private readonly machineRepository: MachineRepository,
  ) {}

  async save(dto: ProductionDTO): Promise<void> {
    const machine = await this.machineRepository.findByMachineId(dto.machineId);

    if (machine) {
      const existingProduction = await this.productionRepository.findOne({
        where: { id: dto.id },
      });

      if (existingProduction) {
        existingProduction.shift = dto.shift;
        existingProduction.oeePercentage = dto.oeePercentage;
        await this.productionRepository.save(existingProduction);
      } else {
        const production = dto.toEntity();
        production.machine = machine;
        await this.productionRepository.save(production);
      }
    } else {
      console.error(
        `Failed to save Production id ${dto.id}. Machine not found`,
      );
    }
  }

  async listProductionWithoutOEE(): Promise<Production[]> {
    return this.productionRepository.find({
      where: { oeePercentage: null },
    });
  }

  async findByProductionId(id: number): Promise<Production | null> {
    return this.productionRepository.findOne({ where: { id } });
  }

  async findByMachine(machine: Machine): Promise<Production[]> {
    return this.productionRepository.find({ where: { machine } });
  }

  async listAllProductions(): Promise<Production[]> {
    return this.productionRepository.find();
  }

  async listByIdMachine(machineId: number): Promise<Production[]> {
    const machine = await this.machineRepository.findByMachineId(machineId);
    if (machine) {
      return this.findByMachine(machine);
    }
    return [];
  }
}
