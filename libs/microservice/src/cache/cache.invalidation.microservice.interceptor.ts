import { CacheInterceptor } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { CACHE_EVICT_METADATA } from '../../../core/src';
/**
 * 캐시 무효화 인터셉터
 * @description
 * - @CacheEvict 데코레이터와 함께 사용 합니다.
 *   example: @CacheEvict('posts')
 */
@Injectable()
export class CacheInvalidationMicroserviceInterceptor extends CacheInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const evictKeys = this.reflector.getAllAndMerge(CACHE_EVICT_METADATA, [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!evictKeys?.length) {
      // 기존 캐싱 처리
      return super.intercept(context, next);
    }

    return next.handle().pipe(
      tap(() => {
        if (evictKeys?.length > 0) this.clearCache(evictKeys);
      }),
    );
  }

  private async clearCache(evictKeys: string[]) {
    const store = await this.cacheManager.store;

    const keys = await Promise.all(
      evictKeys.map(async (key) => await store.keys(`${key}*`)),
    );

    await Promise.all(
      keys.map(async (key) => {
        Array.from(key).map(async (k) => await this.cacheManager.del(k)); // redis를 사용하지않은 인메모리 캐시에서는 keys가 iterable하지 않아서 Array.from으로 변환
      }),
    );
  }
}
