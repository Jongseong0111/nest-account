import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigSearch } from './config.search';
import { SearchServiceInterface } from './search.service.interface';

@Injectable()
export class SearchService {
  constructor(private readonly esService: ElasticsearchService) {}

  async search(search: string) {
    let results = [];
    const { body } = await this.esService.search({
      index: 'autocomplete_test_1',
      body: {
        query: {
          prefix: {
            word: {
              value: search,
            },
          },
        },
        size: 200,
      },
    });

    console.log(body.hits);
    const hits = body.hits.hits;
    hits.map((item) => {
      results.push(item._source);
    });

    return { results, total: body.hits.total.value };
  }
}
