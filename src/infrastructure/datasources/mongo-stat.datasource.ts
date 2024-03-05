import { StatModel } from "../../data/mongo";
import { StatDatasource } from "../../domain/datasources/stat.datasource";
import { StatEntity } from "../../domain/entities/stat.entity";


export class MongoStatDatasource implements StatDatasource {

    async saveStat(stat: StatEntity): Promise<void> {
        const newStat = await StatModel.create(stat);        
        console.log('mongo Stat Created: ', newStat.id);
        //await newStat.save();
    }

    async getStats(since: Date, to: Date): Promise<StatEntity[]> {
        console.log('Since', since);
        console.log('to', to);
        const stats = await StatModel.find({createdAt: {$gte: since, $lte: to}});
        //const stats = await StatModel.find();
        //console.log('data obtenida bd', stats);
        return stats.map( StatEntity.fromObject );
    }

}