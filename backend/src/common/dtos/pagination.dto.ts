import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
  @ApiProperty({ default: 10, description: "Cuantos registros necesitas?" })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    default: 10,
    description: "Cuantos registros necesitas escapar?",
  })
  @IsOptional()
  @Type(() => Number)
  offset?: number;
}
