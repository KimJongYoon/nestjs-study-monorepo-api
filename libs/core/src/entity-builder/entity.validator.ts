export interface EntityValidator<T> {
  validate(dto: T, optional?: object): Promise<void>;
}
