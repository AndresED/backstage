import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Module, Get, Controller } from '@nestjs/common';

@Controller()
class HealthController {
  @Get('health')
  health(): { service: string; status: string } {
    return { service: '${{ values.name }}', status: 'ok' };
  }
}

@Module({ controllers: [HealthController] })
class AppModule {}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
}

void bootstrap();
