import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from './orders.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrdersEntity } from '../order/entities/Orders.entity';
import { Repository } from 'typeorm';

describe('OrdersRepository', () => {
  let ordersRepository: OrdersRepository;
  let ordersRepositoryMock: jest.Mocked<Repository<OrdersEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersRepository,
        {
          provide: getRepositoryToken(OrdersEntity),
          useValue: {
            save: jest.fn(), // Мокаем метод save
          },
        },
      ],
    }).compile();

    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    ordersRepositoryMock = module.get(getRepositoryToken(OrdersEntity));
  });

  it('should be defined', () => {
    expect(ordersRepository).toBeDefined();
  });

  describe('createOrder', () => {
    it('should save and return the created order', async () => {
      const mockOrder: OrdersEntity = {
        id: '1',
        email: 'test@example.com',
        phone: '1234567890',
        tickets: [
          {
            film: 'Film 1',
            session: 'Session 1',
            daytime: '2025-01-01T10:00:00',
            day: '2025-01-01',
            time: '10:00',
            row: 1,
            seat: 1,
            price: 500,
          },
        ],
      };

      // Мокаем сохранение, чтобы возвращать mockOrder
      ordersRepositoryMock.save.mockResolvedValue(mockOrder);

      const result = await ordersRepository.createOrder(mockOrder);

      expect(result).toEqual(mockOrder);
      expect(ordersRepositoryMock.save).toHaveBeenCalledWith(mockOrder);
      expect(ordersRepositoryMock.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if there is a database issue', async () => {
      const mockError = new Error('Database error');
      ordersRepositoryMock.save.mockRejectedValue(mockError);

      await expect(
        ordersRepository.createOrder({
          id: '1',
          email: 'test@example.com',
          phone: '1234567890',
          tickets: [
            {
              film: 'Film 1',
              session: 'Session 1',
              daytime: '2025-01-01T10:00:00',
              day: '2025-01-01',
              time: '10:00',
              row: 1,
              seat: 1,
              price: 500,
            },
          ],
        }),
      ).rejects.toThrow('Database error');
    });
  });
});
