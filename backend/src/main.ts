import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({
        origin: process.env.ALLOWED_ORIGIN || 'http://localhost:3000', // Your frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',        
    });

    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
