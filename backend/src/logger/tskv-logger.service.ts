import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(level: string, message: any, ...optionalParams: any[]) {
    return `tskv\ttimestamp=${new Date().toISOString()}\tlevel=${level}\tmessage=${message}\tdata=${JSON.stringify(optionalParams)}`;
  }

  log(message: any, ...optionalParams: any[]): void {
    console.log(this.format('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error(this.format('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn(this.format('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]): void {
    console.debug(this.format('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]): void {
    console.info(this.format('verbose', message, ...optionalParams));
  }
}
