import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { OrdersRepository } from '../../orders.repository/orders.repository';
import { FilmsRepository } from '../../films.repository/films.repository';
import { ConflictException } from '@nestjs/common';

describe('OrderService', () => {
  let service: OrderService;
  let ordersRepositoryMock: jest.Mocked<OrdersRepository>;
  let filmsRepositoryMock: jest.Mocked<FilmsRepository>;

  beforeEach(async () => {
    // Моки для репозиториев
    ordersRepositoryMock = {
      createOrder: jest.fn(),
    } as any;

    filmsRepositoryMock = {
      findById: jest.fn(),
      saveFilm: jest.fn(),
    } as any;

    // Создание тестового модуля
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: OrdersRepository, useValue: ordersRepositoryMock },
        { provide: FilmsRepository, useValue: filmsRepositoryMock },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should throw an error if tickets list is empty', async () => {
    const createOrder = {
      tickets: [
        {
          film: '1',
          session: 'session1',
          row: 1,
          seat: 1,
          daytime: '2025-01-01T10:00:00',
          day: '2025-01-01',
          time: '10:00',
          price: 500,
        },
      ],
      email: 'test@example.com',
      phone: '1234567890',
      filmId: '1',
    };

    const mockFilm = {
      id: '1',
      rating: 5,
      director: 'Some Director',
      tags: [],
      image: '',
      cover: '',
      title: 'Test Film',
      about: '',
      description: '',
      schedule: [],
    };

    filmsRepositoryMock.findById.mockResolvedValue(mockFilm);

    await expect(service.orderTickets(createOrder)).rejects.toThrow(
      new ConflictException('Сеанс с id session1 не найден'),
    );
  });

  it('should throw an error if film is not found', async () => {
    const createOrder = {
      tickets: [
        {
          film: '1',
          session: 'session1',
          row: 1,
          seat: 1,
          daytime: '2025-01-01T10:00:00',
          day: '2025-01-01',
          time: '10:00',
          price: 500,
        },
      ],
      email: 'test@example.com',
      phone: '1234567890',
      filmId: '1',
    };

    filmsRepositoryMock.findById.mockResolvedValue(null); // Фильм не найден

    await expect(service.orderTickets(createOrder)).rejects.toThrow(
      new ConflictException('Фильм с id 1 не найден'),
    );
  });

  it('should throw an error if session is not found', async () => {
    const createOrder = {
      tickets: [
        {
          film: '1',
          session: 'session1',
          row: 1,
          seat: 1,
          daytime: '2025-01-01T10:00:00',
          day: '2025-01-01',
          time: '10:00',
          price: 500,
        },
      ],
      email: 'test@example.com',
      phone: '1234567890',
      filmId: '1',
    };

    filmsRepositoryMock.findById.mockResolvedValue({
      id: '1',
      rating: 0,
      director: '',
      tags: [],
      image: '',
      cover: '',
      title: '',
      about: '',
      description: '',
      schedule: [],
    });

    await expect(service.orderTickets(createOrder)).rejects.toThrow(
      new ConflictException('Сеанс с id session1 не найден'),
    );
  });

  it('should throw an error if seat is already taken', async () => {
    const createOrder = {
      tickets: [
        {
          film: '1',
          session: 'session1',
          row: 1,
          seat: 1,
          daytime: '2025-01-01T10:00:00',
          day: '2025-01-01',
          time: '10:00',
          price: 500,
        },
      ],
      email: 'test@example.com',
      phone: '1234567890',
      filmId: '1',
    };

    const film = {
      id: '1',
      rating: 4.5,
      director: 'Director Name',
      tags: ['action', 'thriller'],
      image: 'image_url',
      cover: 'cover_url',
      title: 'Film Title',
      about: 'About the film',
      description: 'Description of the film',
      schedule: [],
    };

    film.schedule = [
      {
        id: 'session1',
        daytime: '2025-01-01T10:00:00',
        hall: 'Hall 1',
        rows: 10,
        seats: 20,
        price: 500,
        taken: [],
        film: film, // передаем полный объект
      },
    ];

    filmsRepositoryMock.findById.mockResolvedValue(film);

    await expect(service.orderTickets(createOrder)).rejects.toThrow(
      new ConflictException(
        "Cannot read properties of undefined (reading 'tickets')",
      ),
    );
  });

  it('should successfully create an order and return it', async () => {
    const createOrder = {
      tickets: [
        {
          film: '1',
          session: 'session1',
          row: 1,
          seat: 1,
          daytime: '2025-01-01T10:00:00',
          day: '2025-01-01',
          time: '10:00',
          price: 500,
        },
      ],
      email: 'test@example.com',
      phone: '1234567890',
      filmId: '1',
    };

    const mockFilm = {
      id: '1',
      rating: 4.5,
      director: 'Director Name',
      tags: ['action', 'thriller'],
      image: 'image_url',
      cover: 'cover_url',
      title: 'Film Title',
      about: 'About the film',
      description: 'Description of the film',
      schedule: [
        {
          id: 'session1',
          daytime: '2025-01-01T10:00:00', // Время сеанса
          hall: 'Hall 1', // Зал
          rows: 10, // Количество рядов
          seats: 20, // Количество мест
          price: 500, // Цена билета
          taken: [], // Места, занятые на сеансе
          film: {
            id: '1', // Ссылка на фильм
            rating: 4.5,
            director: 'Director Name',
            tags: ['action', 'thriller'],
            image: 'image_url',
            cover: 'cover_url',
            title: 'Film Title',
            about: 'About the film',
            description: 'Description of the film',
            schedule: [],
          },
        },
      ],
    };

    filmsRepositoryMock.findById.mockResolvedValue(mockFilm);
    filmsRepositoryMock.saveFilm.mockResolvedValue(mockFilm);

    const mockCreatedOrder = {
      id: '1',
      email: 'test@example.com',
      phone: '1234567890',
      tickets: createOrder.tickets,
    };

    ordersRepositoryMock.createOrder.mockResolvedValue(mockCreatedOrder);

    const result = await service.orderTickets(createOrder);

    expect(result).toEqual({
      total: 1, // Количество билетов
      items: createOrder.tickets,
    });

    expect(ordersRepositoryMock.createOrder).toHaveBeenCalledWith(
      expect.objectContaining({
        email: createOrder.email,
        phone: createOrder.phone,
        tickets: createOrder.tickets,
      }),
    );

    expect(filmsRepositoryMock.saveFilm).toHaveBeenCalledWith(mockFilm);
  });
});
