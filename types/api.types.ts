export type ApiUser = Readonly<{
  id: number;
  name: string;
  email: string;
}>;

export type ApiResponse<T> = Readonly<{
  data: T;
  status: number;
}>;
