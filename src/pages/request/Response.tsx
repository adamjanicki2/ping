import "src/pages/request/response.css";

import {
  Badge,
  Box,
  Button,
  ui,
  UnstyledButton,
  UnstyledLink,
} from "@adamjanicki/ui";
import { classNames } from "@adamjanicki/ui/functions";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import JsonTree from "src/components/JsonTree";
import { classifyCode, getBadgeType } from "src/helpers/codes";
import { PingResponse } from "src/helpers/http";
import CopyButton from "src/pages/CopyButton";
import { formatBytes } from "src/util";

export default function Response({ response }: { response?: PingResponse }) {
  const [showIframe, setShowIframe] = useState(true);
  const [showData, setShowData] = useState(true);

  if (!response) return null;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Box
      id="response"
      vfx={{ axis: "y", width: "full", marginTop: "m" }}
      style={{
        border: "1px solid #d6d6d6",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );

  let {
    statusCode,
    text,
    json,
    html,
    duration,
    error,
    url,
    type,
    size,
    responseHeaders,
  } = response;

  if (error) {
    return (
      <Wrapper>
        <Box
          vfx={{ axis: "x", align: "center", padding: "s" }}
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <Badge type="error">Unknown error</Badge>
        </Box>
        <Box vfx={{ padding: "s" }} style={{ backgroundColor: "#fffcff" }}>
          <TextResponse>{error.toString()}</TextResponse>
        </Box>
      </Wrapper>
    );
  }

  statusCode = assertDefined(statusCode);
  duration = assertDefined(duration);
  text = assertDefined(text);
  responseHeaders = assertDefined(responseHeaders);
  const info = classifyCode(statusCode);

  let section = <TextResponse>{text}</TextResponse>;
  if (json) section = <JsonResponse>{json}</JsonResponse>;
  else if (html)
    section = <HtmlResponse showIframe={showIframe} url={url} html={html} />;
  else if (type === "img") section = <ImgResponse url={url} />;

  return (
    <Wrapper>
      <Box
        vfx={{
          axis: "x",
          align: "center",
          justify: "between",
          padding: "s",
          wrap: true,
        }}
        style={{
          backgroundColor: "#f1f1f1",
          borderBottom: "1px solid #d6d6d6",
        }}
      >
        <Box vfx={{ axis: "x", align: "center", wrap: true }}>
          <UnstyledLink to={`/status-codes#${statusCode}`}>
            <Badge type={getBadgeType(info.type)}>
              {statusCode} {info.name}
            </Badge>
          </UnstyledLink>
          <ui.span
            vfx={{ fontWeight: 7, marginLeft: "s", marginRight: "s" }}
            style={{ color: "#055437" }}
          >
            {typeToLabel[type]}
          </ui.span>
          <ui.span vfx={{ fontSize: "s", fontWeight: 7 }}>{duration}ms</ui.span>
          {size && (
            <ui.span vfx={{ fontSize: "s", fontWeight: 7, marginLeft: "s" }}>
              {formatBytes(size)}
            </ui.span>
          )}
        </Box>
        <Box vfx={{ axis: "x", align: "center", marginY: "xs" }}>
          {html && (
            <Button
              style={{ padding: "3px 6px" }}
              vfx={{ fontSize: "s", fontWeight: 6, marginRight: "s" }}
              variant="secondary"
              onClick={() => {
                setShowIframe(!showIframe);
                setShowData(true);
              }}
            >
              {showIframe ? "Show raw HTML" : "Show preview"}
            </Button>
          )}
          <CopyButton
            text={text || url}
            type={
              json ? "JSON" : html ? "HTML" : type === "img" ? "URL" : "text"
            }
          />
        </Box>
      </Box>
      <Box vfx={{ padding: "s" }} style={{ backgroundColor: "#fffcff" }}>
        <Box vfx={{ axis: "x", align: "center", paddingBottom: "s" }}>
          <UnstyledButton
            className={classNames(
              "response-toggle",
              showData ? "response-toggle-selected" : null,
            )}
            vfx={{ fontSize: "s", fontWeight: 6 }}
            onClick={() => setShowData(true)}
          >
            Data
          </UnstyledButton>
          <UnstyledButton
            className={classNames(
              "response-toggle",
              !showData ? "response-toggle-selected" : null,
            )}
            vfx={{ fontSize: "s", fontWeight: 6 }}
            onClick={() => setShowData(false)}
          >
            Headers
          </UnstyledButton>
        </Box>
        {showData ? section : <JsonResponse>{responseHeaders}</JsonResponse>}
      </Box>
    </Wrapper>
  );
}

function assertDefined<T>(value: T | undefined): T {
  return value as T;
}

const typeToLabel = {
  img: "IMG",
  text: "TEXT",
  json: "JSON",
  html: "HTML",
  error: undefined,
} as const;

type WrapperProps = {
  children: React.ReactNode;
};

function TextResponse({ children }: WrapperProps) {
  return (
    <ui.p vfx={{ margin: "none" }}>
      {children ? children : "The response was empty."}
    </ui.p>
  );
}

function HtmlResponse({
  url,
  html,
  showIframe,
}: {
  url: string;
  html: string;
  showIframe: boolean;
}) {
  return showIframe ? (
    <iframe
      title="HTML display"
      src={url}
      sandbox="allow-scripts allow-popups"
      referrerPolicy="no-referrer"
      width="100%"
      height="100%"
      style={{
        minHeight: "45vh",
        border: "none",
        marginTop: 8,
        marginBottom: 8,
      }}
    />
  ) : (
    <SyntaxHighlighter
      children={html.trim()}
      language="html"
      customStyle={{
        background: "none",
        backgroundColor: "transparent",
        padding: 0,
        margin: 0,
      }}
      className="html-tree monospace"
    />
  );
}

function JsonResponse({ children }: { children: object }) {
  return (
    <Box vfx={{ marginY: "s" }}>
      <JsonTree>{children}</JsonTree>
    </Box>
  );
}

function ImgResponse({ url }: { url: string }) {
  return (
    <Box vfx={{ axis: "x", justify: "center", paddingY: "s" }}>
      <img src={url} alt="" />
    </Box>
  );
}
