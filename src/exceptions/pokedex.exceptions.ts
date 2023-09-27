import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionMessages } from './exceptions.messages.enum';

@Catch(HttpException)
export class PokedexExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: this.messageHandler(request.url),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  messageHandler(url: string): string {
    return url.includes('id')
      ? ExceptionMessages.byId
      : url.includes('name')
      ? ExceptionMessages.byName
      : 'Make sure you request with name/pokememon_name or id/pokememon_id.';
  }
}
