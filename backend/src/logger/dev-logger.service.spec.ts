import { DevLogger } from './dev-logger.service';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    logger = new DevLogger(); // <-- после spy'ов
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages when level is log', () => {
    logger.log('Test log message', { key: 'value' });
    expect(consoleLogSpy).toHaveBeenCalledWith('[LOG] Test log message', {
      key: 'value',
    });
  });

  it('should log debug messages when level is debug', () => {
    logger.debug('Test debug message', { debug: true });
    expect(consoleDebugSpy).toHaveBeenCalledWith('[DEBUG] Test debug message', {
      debug: true,
    });
  });

  it('should log error messages', () => {
    logger.error('Test error message', { error: 'details' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('[ERROR] Test error message', {
      error: 'details',
    });
  });

  it('should log warning messages', () => {
    logger.warn('Test warning message', { warn: 'data' });
    expect(consoleWarnSpy).toHaveBeenCalledWith('[WARN] Test warning message', {
      warn: 'data',
    });
  });
});
