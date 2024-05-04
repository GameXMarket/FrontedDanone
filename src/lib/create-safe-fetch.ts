import { AxiosError } from "axios";
import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type FetchState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  data?: TOutput
};

export const createSafeFetch = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validatedData: TInput) => Promise<FetchState<TInput, TOutput> | AxiosError>
) => {
  return async (data: TInput): Promise<FetchState<TInput, TOutput> | AxiosError> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      throw {
        fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
      };
    }

    return handler(validationResult.data);
  };
};