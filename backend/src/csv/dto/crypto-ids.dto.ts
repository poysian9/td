import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CSVDto {
  @ApiProperty({
    description: 'The name of the crypto',
    example: 'Bitcoin',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The price of the crypto',
    example: 25000,
  })
  @IsNumber()
  @IsOptional()
  price?: number;
}
