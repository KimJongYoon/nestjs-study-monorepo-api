import { CacheModuleOptions, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';

@Injectable()
export class CacheConfigService implements CacheModuleOptions {
  constructor(
    private readonly configService: ConfigService,
    @Inject('configName') private readonly configName: string,
  ) {}
  async createCacheOptions(): Promise<CacheModuleOptions<Record<string, any>>> {
    const config = this.configService.get(this.configName);

    // `redis[s]://[[username][:password]@][host][:port][/db-number]`
    const cacheUrl = `redis://${config.cache.host}:${config.cache.port}`;
    return {
      store: await redisStore({
        ttl: +config.cache.ttl,
      }),
      isGlobal: true,
    };
  }
}
