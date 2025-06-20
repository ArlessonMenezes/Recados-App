import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UsePipes } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';

@Controller('recados')
export class RecadosController {  constructor(
    private readonly recadosService: RecadosService,
  ){}

  @Post()
  async createRecado(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.createRecado(createRecadoDto);
  }

  @Get()
   async getAllRecados(@Query() paginatioDto: PaginationDto) {
    return this.recadosService.getAllRecado(paginatioDto);
  }

  @Get('/:id')
   async getOneRecado(@Param('id') id: number) {
    return this.recadosService.getOneRecado(id);
  }
  
  @Put('/update-recado/:id')
   async updateRecado(
    @Param('id') id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
   ) {
    return this.recadosService.updateRecado(updateRecadoDto, id);
  }
  
  @Delete('/delete-recado/:id')
   async deleteRecado(@Param('id') id: number) {
    return this.recadosService.deleteRecado(id);
  }
}
