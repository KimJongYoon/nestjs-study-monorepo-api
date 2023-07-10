import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MicroserviceCacheInterceptor extends CacheInterceptor {
  protected trackBy(context: ExecutionContext): string {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      const toQueryString = this.getQueryStringFromContextParameter(context);
      return `${cacheMetadata}?${toQueryString}`;
    }

    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }
    return httpAdapter.getRequestUrl(request);
  }

  /**
   * context의 첫번째 파라미터를 쿼리스트링으로 변환한다.
   * @param context
   * @returns
   */
  private getQueryStringFromContextParameter(context: ExecutionContext) {
    const parameter = context.getArgs()[0];
    const toQueryString = new URLSearchParams(parameter).toString();
    return toQueryString;
  }
}
