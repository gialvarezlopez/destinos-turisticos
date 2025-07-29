//destino.controller.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { DestinosController } from "./destinos.controller";
import { DestinosService } from "./destinos.service";
import { CreateDestinoDto } from "./dto/create-destino.dto";
import { UpdateDestinoDto } from "./dto/update-destino.dto";
import { PaginationDto } from "src/common/dtos/pagination.dto";
import { Destino } from "./entities/destino.entity";
//import { v4 as uuid } from "uuid";

describe("DestinosController", () => {
  let controller: DestinosController;
  let service: jest.Mocked<DestinosService>;

  const fakeDestino: Destino = {
    id: "1",
    nombre: "Test",
    direccion: "Direccion test",
    descripcion: "Descripción",
    url: "http://test.com",
    slug: "test-slug",
    likes: 10,
    fechaCreado: Date.now(),
    checkSlugInsert: () => {}, // <- agregar este método
  };

  beforeEach(async () => {
    const mockDestinosService = {
      findAll: jest.fn().mockResolvedValue([fakeDestino]),
      findOneById: jest.fn().mockResolvedValue(fakeDestino),
      create: jest.fn().mockResolvedValue(fakeDestino),
      update: jest.fn().mockResolvedValue({ ...fakeDestino, nombre: "Nuevo" }),
      incrementLikes: jest.fn().mockResolvedValue({ ...fakeDestino, likes: 1 }),
      delete: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinosController],
      providers: [
        {
          provide: DestinosService,
          useValue: mockDestinosService,
        },
      ],
    }).compile();

    controller = module.get<DestinosController>(DestinosController);
    service = module.get(DestinosService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should get all destinos", async () => {
    const result = await controller.getAllDestinos({} as PaginationDto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([fakeDestino]);
  });

  it("should get destino by ID", async () => {
    const result = await controller.getDestinoById(fakeDestino.id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.findOneById).toHaveBeenCalledWith(fakeDestino.id);
    expect(result).toEqual(fakeDestino);
  });

  it("should create a destino", async () => {
    const dto: CreateDestinoDto = {
      nombre: "San Salvador",
      direccion: "Centro",
      descripcion: "Capital",
      url: "http://example.com",
      slug: "san-salvador",
      likes: 0,
    };
    const result = await controller.create(dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(fakeDestino);
  });

  it("should update a destino", async () => {
    const dto: UpdateDestinoDto = { nombre: "Nuevo" };
    const result = await controller.update(fakeDestino.id, dto);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.update).toHaveBeenCalledWith(fakeDestino.id, dto);
    expect(result.nombre).toEqual("Nuevo");
  });

  it("should increment likes", async () => {
    const result = await controller.incrementLikes(fakeDestino.id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.incrementLikes).toHaveBeenCalledWith(fakeDestino.id);
    expect(result.likes).toBe(1);
  });

  it("should delete a destino", async () => {
    const result = await controller.delete(fakeDestino.id);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.delete).toHaveBeenCalledWith(fakeDestino.id);
    expect(result).toBeUndefined();
  });
});
