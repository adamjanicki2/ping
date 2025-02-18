import axios, { AxiosResponse } from "axios";
import isHtml from "is-html";

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
  id: string; // randomness for rendering performance things
  url: string;
  error?: Error;
  text?: string;
  statusCode?: number;
  html?: string;
  json?: Object;
  duration?: number;
  type: "error" | "text" | "json" | "html" | "img";
  size?: number;
  responseHeaders?: Record<string, any>;
};

async function httpRequest(config: RequestConfig): Promise<PingResponse> {
  const { method, url, params, body, headers } = config;

  let response: AxiosResponse;
  let duration: number;
  const id = Math.random().toString();

  try {
    const start = performance.now();
    response = await axios({
      method,
      url,
      params,
      headers,
      data: body,
      // Don't error on 4XX or 5XX codes; we'll handle it!
      validateStatus: () => true,
      // 5s timeout
      timeout: 5000,
    });
    const end = performance.now();
    duration = Math.floor(end - start);
  } catch (error: any) {
    return {
      id,
      type: "error",
      url,
      error: new Error(
        `${method} request to ${url} failed with error: ${error.message}`
      ),
    };
  }

  const { status: statusCode, data } = response;
  const responseHeaders = response.headers;

  let size = responseHeaders["content-length"];
  size = size ? (size as number) : undefined;

  const pingResponse = {
    id,
    url,
    statusCode,
    duration,
    text: "",
    size,
    responseHeaders,
  };

  const contentType = responseHeaders["content-type"];
  if (contentType && contentType.startsWith("image/")) {
    return { ...pingResponse, text: url, type: "img" };
  }

  pingResponse.text = typeof data === "string" ? data : JSON.stringify(data);
  if (typeof data === "object") {
    return { ...pingResponse, json: data, type: "json" };
  }

  if (isHtml(pingResponse.text)) {
    return { ...pingResponse, html: pingResponse.text, type: "html" };
  }

  return { ...pingResponse, type: "text" };
}
