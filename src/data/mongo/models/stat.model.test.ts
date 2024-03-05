import { MongoDatabase } from '../init';
import {envs} from '../../../config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { StatModel } from './stat.model';

describe('Test Logmodel',()=>{

    afterAll(()=>{
        mongoose.connection.close();
    });

    test('Should return StatModel', async ()=>{
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME
        });
    });

    test('Should return StatModel', async ()=>{
        const statData = {
            origin:'stat.model.test.ts',
            message:'test message',
            level: 'low'
        }

        const stat = await StatModel.create( statData );

        expect( stat ).toEqual( expect.objectContaining({
            ...statData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));

        await StatModel.findByIdAndDelete( stat.id );
    });

    test('Should return the schema object', async ()=>{
        const schema = StatModel.schema.obj;
        expect( schema ).toEqual( expect.objectContaining({
                message: { type: expect.any(Function), require: true },
                origin: { type: expect.any(Function) },
                time: { type: expect.any(Function) },
                createdAt: { type: expect.any(Function), default: expect.any(Date) }
        }));
    });
});