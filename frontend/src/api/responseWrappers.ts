// ErrorResponse wrapper in case an error occurs
export interface ErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
}
