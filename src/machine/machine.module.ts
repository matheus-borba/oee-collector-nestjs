import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiService } from '../services/api.service'; // Se você tiver um serviço que usa o repositório
import { MachineRepository } from './machine.repository'; // Ajuste o caminho conforme necessário
import { Machine } from './model/machine.entity'; // Ajuste o caminho conforme necessário
import { ProductionModule } from 'src/production/production.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Machine]),
    forwardRef(() => ProductionModule),
  ], // Importa a entidade Machine
  providers: [MachineRepository, ApiService], // Adiciona o repositório e serviços que você precisa
  exports: [MachineRepository], // Exporte o repositório para que outros módulos possam usá-lo
})
export class MachineModule {}
