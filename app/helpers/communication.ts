import { isEmpty } from "lodash";
import { json } from "remix";
import { IError } from "~/types";
import { getTransformedError } from "~/helpers";

type Get = (url: string, requestHeaders?: HeadersInit) => Promise<Response>;
type Post = (url: string, requestHeaders?: HeadersInit, requestBody?: any) => Promise<Response>;

export const get: Get = async (url: string, requestHeaders: HeadersInit = {}): Promise<Response> =>
  await fetch(url,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );

export const post: Post = async (url: string, requestHeaders: HeadersInit = {}, requestBody: any = {}) =>
   await fetch(url,
     {
       method: "POST",
       headers: {
         ...requestHeaders
       },
       body: !isEmpty(requestBody) ? JSON.stringify({ ...requestBody }) : undefined
     });


export const apiCallFailed: (errors: IError[], data?: any) => Response = (errors: IError[], data: any = {}) =>
  json(
    {
      errors: getTransformedError(errors),
      ...data,
    },
    { status: 400 },
  );