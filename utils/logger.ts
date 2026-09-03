export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export class Logger {
  public log(level: LogLevel, message: string): void {
    const output = `[${level.toUpperCase()}] ${message}`;
    if (level === 'error') {
      console.error(output);
    } else if (level === 'warn') {
      console.warn(output);
    } else {
      console.log(output);
    }
  }
}

export const logger = new Logger();
