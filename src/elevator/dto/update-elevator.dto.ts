import { PartialType } from '@nestjs/mapped-types';
import { CreateElevatorDto } from './create-elevator.dto';

export class UpdateElevatorDto extends PartialType(CreateElevatorDto) {}
