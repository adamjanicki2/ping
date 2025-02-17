import isHtml from "is-html";
import qs from "qs";

export const HTTP_METHODS = ["GET", "POST"] as const;
export type HttpMethod = typeof HTTP_METHODS[number];

export type RequestArgs = {
  params?: Record<string, any>;
  headers?: Record<string, string>;
  body?: Record<string, any>;
};

type RequestConfig = RequestArgs & {
  url: string;
  method: HttpMethod;
};

type GetConfig = Omit<RequestConfig, "body" | "method">;
type PostConfig = Omit<RequestConfig, "method">;

export async function get(config: GetConfig) {
  return httpRequest({ ...config, method: "GET" });
}

export async function post(config: PostConfig) {
  return httpRequest({ ...config, method: "POST" });
}

export type PingResponse = {
  url: string;
  error?: Error;
  text?: string;
  statusCode?: number;
  html?: string;
  json?: Object;
  duration?: number;
};

async function httpRequest(config: RequestConfig): Promise<PingResponse> {
  let { method, url, params, body, headers } = config;
  if (params && Object.keys(params).length > 0) {
    url += "?" + qs.stringify(params);
  }

  const args: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  let res: Response;
  let duration: number;
  try {
    const start = performance.now();
    res = await fetch(url, args);
    const end = performance.now();
    duration = Math.floor(end - start);
  } catch (error: any) {
    return {
      url,
      error: new Error(
        `${method} request to ${url} failed with error: ${error}`
      ),
    };
  }

  let text: string;
  try {
    text = await res.text();
  } catch (error: any) {
    return {
      url,
      error: new Error(
        `${method} request to ${url} succeeded but text parsing failed with error: ${error}`
      ),
    };
  }

  const statusCode = res.status;
  const pingResponse = {
    url,
    statusCode,
    text,
    duration,
  };

  // try parsing the various ways
  try {
    const json = JSON.parse(text);
    return { ...pingResponse, json };
  } catch {
    // nothing move on
  }

  if (isHtml(text)) {
    return { ...pingResponse, html: text };
  }

  return pingResponse;
}
