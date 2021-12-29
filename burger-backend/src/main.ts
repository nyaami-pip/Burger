import { MyLogger } from '@config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { xssProtection, xframe } from 'lusca';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { PORT, CLIENT_HOST } from '@environments';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useLogger(new MyLogger());
    app.getHttpAdapter();
    app.use(compression());
    app.use(helmet());
    app.enableCors({
      origin: CLIENT_HOST,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    app.use(xframe('SAMEORIGIN'));
    app.use(xssProtection(true));
    app.useGlobalPipes(new ValidationPipe());
    app.enableShutdownHooks();
    await app.listen(PORT);
  } catch (error) {
    process.exit();
  }
}
bootstrap().catch((e) => {
  throw e;
});
