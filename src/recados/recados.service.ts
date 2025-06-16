import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>
  ){}

  async createRecado(createRecadoDto: CreateRecadoDto) {
    const recado = this.recadoRepository.create({
      ...createRecadoDto,
      lido: false,
      date: new Date(),
    });

    return this.recadoRepository.save(recado);
  };

  async getAllRecado(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0, search = '' } = paginationDto;

    const [recados, total] = await this.recadoRepository.findAndCount({
      where: [
        { texto: Like(`%${search}%`) },
        { para: Like(`%${search}%`) },
      ],
    });

    return {
      recados,
      meta: {
        total,
        limit,
        offset,
        search,
        hasNextPage: total > offset + limit
      }
    }
  }

  async getOneRecado(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: { id },
    });

    if (!recado) throw new NotFoundException('Recado não encontrado.');

    return recado;
  }

  async updateRecado(updateRecadoDto: UpdateRecadoDto, id: number) {
    await this.getOneRecado(id);

    await this.recadoRepository.update(id, updateRecadoDto);

    return this.recadoRepository.findOneBy({ id });
  };

  async deleteRecado(id: number) {
    const recado = await this.getOneRecado(id);

    await this.recadoRepository.remove(recado);
  }
}
