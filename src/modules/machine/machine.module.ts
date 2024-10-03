import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiService } from '../../common/api.service';
import { MachineRepository } from './machine.repository';
import { Machine } from './machine.entity';
import { ProductionModule } from 'src/modules/production/production.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine]),
    forwardRef(() => ProductionModule),
  ],
  providers: [MachineRepository, ApiService],
  exports: [MachineRepository],
})
export class MachineModule {}
