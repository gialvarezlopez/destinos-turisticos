import { Injectable } from "@nestjs/common";
import { DESTINOS_SEED } from "./data/destinos.seed";
import { DestinosService } from "src/destinos/destinos.service";

@Injectable()
export class SeedService {
  constructor(private readonly destinoService: DestinosService) {}

  async populateDatabase() {
    // Eliminar todos los destinos previos (opcional)
    await this.destinoService.deleteAllDestinos();

    // Insertar los destinos del seed
    for (const destino of DESTINOS_SEED) {
      await this.destinoService.create(destino);
    }

    return "Seed executed successfully";
  }
}
