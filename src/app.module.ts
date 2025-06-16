import { Module } from '@nestjs/common';
import { RecadosModule } from './recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'recados',
      password: '0000',
      autoLoadEntities: true,
      synchronize: true,
    }),
    RecadosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
