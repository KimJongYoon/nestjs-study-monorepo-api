export class AssignHelper {
  /**
   * 데이터에서 특정 키/값만 추출하여 새로운 객체를 생성합니다.
   * @param refData
   * @param allowedKeys
   * @returns
   */
  static filter(refData: any, allowedKeys: string[]) {
    if (!refData) return undefined;

    return Object.keys(refData)
      .filter((key) => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = refData[key];
        return obj;
      }, {});
  }
}
