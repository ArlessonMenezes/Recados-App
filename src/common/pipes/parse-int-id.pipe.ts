import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma string númerica',
      )
    }

    if (parsedValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera uma número maior do que zero',
      )
    }

    return parsedValue;
  }

}