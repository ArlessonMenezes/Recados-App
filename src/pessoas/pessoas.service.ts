import { Injectable } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PessoasService {
  constructor(
      @InjectRepository(Pessoa)
      private readonly pessoaRepository: Repository<Pessoa>
    ){}

  createPessoa(createPessoaDto: CreatePessoaDto) {
    return 'This action adds a new pessoa';
  }

  async findAllPessoas(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [pessoas, total] = await this.pessoaRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      pessoas,
      meta: {
        total,
        limit,
        offset,
        hasNextPage: total > offset + limit
      }
    }
  }

  findOnePessoa(id: number) {
    return `This action returns a #${id} pessoa`;
  }

  updatePessoa(id: number, updatePessoaDto: UpdatePessoaDto) {
    return `This action updates a #${id} pessoa`;
  }

  removePessoa(id: number) {
    return `This action removes a #${id} pessoa`;
  }
}
