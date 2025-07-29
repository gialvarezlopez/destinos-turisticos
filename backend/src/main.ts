import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Permitir CORS solo para el frontend en localhost:3000
  app.enableCors({
    origin: "http://localhost:3000", // o ['http://localhost:3000'] para múltiples
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // si usas cookies o autenticación
  });

  const config = new DocumentBuilder()
    .setTitle("Destinos Turísticos API")
    .setDescription("Endpoints")
    .setVersion("1.0")
    //.addTag("cats")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
