import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PockeApiService } from './services/pocke-api/pocke-api.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
  providers: [AppService, PockeApiService],
})
export class AppModule {}
