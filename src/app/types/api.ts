export interface ApiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      total: number;
      current: number;
      pageSize: number;
    };
  };
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
}
