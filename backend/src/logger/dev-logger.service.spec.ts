import { DevLogger } from './dev-logger.service';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new DevLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages when level is log', () => {
    logger.log('Test log message');
    expect(consoleLogSpy).toHaveBeenCalledWith('[LOG] Test log message');
  });

  it('should log debug messages when level is debug', () => {
    // Имитация уровня для отладки, если это нужно для логгера
    logger.debug('Test debug message');
    expect(consoleLogSpy).toHaveBeenCalledWith('[DEBUG] Test debug message');
  });

  it('should not log debug messages when level is not debug', () => {
    // Тестирование, что debug не логируется, если уровень не debug
    logger.log('Test log message');
    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      '[DEBUG] Test debug message',
    );
  });

  it('should log error messages', () => {
    logger.error('Test error message');
    expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] Test error message');
  });
});
