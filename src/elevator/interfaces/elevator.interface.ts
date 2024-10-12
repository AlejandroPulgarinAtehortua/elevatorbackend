export interface ElevatorStatus {
  currentFloor: number;
  isMoving: boolean;
  isDoorOpen: boolean;
  pendingRequests: number[];
  direction: 'subiendo' | 'bajando' | 'inmovil';
}
