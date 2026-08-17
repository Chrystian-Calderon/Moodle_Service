import { PartialType } from '@nestjs/mapped-types';
import { CreateRecursosLeccionDto } from './create-recursos-leccion.dto';

export class UpdateRecursosLeccionDto extends PartialType(
  CreateRecursosLeccionDto,
) {}