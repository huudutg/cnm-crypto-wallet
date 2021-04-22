import { AxiosError } from "axios";

export interface APIError extends Error {
  status?: number;
  details?: any;
}

export interface APIResponseError {
  code: number;
  id?: string;
  message: string;
}

export const isAxiosError = <T>(
  error: Error | AxiosError<T>
): error is AxiosError<T> => {
  return (error as AxiosError<T>).isAxiosError !== undefined;
};

export const parseError = (error: Error | AxiosError<any>): APIError => {
  if (isAxiosError<APIResponseError>(error) && error.response) {
    let apiError = error.response.data;
    return {
      status: apiError.code,
      message: apiError.message,
      details: error.response,
      name: error.name,
      stack: error.stack,
    };
  }

  return {
    status: 500,
    message: "Oops something went wrong.",
    details: error.message,
    name: error.name,
    stack: error.stack,
  };
};
