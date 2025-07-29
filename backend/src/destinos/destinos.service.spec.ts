//destino.service.spec.ts
import { Test, TestingModule } from "@nestjs/testing";
import { DestinosService } from "./destinos.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Destino } from "./entities/destino.entity";

describe("DestinosService", () => {
  let service: DestinosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DestinosService,
        {
          provide: getRepositoryToken(Destino),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DestinosService>(DestinosService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
