import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FindOneViewUsinPostEvent } from './event/find-one.view-usin-post.event';
import { PostEventEnum } from './event/usin-post.event-enum';
import { UsinPostRepository } from './repository/usin-post.repository';

@Injectable()
export class UsinPostListener {
  constructor(private readonly usinPostRepository: UsinPostRepository) {}

  /**
   * [어신] 포스트 상세 조회 이벤트 처리
   * @param event
   */
  @OnEvent(PostEventEnum.POST_FIND_ONE_USIN)
  async handlePostFindOneUsin(event: FindOneViewUsinPostEvent) {
    // 조회 수 증가
    const postId = event?.data?.id;
    await this.usinPostRepository.increaseReadCount(postId);
  }
}
