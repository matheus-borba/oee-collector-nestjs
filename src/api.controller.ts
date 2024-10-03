import { Controller, Get } from '@nestjs/common';
import { ApiService } from './services/api.service';
import { OEECalculationService } from './services/oee-calculation.service';

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
  async syncMachines(): Promise<string> {
    await this.apiService.synchronizeAllMachines();
    await this.delay(2000);
    await this.apiService.synchronizeAllProductions();
    await this.delay(2000);
    await this.oeeCalculationService.calculateForProduction();
    await this.delay(2000);
    await this.oeeCalculationService.calculateForMachine();
    return 'synchronize successfully!';
  }
}
