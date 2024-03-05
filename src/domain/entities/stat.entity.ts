

export interface StatEntityOptions {
  time: number;
  message: string;
  origin: string;
  createdAt?: Date;
}


export class StatEntity {

  public time: number; 
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor( options: StatEntityOptions ) {
    
    const { message, time, origin, createdAt = new Date() } = options;
    this.message = message;
    this.time = time;
    this.createdAt = createdAt;
    this.origin = origin;
  }

  static fromJson = ( json: string ): StatEntity => {
    json = (json === '') ? '{}' : json;
    const { message, time, createdAt, origin } = JSON.parse( json );

    const stat = new StatEntity({ 
      message,
      time,
      createdAt: new Date(createdAt),
      origin,
    });

    return stat;
  };

  static fromObject = ( object: {[ key:string ]:any } ) : StatEntity => {
    const { message, time, createdAt, origin } = object;
    const stat = new StatEntity({
      message, time, createdAt, origin
    });
    return stat;
  }

}
