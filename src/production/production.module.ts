import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from './model/production.entity';
import { ProductionRepository } from './production.repository';
import { ApiService } from 'src/services/api.service';
import { MachineModule } from 'src/machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Production]),
    forwardRef(() => MachineModule),
  ],
  providers: [ProductionRepository, ApiService],
  exports: [ProductionRepository],
})
export class ProductionModule {}
