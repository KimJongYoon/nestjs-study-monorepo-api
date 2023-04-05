export class RequestHelper {
  static createRequestId() {
    return Math.round(Math.random() * 100000000);
  }

  static createRequestTime() {
    return Date.now();
  }
}
