import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { DestinosService } from "./destinos.service";
import { CreateDestinoDto } from "./dto/create-destino.dto";
import { UpdateDestinoDto } from "./dto/update-destino.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Destino } from "./entities/destino.entity";

@ApiTags("Destinos")
@Controller("destinos")
export class DestinosController {
  constructor(private readonly destinosService: DestinosService) {}

  @Get()
  getAllDestinos(@Query() paginationDto: PaginationDto) {
    return this.destinosService.findAll(paginationDto);
  }

  @Get(":id")
  getDestinoById(@Param("id", ParseUUIDPipe) id: string) {
    return this.destinosService.findOneById(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: "Destino creado", type: Destino })
  @ApiResponse({ status: 400, description: "Bad Request" })
  create(@Body() createDestinoDto: CreateDestinoDto) {
    return this.destinosService.create(createDestinoDto);
  }

  @Patch(":id")
  update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() updateDestinoDto: UpdateDestinoDto,
  ) {
    return this.destinosService.update(id, updateDestinoDto);
  }

  @Patch(":id/likes/increment")
  async incrementLikes(@Param("id", ParseUUIDPipe) id: string) {
    return this.destinosService.incrementLikes(id);
  }

  @Delete(":id")
  delete(@Param("id", ParseUUIDPipe) id: string) {
    return this.destinosService.delete(id);
  }
}
