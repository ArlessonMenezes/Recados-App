import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecadoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  deId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  paraId: number;
}