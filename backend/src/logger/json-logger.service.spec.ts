import { JsonLogger } from './json-logger.service';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should format log messages correctly for log level', () => {
    logger.log('Test log message', { key: 'value' });

    // Проверка наличия timestamp
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('timestamp'),
    );
    // Проверка уровня
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level": "log"'),
    );
    // Проверка сообщения
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test log message"'),
    );
    // Проверка данных
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"data":[{"key":"value"}]'),
    );
  });

  it('should format error messages correctly for error level', () => {
    logger.error('Test error message', { error: 'details' });

    // Проверка наличия timestamp
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('timestamp'),
    );
    // Проверка уровня
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level": "error"'),
    );
    // Проверка сообщения
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test error message"'),
    );
    // Проверка данных
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"data":[{"error":"details"}]'),
    );
  });

  it('should handle null or undefined data gracefully', () => {
    logger.log('Test log message', null);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"data":[null]'),
    );

    logger.error('Test error message', undefined);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"data":[null]'),
    );
  });

  it('should not log if no message is provided', () => {
    logger.log('');
    expect(consoleLogSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('"message":""'),
    );
  });
});