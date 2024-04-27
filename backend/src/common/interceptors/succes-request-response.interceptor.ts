import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class SuccesResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T, Record<string, any>>> {
    return next.handle().pipe(
      map(
        (data) =>
          ({
            statusCode: context.switchToHttp().getResponse().statusCode,
            message: 'Success',
            data,
          }) as unknown as Response<T, Record<string, any>>,
      ),
    );
  }
}
