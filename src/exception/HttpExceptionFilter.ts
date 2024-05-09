import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

type TResponseError = {
  message: string[] | string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const responseError = exception.getResponse() as TResponseError;
    if (status === 401) {
      response.status(status).send({ message: responseError.message });
      return;
    }
    let message: string | string[] = '';
    if (Array.isArray(responseError?.message) && responseError.message?.length) {
      message = responseError?.message.join(', ');
    }
    if (typeof responseError === 'string') message = responseError;
    response.status(status).send({ message });
  }
}
