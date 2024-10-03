import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Production } from './production.entity';
import { ProductionRepository } from './production.repository';
import { ApiService } from 'src/common/api.service';
import { MachineModule } from '../machine/machine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Production]),
    forwardRef(() => MachineModule),
  ],
  providers: [ProductionRepository, ApiService],
  exports: [ProductionRepository],
})
export class ProductionModule {}
