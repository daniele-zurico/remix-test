import { isEmpty } from "lodash";
import { json } from "remix";
import { IError } from "~/types";
import { getTransformedError } from "~/helpers";

export const apiCall: (url: string, requestHeaders?: HeadersInit,  method?: string, requestBody?: any) => Promise<Response> = async (url: string, requestHeaders?: HeadersInit, method: string = "GET", requestBody?: any): Promise<Response> =>
  await fetch(url,
    {
      method,
      headers: (!isEmpty(requestHeaders)) ? {
        ...requestHeaders
      } : undefined,
      body: (!isEmpty(requestBody)) ? JSON.stringify({ ...requestBody }) : undefined
    });

export const apiCallFailed: (errors: IError[], data?: any) => Response = (errors: IError[], data: any = {}) =>
  json(
    {
      errors: getTransformedError(errors),
      ...data
    },
    { status: 400 }
  );