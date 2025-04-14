import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { hello } from '../../shared/dist';
import { hello } from 'shared';
console.log(hello);
@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
