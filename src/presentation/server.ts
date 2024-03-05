import moment from 'moment';
import { StatService } from '../domain/use-cases/checks/stat-service';
import { MongoStatDatasource } from '../infrastructure/datasources/mongo-stat.datasource';
import { StatRepositoryImpl } from '../infrastructure/repositories/stat.repository.impl';

const mongoStatRepository = new StatRepositoryImpl(
  new MongoStatDatasource()
);

export class Server {

  public static async start() {

    console.log( 'Server started...' );
    const exec = false;
    
    if (exec) 
    setInterval(() => {
       const url = 'https://google.com';
       new StatService(
         mongoStatRepository,
         () => console.log( `${ url } is ok` ),
         ( error ) => console.log( error ),
       ).execute( url );
     },200);

    let dateEnd = moment().toDate();
    let dateStart = moment(dateEnd).subtract(7, 'days').toDate();
    new StatService(
      mongoStatRepository,
      () => console.log( `ok` ),
      ( error ) => console.log( error ),
    ).calculate( dateStart , dateEnd );

  }

}


