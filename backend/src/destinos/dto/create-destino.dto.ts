import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, MinLength } from "class-validator";

export class CreateDestinoDto {
  @ApiProperty({
    description: "Nombre del destino",
    nullable: false,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  nombre: string;

  @ApiProperty({
    description: "Descripcion del destino",
    nullable: false,
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: "Direccion del destino",
    nullable: false,
  })
  @IsString()
  direccion: string;

  @ApiProperty({
    description: "Url de la imagen del destino",
    nullable: false,
  })
  @IsUrl()
  url: string;

  @IsOptional()
  likes: number;

  @IsOptional()
  slug: string;
}
