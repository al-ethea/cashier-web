import { AxiosError } from 'axios';

export const axiosErrorResponse = (error: unknown) => {
  const axiosError = error as AxiosError<{ message: string }>;
  return axiosError.response?.data.message || 'An error occurred';
};