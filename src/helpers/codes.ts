import { ContentType } from "@adamjanicki/ui/types";

export type HttpCodeType =
  | "info"
  | "success"
  | "redirect"
  | "client-error"
  | "server-error"
  | "unknown";

export type StatusCodeEntry = {
  name: string;
  description: string;
  type: HttpCodeType;
};

export const statusCodes: Record<number, StatusCodeEntry> = {
  100: {
    name: "Continue",
    description:
      "The server has received the request headers and the client should proceed to send the request body.",
    type: "info",
  },
  101: {
    name: "Switching Protocols",
    description:
      "The requester has asked the server to switch protocols, and the server agrees.",
    type: "info",
  },
  102: {
    name: "Processing",
    description:
      "The server has received and is processing the request, but no response is available yet.",
    type: "info",
  },
  103: {
    name: "Early Hints",
    description:
      "Provides headers to help the client preload resources before the final response.",
    type: "info",
  },

  // 2XX - Success
  200: {
    name: "OK",
    description: "The request has succeeded.",
    type: "success",
  },
  201: {
    name: "Created",
    description:
      "The request has succeeded and a new resource has been created.",
    type: "success",
  },
  202: {
    name: "Accepted",
    description:
      "The request has been accepted for processing, but the processing is not complete.",
    type: "success",
  },
  203: {
    name: "Non-Authoritative Information",
    description:
      "The request was successful, but the response is modified from a third-party source.",
    type: "success",
  },
  204: {
    name: "No Content",
    description:
      "The request was successful, but there is no content in the response.",
    type: "success",
  },
  205: {
    name: "Reset Content",
    description:
      "The request was successful, and the client should reset its view.",
    type: "success",
  },
  206: {
    name: "Partial Content",
    description:
      "The server is returning part of the resource due to a range request.",
    type: "success",
  },
  207: {
    name: "Multi-Status",
    description:
      "The response provides multiple status codes for multiple operations.",
    type: "success",
  },
  208: {
    name: "Already Reported",
    description: "The resource has already been reported in this response.",
    type: "success",
  },
  226: {
    name: "IM Used",
    description:
      "The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.",
    type: "success",
  },

  // 3XX - Redirection
  300: {
    name: "Multiple Choices",
    description: "There are multiple options for the requested resource.",
    type: "redirect",
  },
  301: {
    name: "Moved Permanently",
    description: "The resource has been permanently moved to a new URL.",
    type: "redirect",
  },
  302: {
    name: "Found",
    description: "The resource is temporarily located at a different URL.",
    type: "redirect",
  },
  303: {
    name: "See Other",
    description: "The response should be retrieved from another URL.",
    type: "redirect",
  },
  304: {
    name: "Not Modified",
    description: "The resource has not changed since the last request.",
    type: "redirect",
  },
  305: {
    name: "Use Proxy",
    description: "The requested resource must be accessed through a proxy.",
    type: "redirect",
  },
  307: {
    name: "Temporary Redirect",
    description:
      "The request should be repeated at another URL, but the method must remain the same.",
    type: "redirect",
  },
  308: {
    name: "Permanent Redirect",
    description: "The request should be repeated at another URL permanently.",
    type: "redirect",
  },

  // 4XX - Client Errors
  400: {
    name: "Bad Request",
    description:
      "The server could not understand the request due to invalid syntax.",
    type: "client-error",
  },
  401: {
    name: "Unauthorized",
    description:
      "The client must authenticate itself to get the requested response.",
    type: "client-error",
  },
  402: {
    name: "Payment Required",
    description: "This response code is reserved for future use.",
    type: "client-error",
  },
  403: {
    name: "Forbidden",
    description: "The client does not have access rights to the content.",
    type: "client-error",
  },
  404: {
    name: "Not Found",
    description: "The server can not find the requested resource.",
    type: "client-error",
  },
  405: {
    name: "Method Not Allowed",
    description:
      "The request method is known by the server but is not supported by the target resource.",
    type: "client-error",
  },
  406: {
    name: "Not Acceptable",
    description:
      "The server cannot produce a response matching the list of acceptable values defined in the request's proactive content negotiation headers.",
    type: "client-error",
  },
  407: {
    name: "Proxy Authentication Required",
    description: "The client must authenticate itself with the proxy.",
    type: "client-error",
  },
  408: {
    name: "Request Timeout",
    description: "The server would like to shut down this unused connection.",
    type: "client-error",
  },
  409: {
    name: "Conflict",
    description: "The request conflicts with the current state of the server.",
    type: "client-error",
  },
  410: {
    name: "Gone",
    description:
      "The requested content has been permanently deleted from the server.",
    type: "client-error",
  },
  411: {
    name: "Length Required",
    description:
      "The server refuses to accept the request without a defined Content-Length header.",
    type: "client-error",
  },
  412: {
    name: "Precondition Failed",
    description:
      "The client has indicated preconditions in its headers which the server does not meet.",
    type: "client-error",
  },
  413: {
    name: "Payload Too Large",
    description:
      "The request entity is larger than the server is willing or able to process.",
    type: "client-error",
  },
  414: {
    name: "URI Too Long",
    description:
      "The URI requested by the client is longer than the server is willing to interpret.",
    type: "client-error",
  },
  415: {
    name: "Unsupported Media Type",
    description:
      "The media format of the requested data is not supported by the server.",
    type: "client-error",
  },
  416: {
    name: "Range Not Satisfiable",
    description:
      "The range specified by the Range header field in the request cannot be fulfilled.",
    type: "client-error",
  },
  417: {
    name: "Expectation Failed",
    description:
      "The server cannot meet the requirements of the Expect request-header field.",
    type: "client-error",
  },
  418: {
    name: "I'm a teapot",
    description:
      "The server refuses to brew coffee because it is, permanently, a teapot.",
    type: "client-error",
  },
  421: {
    name: "Misdirected Request",
    description:
      "The request was directed at a server that is not able to produce a response.",
    type: "client-error",
  },
  422: {
    name: "Unprocessable Entity",
    description:
      "The server understands the content type of the request entity, but was unable to process the contained instructions.",
    type: "client-error",
  },
  423: {
    name: "Locked",
    description: "The resource that is being accessed is locked.",
    type: "client-error",
  },
  424: {
    name: "Failed Dependency",
    description:
      "The request failed because it depended on another request and that request failed.",
    type: "client-error",
  },
  425: {
    name: "Too Early",
    description:
      "Indicates that the server is unwilling to risk processing a request that might be replayed.",
    type: "client-error",
  },
  426: {
    name: "Upgrade Required",
    description: "The client should switch to a different protocol.",
    type: "client-error",
  },
  428: {
    name: "Precondition Required",
    description: "The server requires the request to be conditional.",
    type: "client-error",
  },
  429: {
    name: "Too Many Requests",
    description:
      "The user has sent too many requests in a given amount of time.",
    type: "client-error",
  },
  431: {
    name: "Request Header Fields Too Large",
    description:
      "The server is unwilling to process the request because its header fields are too large.",
    type: "client-error",
  },
  451: {
    name: "Unavailable For Legal Reasons",
    description:
      "The server is denying access to the resource as a consequence of a legal demand.",
    type: "client-error",
  },

  // 5XX - Server Errors
  500: {
    name: "Internal Server Error",
    description:
      "The server encountered an unexpected condition that prevented it from fulfilling the request.",
    type: "server-error",
  },
  501: {
    name: "Not Implemented",
    description:
      "The server does not support the functionality required to fulfill the request.",
    type: "server-error",
  },
  502: {
    name: "Bad Gateway",
    description:
      "The server, while acting as a gateway or proxy, received an invalid response from the upstream server.",
    type: "server-error",
  },
  503: {
    name: "Service Unavailable",
    description:
      "The server is currently unable to handle the request due to temporary overloading or maintenance.",
    type: "server-error",
  },
  504: {
    name: "Gateway Timeout",
    description:
      "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
    type: "server-error",
  },
  505: {
    name: "HTTP Version Not Supported",
    description:
      "The server does not support the HTTP protocol version used in the request.",
    type: "server-error",
  },
  506: {
    name: "Variant Also Negotiates",
    description:
      "Transparent content negotiation for the request results in a circular reference.",
    type: "server-error",
  },
  507: {
    name: "Insufficient Storage",
    description:
      "The server is unable to store the representation needed to complete the request.",
    type: "server-error",
  },
  508: {
    name: "Loop Detected",
    description:
      "The server detected an infinite loop while processing the request.",
    type: "server-error",
  },
  510: {
    name: "Not Extended",
    description:
      "Further extensions to the request are required for the server to fulfill it.",
    type: "server-error",
  },
  511: {
    name: "Network Authentication Required",
    description: "The client needs to authenticate to gain network access.",
    type: "server-error",
  },
};

export function classifyCode(code: number): StatusCodeEntry {
  return (
    statusCodes[code] ?? {
      name: "Unknown status code",
      description:
        "We've never seen this status code before, so who knows what it means. ¯_(ツ)_/¯",
      type: "unknown",
    }
  );
}

export function getBadgeType(type: HttpCodeType): ContentType {
  switch (type) {
    case "client-error":
    case "server-error":
    case "unknown":
      return "error";
    case "info":
    case "success":
      return type;
    case "redirect":
      return "info";
    default:
      throw new Error();
  }
}
