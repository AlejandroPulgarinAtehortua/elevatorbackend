import { Injectable } from '@nestjs/common';
import { ElevatorStatus } from './interfaces/elevator.interface';

@Injectable()
export class ElevatorService {
  private status: ElevatorStatus = {
    currentFloor: 1,
    isMoving: false,
    isDoorOpen: false,
    pendingRequests: [],
    direction: 'inmovil',
  };

  private processingRequests: boolean = false;

  callElevator(floor: number): { message: string } {
    if (
      !this.status.pendingRequests.includes(floor) &&
      floor !== this.status.currentFloor
    ) {
      this.status.pendingRequests.push(floor);
      if (!this.processingRequests) {
        this.processRequests();
      }
    }
    return { message: `Asensor solicitado del piso ${floor}` };
  }

  getStatus(): ElevatorStatus {
    return this.status;
  }

  private async processRequests(): Promise<void> {
    this.processingRequests = true;
    while (this.status.pendingRequests.length > 0) {
      this.updateDirection();
      await this.moveToNextFloor();
      await this.handleDoorAtFloor();
    }
    this.status.direction = 'inmovil';
    this.processingRequests = false;
  }

  private updateDirection(): void {
    const nextFloor = this.status.pendingRequests[0];
    this.status.direction =
      nextFloor > this.status.currentFloor ? 'subiendo' : 'bajando';
  }

  private async moveToNextFloor(): Promise<void> {
    this.status.isMoving = true;
    while (this.status.currentFloor !== this.status.pendingRequests[0]) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.status.currentFloor += this.status.direction === 'subiendo' ? 1 : -1;
    }
    this.status.isMoving = false;
  }

  private async handleDoorAtFloor(): Promise<void> {
    this.status.isDoorOpen = true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.status.isDoorOpen = false;
    this.status.pendingRequests.shift();
  }
}
