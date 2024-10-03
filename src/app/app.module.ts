import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncController } from '../common/sync.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from '../modules/machine/machine.module';
import { ApiService } from '../common/api.service';
import { ProductionModule } from '../modules/production/production.module';
import { OEECalculationService } from '../common/oee-calculation.service';
import { MachineController } from '../modules/machine/machine.controller';
import { ProductionController } from '../modules/production/production.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'oee-data-collector',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MachineModule,
    ProductionModule,
  ],
  controllers: [
    AppController,
    SyncController,
    MachineController,
    ProductionController,
  ],
  providers: [ApiService, AppService, OEECalculationService],
})
export class AppModule {}
