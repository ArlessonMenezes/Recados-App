import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Put } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pessoas')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post()
  create(@Body() createPessoaDto: CreatePessoaDto) {
    return this.pessoasService.createPessoa(createPessoaDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pessoasService.findAllPessoas(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.findOnePessoa(id);
  }

  @Put('/update-pessoa/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePessoaDto: UpdatePessoaDto)
  {
    return this.pessoasService.updatePessoa(id, updatePessoaDto);
  }

  @Delete('/delete-pessoa/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pessoasService.removePessoa(id);
  }
}
