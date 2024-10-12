import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElevatorModule } from './elevator/elevator.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ElevatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
