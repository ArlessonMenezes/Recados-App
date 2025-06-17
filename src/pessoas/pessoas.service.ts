import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NotFoundError } from 'rxjs';
import { hash } from 'bcrypt';

@Injectable()
export class PessoasService {
  constructor(
      @InjectRepository(Pessoa)
      private readonly pessoaRepository: Repository<Pessoa>
    ){}

  async createPessoa(createPessoaDto: CreatePessoaDto) {
    const verifyPessoa = await this.pessoaRepository.findOne({
      where: { email: createPessoaDto.email },
    });

    if (verifyPessoa) {
      throw new ConflictException('Esta pessoa já existe na base de dados.');
    };

    const SALT = 10;
    const passwordHash = await hash(createPessoaDto.password, SALT);

    const pessoa = this.pessoaRepository.create({
      ...createPessoaDto,
      password: passwordHash,
    });

    const savedPessoa = await this.pessoaRepository.save(pessoa);

    const { password, ...returnPessoa } = savedPessoa;

    return returnPessoa;
  }

  async findAllPessoas(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [pessoas, total] = await this.pessoaRepository.findAndCount({
      select: ['idPessoa', 'name', 'email'],
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

  async findOnePessoa(id: number) {
    const existingPessoa = await this.pessoaRepository.findOne({
      where: { idPessoa: id }
    });

    if (!existingPessoa) {
      throw new NotFoundException('Esta pessoa não existe na base de dados.');
    };

    return existingPessoa;
  }

  async updatePessoa(id: number, updatePessoaDto: UpdatePessoaDto) {
    await this.findOnePessoa(id);

    await this.pessoaRepository.update(id, updatePessoaDto);

    return this.pessoaRepository.findOneBy({ idPessoa: id });
  }

  async removePessoa(id: number) {
    const pessoa = await this.findOnePessoa(id);
    
    await this.pessoaRepository.remove(pessoa);
  }
}
