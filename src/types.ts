import { AxiosError, AxiosRequestConfig, CancelTokenSource, CancelToken } from "axios";
import { BuiltinApiErrorCode } from "./codes";

export enum ApiErrorMessageId {}

export interface IErrorMessages {
  [key: number]: string | false;
}

export interface IErrorHandler {
  [key: number]: ((err: ApiError) => void) | false;
}

export interface IJimuApiOption extends AxiosRequestConfig {
  url?: string;
  /** 别名, 对应 url. 老代码主要使用的是 endpoint */
  endpoint?: string;
  query?: object;
  isAutoHandleError?: boolean;
  isShowProgressBar?: boolean;
  errorMessage?: IErrorMessages;
  statusCodeErrorMessage?: IErrorMessages;
  errorHandler?: IErrorHandler;
  statusCodeErrorHandler?: IErrorHandler;
}

export interface IApiErrorItem {
  name: string;
  nameSpace: string;
  type: string;
  value: string;
  message: string;
  messageId: ApiErrorMessageId;
  messageParams: (string | number | boolean)[];
}

export interface IApiErrorData {
  error?: IApiErrorItem;
  errorFields?: IApiErrorItem[];
}

export class ApiError extends Error {
  code: number;
  message: string;
  data?: IApiErrorData;
  originError: AxiosError;

  constructor(code: number, message: string, data: IApiErrorData, originError: AxiosError) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);

    this.code = code;
    this.message = message;
    this.data = data;
    this.originError = originError;
  }

  isUnauthorized(): boolean {
    return this.code === BuiltinApiErrorCode.Unauthorized;
  }
}

/** api cancel source */
export interface ApiCancelTokenSource extends CancelTokenSource {}

/** api cancel token */
export interface ApiCancelToken extends CancelToken {}

export enum EGoValidator {
  required = "validator.required",
  min = "validator.min",
  // TODO, 需要优化规范完善
}
