import { Module } from "@nestjs/common";
import { DestinosService } from "./destinos.service";
import { DestinosController } from "./destinos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Destino } from "./entities/destino.entity";

@Module({
  providers: [DestinosService],
  controllers: [DestinosController],
  imports: [TypeOrmModule.forFeature([Destino])],
  exports: [DestinosService],
})
export class DestinosModule {}
