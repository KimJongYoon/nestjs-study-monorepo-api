import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FindOneViewUsinPostEvent } from './event/find-one.view-usin-post.event';
import { PostEventEnum } from './event/post.event-enum';
import { ServicePostRepository } from './repository/service-post.repository';

@Injectable()
export class ServicePostListener {
  constructor(private readonly servicePostRepository: ServicePostRepository) {}

  /**
   * [어신] 포스트 상세 조회 이벤트 처리
   * @param event
   */
  @OnEvent(PostEventEnum.POST_FIND_ONE_USIN)
  async handlePostFindOneUsin(event: FindOneViewUsinPostEvent) {
    // 조회 수 증가
    const postId = event?.data?.id;
    await this.servicePostRepository.increaseReadCount(postId);
  }
}
