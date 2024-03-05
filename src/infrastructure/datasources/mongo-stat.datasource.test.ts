import mongoose from 'mongoose';
import { envs } from '../../config/plugins/envs.plugin';
import { StatModel, MongoDatabase } from '../../data/mongo';
import { MongoStatDatasource } from './mongo-stat.datasource';
import { StatEntity } from '../../domain/entities/stat.entity';


describe('Pruebas en MongoStatDatasource', () => {
  
  const statDataSource = new MongoStatDatasource();
  const stat = new StatEntity({
    time: 0,
    message: 'test message',
    origin: 'mongo-stat.datasource.test.ts'
  })


  beforeAll(async() => {

    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    })

  })

  afterEach(async() => {
    await StatModel.deleteMany();
  })

  afterAll(async() => {

    mongoose.connection.close();
  })


  
  



});