import { StatEntity } from '../entities/stat.entity';

export abstract class StatRepository {
  abstract saveStat( stat: StatEntity ): Promise<void>;
  abstract getStats( since:Date, to:Date ): Promise<StatEntity[]>;
}


