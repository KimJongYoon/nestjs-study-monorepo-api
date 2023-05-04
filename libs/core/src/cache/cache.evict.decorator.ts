import { CustomDecorator, SetMetadata } from '@nestjs/common';

/** 캐시 무효화 메타데이터 키 */
export const CACHE_EVICT_METADATA = 'cache:CACHE_EVICT';

export const CacheEvict = (
  ...cacheEvictKeys: string[]
): CustomDecorator<string> => SetMetadata(CACHE_EVICT_METADATA, cacheEvictKeys);
