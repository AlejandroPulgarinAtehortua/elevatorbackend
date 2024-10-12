import { Controller, Get, Post, Param } from '@nestjs/common';
import { ElevatorService } from './elevator.service';
import { ElevatorStatus } from './interfaces/elevator.interface';

@Controller('elevator')
export class ElevatorController {
  constructor(private readonly elevatorService: ElevatorService) {}

  @Post('call/:floor')
  callElevator(@Param('floor') floor: number): { message: string } {
    return this.elevatorService.callElevator(Number(floor));
  }

  @Get('status')
  getStatus(): ElevatorStatus {
    return this.elevatorService.getStatus();
  }
}
