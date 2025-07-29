import { Module } from "@nestjs/common";
import { SeedService } from "./seed.service";
import { SeedController } from "./seed.controller";
import { DestinosModule } from "src/destinos/destinos.module";

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [DestinosModule],
})
export class SeedModule {}
