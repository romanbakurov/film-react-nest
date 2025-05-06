import { JsonLogger } from './json-logger.service';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;
  let consoleInfoSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages when level is log', () => {
    const message = 'Test log message';
    const optionalParams = { key: 'value' };
    logger.log(message, optionalParams);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"log"'),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test log message"'),
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[{"key":"value"}]'),
    );
  });

  it('should log error messages when level is error', () => {
    const message = 'Test error message';
    const optionalParams = { error: 'details' };
    logger.error(message, optionalParams);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"error"'),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test error message"'),
    );
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[{"error":"details"}]'),
    );
  });

  it('should log warning messages when level is warn', () => {
    const message = 'Test warning message';
    const optionalParams = { warning: 'details' };
    logger.warn(message, optionalParams);

    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"warn"'),
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test warning message"'),
    );
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[{"warning":"details"}]'),
    );
  });

  it('should log debug messages when level is debug', () => {
    const message = 'Test debug message';
    const optionalParams = { debug: 'details' };
    logger.debug(message, optionalParams);

    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"debug"'),
    );
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test debug message"'),
    );
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[{"debug":"details"}]'),
    );
  });

  it('should log verbose messages when level is verbose', () => {
    const message = 'Test verbose message';
    const optionalParams = { verbose: 'details' };
    logger.verbose(message, optionalParams);

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('"level":"verbose"'),
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":"Test verbose message"'),
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[{"verbose":"details"}]'),
    );
  });

  it('should handle null or undefined data gracefully', () => {
    const message = 'Test log message';
    logger.log(message, null);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"optionalParams":[null]'),
    );
  });

  it('should not log if no message is provided', () => {
    logger.log('');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('"message":""'),
    );
  });
});
