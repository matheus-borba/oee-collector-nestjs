import { Controller, Get } from '@nestjs/common';
import { ApiService } from './api.service';
import { OEECalculationService } from './oee-calculation.service';

@Controller('api')
export class SyncController {
  constructor(
    private readonly apiService: ApiService,
    private readonly oeeCalculationService: OEECalculationService,
  ) {}

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Get('sync')
  async syncMachines(): Promise<{ message: string }> {
    await this.apiService.synchronizeAllMachines();
    await this.delay(1000);
    await this.apiService.synchronizeAllProductions();
    await this.delay(1000);
    await this.oeeCalculationService.calculateForProduction();
    await this.delay(1000);
    await this.oeeCalculationService.calculateForMachine();
    return { message: 'synchronize successfully!' };
  }
}
