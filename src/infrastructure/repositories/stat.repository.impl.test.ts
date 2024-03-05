import { StatEntity } from '../../domain/entities/stat.entity';
import { StatRepositoryImpl } from './stat.repository.impl';

describe('StatRepositoryImpl', () => {

  const mockStatDatasouce = {
    saveStat: jest.fn(),
    getStats: jest.fn(),
  }

  const statRepository = new StatRepositoryImpl(mockStatDatasouce);

  beforeEach(()=> {
    jest.clearAllMocks();
  })


  test('saveStat should call the datasource with arguments', async() => {

    const stat = { time: 10, message: 'hola' } as StatEntity;
    await statRepository.saveStat(stat);
    expect( mockStatDatasouce.saveStat ).toHaveBeenCalledWith( stat );

  });

  test('getStats should call the datasource with arguments', async() => {

    const since = new Date();
    const to = new Date();

    await statRepository.getStats( since, to );
    expect( mockStatDatasouce.getStats ).toBeCalledWith(since, to);

  });


})