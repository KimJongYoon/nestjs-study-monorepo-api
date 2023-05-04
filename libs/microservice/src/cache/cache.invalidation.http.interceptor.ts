import { CacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CACHE_EVICT_METADATA } from '../../../core/src/cache/cache.evict.decorator';
/**
 * 캐시 무효화 인터셉터
 * @description
 * - POST, PUT, PATCH, DELETE 요청에 대해서만 캐시 무효화 처리
 * - @CacheEvict 데코레이터와 함께 사용 합니다.
 *   example: @CacheEvict('posts')
 */
@Injectable()
export class CacheInvalidationHttpInterceptor extends CacheInterceptor {
  protected allowedMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const evictKeys = this.reflector.getAllAndMerge(CACHE_EVICT_METADATA, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!evictKeys?.length && !this.isRequestInvalidation(context)) {
      // 기존 캐싱 처리
      return super.intercept(context, next);
    }

    return next.handle().pipe(
      tap(() => {
        if (evictKeys?.length > 0) this.clearCache(evictKeys);
      }),
    );
  }

  // 마이크로 서비스에서는 http method가 없으므로 주석 처리
  private isRequestInvalidation(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    return this.allowedMethods.includes(req.method);
  }

  private async clearCache(evictKeys: string[]) {
    const store = await this.cacheManager.store;

    const keys = await Promise.all(
      evictKeys.map(async (key) => await store.keys(`*${key}*`)),
    );

    await Promise.all(
      keys.map(async (key) => {
        await this.cacheManager.del(key);
      }),
    );
  }
}
