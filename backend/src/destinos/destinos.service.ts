import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { CreateDestinoDto } from "./dto/create-destino.dto";
import { UpdateDestinoDto } from "./dto/update-destino.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Destino } from "./entities/destino.entity";
import { PaginationDto } from "src/common/dtos/pagination.dto";

@Injectable()
export class DestinosService {
  private readonly logger = new Logger("DestinoService");
  private destinos = [];
  constructor(
    @InjectRepository(Destino)
    private readonly destinoRepository: Repository<Destino>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [data, total] = await this.destinoRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        nombre: "ASC", // cambia a cualquier campo que prefieras
      },
    });

    return {
      data,
      total,
      limit: paginationDto.limit || 10,
      offset: paginationDto.offset || 0,
      currentPage:
        Math.floor((paginationDto.offset || 0) / (paginationDto.limit || 10)) +
        1,
      totalPages: Math.ceil(total / (paginationDto.limit || 10)),
    };
  }

  async findOneById(id: string) {
    const destino = await this.destinoRepository.findOneBy({ id });

    if (!destino) {
      throw new NotFoundException(`Destino con id ${id} no encontrado`);
    }

    return destino;
  }

  async create(createDestinoDto: CreateDestinoDto) {
    try {
      const destino = this.destinoRepository.create(createDestinoDto);
      await this.destinoRepository.save(destino);
      return destino;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: string, updateDestinoDto: UpdateDestinoDto) {
    const destino = await this.destinoRepository.preload({
      id: id,
      ...updateDestinoDto,
    });
    if (!destino) {
      throw new NotFoundException(`Destino con ${id} no encontrado`);
    }
    await this.destinoRepository.save(destino);
    return destino;
  }

  // destinos.service.ts
  async incrementLikes(id: string) {
    const destino = await this.destinoRepository.findOneBy({ id });

    if (!destino) {
      throw new NotFoundException(`Destino con id ${id} no encontrado`);
    }

    destino.likes += 1;
    destino.fechaActualizado = Date.now();

    return await this.destinoRepository.save(destino);
  }

  async delete(id: string) {
    const destino = await this.findOneById(id);
    await this.destinoRepository.remove(destino);
    return;
  }

  fillDestinosWithSeed(destino: Destino[]) {
    console.log(destino);
    // this.destinos = destino;
  }

  private handleExceptions(error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (error?.code === "23505") throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException("Unexpected Error");
  }

  async deleteAllDestinos() {
    await this.destinoRepository.clear(); // Borra todo
  }
}
