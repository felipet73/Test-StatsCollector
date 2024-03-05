import moment from "moment";
import { StatEntity } from "../../entities/stat.entity";
import { StatService } from "./stat-service";

describe('Chack service usecase',()=>{

    const mockRepository = {
        saveStat: jest.fn(),
        getStats: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const statService = new StatService(
        mockRepository,
        successCallback,
        errorCallback
    );

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    test('should call success callback when fetch returns true', async ()=>{

        const wasOk = await statService.execute('https://google.com');
        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRepository.saveStat).toHaveBeenCalledWith(
            expect.any(StatEntity)
        );

    });

    test('should call errorCallback when fetch returns false', async ()=>{

        const wasOk = await statService.execute('https://google899.com');
        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRepository.saveStat).toHaveBeenCalledWith(
            expect.any(StatEntity)
        );

    });

    test('should return stats betwen two date arguments', async ()=>{

        let dateEnd = moment().toDate();
        let dateStart = moment(dateEnd).subtract(7, 'days').toDate();
    
        const stats = await statService.calculate(dateStart, dateEnd);
        expect(stats).toBe( true );

    });



});