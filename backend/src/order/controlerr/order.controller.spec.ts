import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            orderTickets: jest.fn(), // Мокаем метод orderTickets
          },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(orderController).toBeDefined();
  });

  describe('orderTickets', () => {
    it('should return a success response when tickets are ordered', async () => {
      const orderDto: OrderDto = {
        filmId: '1',
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'Film Title',
            session: 'Session 1',
            daytime: 'Daytime 1',
            day: '2025-05-05',
            time: '15:00',
            row: 5,
            seat: 10,
            price: 100,
          },
          {
            film: 'Film Title',
            session: 'Session 1',
            daytime: 'Daytime 2',
            day: '2025-05-06',
            time: '18:00',
            row: 6,
            seat: 12,
            price: 100,
          },
        ],
      };

      const mockResponse = { success: true };

      // Мокаем результат метода orderTickets
      orderService.orderTickets = jest.fn().mockResolvedValue(mockResponse);

      const result = await orderController.orderTickets(orderDto);

      expect(result).toEqual(mockResponse);
      expect(orderService.orderTickets).toHaveBeenCalledWith(orderDto);
      expect(orderService.orderTickets).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if order creation fails', async () => {
      const orderDto: OrderDto = {
        filmId: '1',
        email: 'test@example.com',
        phone: '+1234567890',
        tickets: [
          {
            film: 'Film Title',
            session: 'Session 1',
            daytime: 'Daytime 1',
            day: '2025-05-05',
            time: '15:00',
            row: 5,
            seat: 10,
            price: 100,
          },
        ],
      };

      const mockError = new Error('Something went wrong');

      // Мокаем ошибку метода orderTickets
      orderService.orderTickets = jest.fn().mockRejectedValue(mockError);

      await expect(orderController.orderTickets(orderDto)).rejects.toThrow(
        'Something went wrong',
      );
      expect(orderService.orderTickets).toHaveBeenCalledWith(orderDto);
    });
  });
});
