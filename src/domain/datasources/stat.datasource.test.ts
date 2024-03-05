import { StatEntity } from "../entities/stat.entity";
import { StatDatasource } from "./stat.datasource";

describe('Test stat.datasource ', ()=>{

    const newStat = new StatEntity({
        origin: 'stat datasource test',
        message: 'test-message',
        time: 0
    });

    class MockStatDatasource implements StatDatasource{
        async saveStat(stat: StatEntity): Promise<void> {
            return;
        }
        async getStats(since:Date, to:Date): Promise<StatEntity[]> {
            return [newStat];
        }
    }


    test(' should test the abstract class', async ()=>{
        const mockStatDatasource = new MockStatDatasource();
        expect( mockStatDatasource ).toBeInstanceOf( MockStatDatasource );
        expect( mockStatDatasource ).toHaveProperty( 'saveStat' );
        expect( mockStatDatasource ).toHaveProperty( 'getStats' );
        expect( typeof mockStatDatasource.saveStat ).toBe( 'function' );
        expect( typeof mockStatDatasource.getStats ).toBe( 'function' );
        await mockStatDatasource.saveStat ( newStat );
        const stats = await mockStatDatasource.getStats( new Date(), new Date() );
        expect( stats ).toHaveLength(1);
        expect( stats[0] ).toBeInstanceOf( StatEntity );
    })
});