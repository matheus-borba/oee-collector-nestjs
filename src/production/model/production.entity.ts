import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Machine } from '../../machine/model/machine.entity';

@Entity('production')
export class Production {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'production_time' })
  productionTime: number;

  @Column({ name: 'items_produced' })
  itemsProduced: number;

  @Column({ name: 'defective_items' })
  defectiveItems: number;

  @Column({ name: 'production_date', type: 'bigint' })
  productionDate: number;

  @Column()
  shift: string;

  @Column({ name: 'oee_percentage', type: 'float', nullable: true })
  oeePercentage: number;

  @ManyToOne(() => Machine, (machine) => machine.productions, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'machine_id', referencedColumnName: 'id' })
  machine: Machine;
}
