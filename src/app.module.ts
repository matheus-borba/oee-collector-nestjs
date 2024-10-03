import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SyncController } from './api.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';
import { ApiService } from './services/api.service';
import { ProductionModule } from './production/production.module';
import { OEECalculationService } from './services/oee-calculation.service';
import { MachineController } from './controllers/machine.controller';
import { ProductionController } from './controllers/production.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'oee-data-collector',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
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
