import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { FiltroDeExcecoes } from './comum/filtro-de-excecoes';
import { InterceptorDeResposta } from './comum/interceptor-de-resposta';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // valida o corpo das requisições usando as regras que estão nos DTOs.
  // o whitelist joga fora qualquer campo que não está no DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // filtro de erro e interceptor de sucesso valem pra API toda
  app.useGlobalFilters(new FiltroDeExcecoes());
  app.useGlobalInterceptors(new InterceptorDeResposta());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
