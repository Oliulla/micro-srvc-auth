import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length > 0) {
      const messages = this.formatValidationErrors(errors);
      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        error: messages,
      });
    }

    return value;
  }

  private formatValidationErrors(errors: ValidationError[]): string[] {
    return errors.map(
      (error) =>
        `${error.property} has failed validation. Constraints: ${Object.values(
          error.constraints || {},
        ).join(', ')}`,
    );
  }
}
