import { Controller, Get, Param, Res } from '@nestjs/common';
import { MachineDTO } from './machine.dto';
import { MachineRepository } from './machine.repository';
import { Response } from 'express';

@Controller('api/machine')
export class MachineController {
  constructor(private readonly machineRepository: MachineRepository) {}

  @Get()
  async getMachines(@Res() res: Response): Promise<Response> {
    const machineDTOs = await this.fetchAllMachines();
    return res.json({ data: machineDTOs });
  }

  @Get(':id')
  async getMachineById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const machine = await this.machineRepository.findByMachineId(id);
    if (machine) {
      return res.json({ data: MachineDTO.fromEntity(machine) });
    }
    return res.status(404).json({ message: 'Machine not found' });
  }

  private async fetchAllMachines(): Promise<MachineDTO[]> {
    const machines = await this.machineRepository.listAllMachines();
    return machines.map((machine) => MachineDTO.fromEntity(machine));
  }
}
