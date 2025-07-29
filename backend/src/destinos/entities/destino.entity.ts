import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Destino {
  @ApiProperty({
    example: "0e06f133-e0ab-4c07-bdcf-db65fec15888",
    description: "Destino ID",
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    example: "Montreal",
    description: "Nombre del destino turístico",
    uniqueItems: true,
  })
  @Column("text", { unique: true })
  nombre: string;

  @ApiProperty({
    example: "Canada",
    description: "Direccion del lugar",
    default: false,
  })
  @Column("text")
  direccion: string;

  @ApiProperty({
    example: "Parques de agua viva",
    description: "Descripcion del destino turístico",
    default: false,
  })
  @Column({ type: "text" })
  descripcion: string;

  @ApiProperty({
    example: "http://google.com/image/text.png",
    description: "Imagen del destino",
    default: false,
  })
  @Column()
  url: string;

  @Column("text", { unique: true })
  slug: string;

  @ApiProperty()
  @Column("int", { default: 0 })
  likes: number;

  @Column({ type: "bigint", nullable: true })
  fechaCreado: number;

  @Column({ type: "bigint", nullable: true })
  fechaActualizado?: number;

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.nombre;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", "");
  }
}
