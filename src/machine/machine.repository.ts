import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MachineDTO } from './dto/machine.dto';
import { Machine } from './model/machine.entity';

@Injectable()
export class MachineRepository {
  constructor(
    @InjectRepository(Machine)
    private readonly machineRepository: Repository<Machine>,
  ) {}

  async save(dto: MachineDTO): Promise<void> {
    const machine = dto.toEntity();

    const existingMachine = await this.machineRepository.findOne({
      where: { id: machine.id },
    });

    if (existingMachine) {
      existingMachine.location = machine.location;
      existingMachine.status = machine.status;
      existingMachine.oeePercentage = machine.oeePercentage;

      await this.machineRepository.save(existingMachine);
    } else {
      await this.machineRepository.save(machine);
    }
  }

  async findByMachineId(id: number): Promise<Machine | null> {
    return this.machineRepository.findOne({ where: { id } });
  }

  async listAllMachines(): Promise<Machine[]> {
    return this.machineRepository.find();
  }

  async deleteByMachineId(id: number): Promise<void> {
    await this.machineRepository.delete(id);
  }
}
