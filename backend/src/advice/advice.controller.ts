import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdviceService } from './advice.service';

import { adviceCSV } from './schema/advice.schema';

@Controller('advice')
export class AdviceController {
  constructor(private readonly researchService: AdviceService) {}

  @Post('upload')
  @ApiOperation({
    description: 'research matrix',
  })
  @ApiResponse({
    type: [adviceCSV],
    description: 'research matrix',
  })
  @ApiTags('Research')
  create() {
    return this.researchService.uploadCSV();
  }

  @Get('research')
  @ApiOperation({
    description: 'research matrix',
  })
  @ApiResponse({
    type: [adviceCSV],
    description: 'research matrix',
  })
  @ApiTags('Research')
  readAll() {
    return this.researchService.readAll();
  }
}
