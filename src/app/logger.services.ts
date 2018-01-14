import {Injectable, Optional} from '@angular/core';
import {Headers, Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export class LoggerConfig {
  consoleLogLevel?: string;
  serverLoggingUrl?: string;
  serverLogLevel?: string;
  httpParams?: any;
  userParams?: any;
}

enum Levels {
  'ALL',
  'TRACE',
  'DEBUG',
  'INFO',
  'LOG',
  'WARN',
  'ERROR',
  'FATAL',
  'OFF'
}

@Injectable()
export class PWNLogger {

  tzoffset = (new Date()).getTimezoneOffset() * 60000;
  localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);

  constructor(private http: Http, @Optional() private options: LoggerConfig) {
  }

  trace(message?: any, ...optionalParams: any[]) {
    this._log('TRACE', true, message, ...optionalParams);
  }

  debug(message?: any, ...optionalParams: any[]) {
    this._log('DEBUG', true, message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    this._log('INFO', true, message, ...optionalParams);
  }

  log(message?: any, ...optionalParams: any[]) {
    this._log('LOG', true, message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    this._log('WARN', true, message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]) {
    this._log('ERROR', true, message, ...optionalParams);
  }

  fatal(message?: any, ...optionalParams: any[]) {
    this._log('FATAL', true, message, ...optionalParams);
  }

  getHeaders(): Headers {
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    headers.append('Access-Control-Allow-Credentials', 'true');
    for (let k in this.options.httpParams) {
      headers.append(k, this.options.httpParams[k]);
    }
    return headers;
  }

  private  _logOnServer(level: string, message: string, ...optionalParams: any[]) {
    let options: RequestOptions;
    if (this.options.serverLoggingUrl) {
      if (this.options.serverLogLevel && Levels[<any>level] < Levels[<any>this.options.serverLogLevel] || (this.options.userParams && this.options.userParams === 'DEBUG')) {
        return;
      } else {
        options = new RequestOptions({headers: this.getHeaders()});
        this.http.post(this.options.serverLoggingUrl, {level: level, message: message, additionalInfo: optionalParams}, options)
          .map(() => {})
          .catch(error => this._log('ERROR', false, 'FAILED TO LOG ON SERVER', error))
          .subscribe(
            res => null,
            error => this._log('ERROR', false, 'FAILED TO LOG ON SERVER', error)
          );
      }
    } else {
      return;
    }
  }

  private async _log(level: string, logOnServer: boolean, message?: any, ...optionalParams: any[]) {
    if (!message) {
      return;
    }
    let color;
    switch (level) {
      case 'TRACE':
        color = 'blue';
        break;
      case 'DEBUG':
        color = 'MediumSlateBlue';
        break;
      case 'INFO':
        color = 'DarkOrchid';
        break;
      case 'LOG':
        color = 'gray';
        break;
      case 'WARN':
        color = 'IndianRed';
        break;
      case 'ERROR':
        color = 'red';
        break;
      case 'FATAL':
        color = 'Brown';
        break;
      case 'OFF':
      default:
        return;
    }


    if (this.options.consoleLogLevel && Levels[<any>level] >= Levels[<any>this.options.consoleLogLevel] || (this.options.userParams && Levels[<any>level] >= Levels[<any>this.options.userParams])) {
      console.log(`%c${this.localISOTime} [${level}] %c${message} ${optionalParams}`, `color:${color}`, 'color:black');
    }
    if (!logOnServer) {
      return;
    } else {
      this._logOnServer(level, message, optionalParams);
    }
  }
}

