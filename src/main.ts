import { NestFactory } from '@nestjs/core';
import { SeederService } from './database/seeder/seeder.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const seederService = app.get(SeederService);
  // await seederService.seedUsers();
  await app.listen(process.env.PORT);
}

bootstrap();
