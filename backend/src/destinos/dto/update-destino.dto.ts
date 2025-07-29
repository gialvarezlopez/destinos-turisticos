import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateDestinoDto {
  @ApiProperty({
    description: "Nombre del destino",
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @IsOptional()
  nombre?: string;

  @ApiProperty({
    description: "Descripcion del destino",
    nullable: false,
  })
  @IsString()
  @IsOptional()
  descripcion?: string;

  @ApiProperty({
    description: "Direccion del destino",
    nullable: false,
  })
  @IsString()
  @IsOptional()
  direccion?: string;

  @ApiProperty({
    description: "Url de la imagen del destino",
    nullable: false,
  })
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsOptional()
  likes?: number;
}
