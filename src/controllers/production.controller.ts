import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductionDTO } from '../production/dto/production.dto';
import { ProductionRepository } from '../production/production.repository';

@Controller('api/production')
export class ProductionController {
  constructor(private readonly productionRepository: ProductionRepository) {}

  @Get()
  async getProduction(@Res() res: Response): Promise<Response> {
    const productionDTOs = await this.fetchAllProductions();
    return res.json({ data: productionDTOs });
  }

  @Get(':id')
  async getProductionById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const production = await this.productionRepository.findByProductionId(id);
    if (production) {
      return res.json({ data: ProductionDTO.fromEntity(production) });
    }
    return res.status(404).json({ message: 'Production not found' });
  }

  @Get('machine/:id')
  async getProductionByMachineId(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<Response> {
    const productions = await this.productionRepository.listByIdMachine(id);
    return res.json({
      data: productions.map((production) =>
        ProductionDTO.fromEntity(production),
      ),
    });
  }

  private async fetchAllProductions(): Promise<ProductionDTO[]> {
    const productions = await this.productionRepository.listAllProductions();

    return productions.map((production) =>
      ProductionDTO.fromEntity(production),
    );
  }
}
