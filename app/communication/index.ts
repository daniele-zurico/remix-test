import { isEmpty } from "lodash";

export const callApi: (url: string, requestHeaders?: HeadersInit,  method?: string, requestBody?: any) => Promise<Response> = async (url: string, requestHeaders?: HeadersInit, method: string = "GET", requestBody?: any): Promise<Response> =>
  await fetch(url,
    {
      method,
      headers: (!isEmpty(requestHeaders)) ? {
        ...requestHeaders
      } : undefined,
      body: (!isEmpty(requestBody)) ? JSON.stringify({ ...requestBody }) : undefined
    });
