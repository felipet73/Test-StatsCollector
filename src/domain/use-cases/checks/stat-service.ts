import { StatEntity } from '../../entities/stat.entity';
import { StatRepository } from '../../repository/stat.repository';

interface StatServiceUseCase {
  execute( url: string ):Promise<boolean>;
  calculate( dateStar: Date, dateEnd:Date ):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class StatService implements StatServiceUseCase {

  constructor(
    private readonly statRepository: StatRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}


  public async execute( url: string ): Promise<boolean> {

    try {
      var start = performance.now();
      const req = await fetch( url );
      var end   = performance.now();
      var tiempo  = end - start;
      console.log (tiempo);

      if ( !req.ok ) {
        throw new Error( `Error on stat service ${ url }` );
      }

      const stat = new StatEntity({
        message: `Service ${ url } working`, 
        time: tiempo,
        origin: 'stat-service.ts'
      });
      this.statRepository.saveStat( stat );
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${ error }`;
      const stat = new StatEntity({ 
        message:errorMessage , 
        time: 0,
        origin: 'stat-service.ts'
       });
      this.statRepository.saveStat(stat);
      this.errorCallback && this.errorCallback( errorMessage );
      return false;
    }

  }

  public async calculate( dateStar: Date, dateEnd:Date ): Promise<boolean> {

    try {
      const stats = await this.statRepository.getStats(dateStar, dateEnd);
      const arrayTimes = stats.map(x=>x.time);
      let sum = arrayTimes.reduce((previous, current) => current += previous);
      let prom = sum / arrayTimes.length;
      console.log('El promedio es ', prom);
      arrayTimes.sort((a,b) => a-b);
      const l=arrayTimes.length;
      let mediana = l%2==0
          ? arrayTimes.slice(l/2-1, l/2+1).reduce((a,b) => a+b)/2
          : arrayTimes.slice((l/2), l/2+1)[0];
      console.log('la mediana es ', mediana);
      return true;
    } catch (error) {
      return false;
    }

  }
  
}





