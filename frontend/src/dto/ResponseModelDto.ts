export interface ResponseModelDto<T> {
  status: string;
  message: string;
  data: T[];
}
