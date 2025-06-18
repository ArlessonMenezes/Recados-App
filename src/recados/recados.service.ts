import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoaService: PessoasService,
  ){}

  async createRecado(createRecadoDto: CreateRecadoDto) {
    const de = await this.pessoaService.findOnePessoa(createRecadoDto.deId);
    const para = await this.pessoaService.findOnePessoa(createRecadoDto.paraId);

    const recado = this.recadoRepository.create({
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      date: new Date(),
    });

    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.idPessoa,
        name: recado.de.name,
      },
      para: {
        id: recado.para.idPessoa,
        name: recado.para.name,
      },
    };
  };

  async getAllRecado(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const [recados, total] = await this.recadoRepository.findAndCount({
      relations: ['de', 'para'],
      select: {
        de: {
          idPessoa: true,
          name: true,
        },
        para: {
          idPessoa: true,
          name: true,
        },
      },
      order: {
        id: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    return {
      recados,
      meta: {
        total,
        limit,
        offset,
        hasNextPage: total > offset + limit
      }
    }
  }

  async getOneRecado(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
      relations: ['de', 'para'],
      select: {
        de: {
          idPessoa: true,
          name: true,
        },
        para: {
          idPessoa: true,
          name: true,
        },
      },
    });

    if (!recado) throw new NotFoundException('Recado não encontrado.');

    return recado;
  }

  async updateRecado(updateRecadoDto: UpdateRecadoDto, id: number) {
    await this.getOneRecado(id);

    await this.recadoRepository.update(id, {
      texto: updateRecadoDto?.texto,
      lido: updateRecadoDto?.lido,
    });

    return this.recadoRepository.findOneBy({ id });
  };

  async deleteRecado(id: number) {
    const recado = await this.getOneRecado(id);

    await this.recadoRepository.remove(recado);

    return { success: 'Recado deletado com sucesso.' };
  }
}
