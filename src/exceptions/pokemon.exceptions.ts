import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import {ExceptionMessages} from "./exceptions.messages.enum"

@Catch(HttpException)
export class PokemonExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        message: `${exception.message}: ${ExceptionMessages.limit}`,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}