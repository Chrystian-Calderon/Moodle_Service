import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | string[] = exception.message;

    if (typeof exceptionResponse === 'object') {
      const body = exceptionResponse as {
        message?: string | string[];
      };

      if (body.message) {
        message = body.message;
      }
    }

    response.status(status).json({
      success: false,
      message,
      data: null,
      statusCode: status,
    });
  }
}