import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ElasticsearchModule,
  ElasticsearchService,
} from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: () => ({
        node: 'http://localhost:9200',
        maxRetries: 10,
        requestTimeout: 60000,
        pingTimeout: 60000,
        sniffOnStart: true,
      }),
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
