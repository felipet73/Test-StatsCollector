import { StatDatasource } from '../../domain/datasources/stat.datasource';
import { StatEntity } from '../../domain/entities/stat.entity';
import { StatRepository } from '../../domain/repository/stat.repository';

export class StatRepositoryImpl implements StatRepository {

  constructor(
    private readonly statDatasource: StatDatasource, //<--- 
  ) {}

  async saveStat( stat: StatEntity ): Promise<void> {
    return this.statDatasource.saveStat( stat );
  }

  async getStats( since:Date, to:Date ): Promise<StatEntity[]> {
    return this.statDatasource.getStats( since, to );
  }

}
