import { StatEntity } from "./stat.entity";


describe('StatEntity Test', ()=>{

    const dataObj = {
        message:'Hello',
        time: 0,
        origin:'stat.entity.test.ts'
    }

    test('should create a statEntity instance', ()=>{
        const stat = new StatEntity(dataObj);
        expect( stat ).toBeInstanceOf( StatEntity );
        expect( stat.message ).toBe( dataObj.message );
        expect( stat.time ).toBe( dataObj.time );
        expect( stat.origin ).toBe( dataObj.origin );
        expect( stat.createdAt ).toBeInstanceOf( Date );
    });


    test('should create a statEntity instance from json',()=>{
        const json = `{"message":"Service https://google.com working","time":"10","createdAt":"2024-03-04T19:45:20.732Z","origin":"stat-service.ts"}`;
        const stat = StatEntity.fromJson(json);
        expect( stat ).toBeInstanceOf( StatEntity );
        expect( stat.message ).toBe( "Service https://google.com working" );
        expect( stat.time ).toBeInstanceOf( Number );
        expect( stat.origin ).toBe( "stat-service.ts" );
        expect( stat.createdAt ).toBeInstanceOf( Date );

    });

    test('should create a StatEntity instance from Object',()=>{
        const stat = StatEntity.fromObject(dataObj);
        expect( stat ).toBeInstanceOf( StatEntity );
        expect( stat.message ).toBe( dataObj.message );
        expect( stat.time ).toBe( dataObj.time );
        expect( stat.origin ).toBe( dataObj.origin );
        expect( stat.createdAt ).toBeInstanceOf( Date );
    });

});