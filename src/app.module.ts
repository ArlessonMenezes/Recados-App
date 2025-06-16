import { Module } from '@nestjs/common';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PessoasModule } from './pessoas/pessoas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    } as TypeOrmModuleOptions),
    RecadosModule,
    PessoasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
