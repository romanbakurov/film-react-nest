import { TskvLogger } from './tskv-logger.service';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let logSpy: jest.SpyInstance;
  let errorSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;
  let debugSpy: jest.SpyInstance;
  let infoSpy: jest.SpyInstance;

  beforeAll(() => {
    logger = new TskvLogger();

    logSpy = jest.spyOn(console, 'log').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    infoSpy = jest.spyOn(console, 'info').mockImplementation();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should log an error message', () => {
    logger.error('Something went wrong!', { code: 500 });

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=error'),
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('message=Something went wrong!'),
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('"code":500'),
    );
  });

  it('should log a warning', () => {
    logger.warn('Deprecated method', { method: 'oldApi' });

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=warn'),
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('"method":"oldApi"'),
    );
  });

  it('should log a debug message', () => {
    logger.debug('Debugging', { debug: true });

    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=debug'),
    );
    expect(debugSpy).toHaveBeenCalledWith(
      expect.stringContaining('"debug":true'),
    );
  });

  it('should log a verbose message', () => {
    logger.verbose('Verbose log', { details: 'extra info' });

    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining('level=verbose'),
    );
    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining('"details":"extra info"'),
    );
  });

  it('should stringify multiple optional parameters', () => {
    logger.log('Multiple params', 'value1', { a: 1 }, [1, 2, 3]);

    const logged = logSpy.mock.calls[0][0];
    expect(logged).toContain('"value1"');
    expect(logged).toContain('{"a":1}');
    expect(logged).toContain('[1,2,3]');
  });
});
