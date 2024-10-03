import { Production } from '../production/production.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('machine')
export class Machine {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ name: 'production_capacity' })
  productionCapacity: number;

  @Column({ name: 'planned_production_time' })
  plannedProductionTime: number;

  @Column({ type: 'text', nullable: true })
  location: string;

  @Column()
  status: string;

  @Column({ name: 'oee_percentage', type: 'float', nullable: true })
  oeePercentage: number;

  @OneToMany(() => Production, (production) => production.machine)
  productions: Production[];
}
