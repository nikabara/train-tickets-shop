export interface ServiceResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string | null
}
