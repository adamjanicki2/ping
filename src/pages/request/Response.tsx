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
import JsonTree from "src/components/JsonTree";
import { classifyCode, getBadgeType } from "src/helpers/codes";
import { PingResponse } from "src/helpers/http";
import CopyButton from "src/pages/CopyButton";
import { formatBytes } from "src/util";

export default function Response({ response }: { response?: PingResponse }) {
  const [showIframe, setShowIframe] = useState(true);
  const [showData, setShowData] = useState(true);

  if (!response) return null;

  const {
    statusCode = 0,
    text = "",
    json,
    html,
    duration = 0,
    error,
    url,
    type,
    size,
    responseHeaders = {},
  } = response;

  if (error) {
    return (
      <Wrapper>
        <Box
          vfx={{
            axis: "x",
            align: "center",
            padding: "s",
            backgroundColor: "default",
          }}
        >
          <Badge type="error">Unknown error</Badge>
        </Box>
        <Box vfx={{ padding: "s", backgroundColor: "default" }}>
          <TextResponse>{error.toString()}</TextResponse>
        </Box>
      </Wrapper>
    );
  }

  const info = classifyCode(statusCode);
  const section = json ? (
    <JsonTree>{json}</JsonTree>
  ) : html ? (
    <HtmlResponse showIframe={showIframe} url={url} html={html} />
  ) : type === "img" ? (
    <ImgResponse url={url} />
  ) : (
    <TextResponse>{text}</TextResponse>
  );
  const toggleOptions = [
    { label: "Data", value: true },
    { label: "Headers", value: false },
  ] as const;

  return (
    <Wrapper>
      <Box
        vfx={{
          axis: "x",
          align: "center",
          justify: "between",
          padding: "s",
          wrap: true,
          borderBottom: true,
          backgroundColor: "muted",
        }}
      >
        <Box vfx={{ axis: "x", align: "center", gap: "s", wrap: true }}>
          <UnstyledLink to={`/status-codes#${statusCode}`}>
            <Badge type={getBadgeType(info.type)}>
              {statusCode} {info.name}
            </Badge>
          </UnstyledLink>
          <ui.span vfx={{ fontWeight: 7 }} style={{ color: "#055437" }}>
            {typeToLabel[type]}
          </ui.span>
          <ui.span vfx={{ fontSize: "s", fontWeight: 7 }}>
            {duration}ms
          </ui.span>
          {size && (
            <ui.span vfx={{ fontSize: "s", fontWeight: 7 }}>
              {formatBytes(size)}
            </ui.span>
          )}
        </Box>
        <Box vfx={{ axis: "x", align: "center", gap: "s" }}>
          {html && (
            <Button
              variant="secondary"
              onClick={() => {
                setShowIframe(!showIframe);
                setShowData(true);
              }}
              size="small"
            >
              {showIframe ? "Show raw HTML" : "Show preview"}
            </Button>
          )}
          <CopyButton
            type={
              json ? "JSON" : html ? "HTML" : type === "img" ? "URL" : "text"
            }
          >
            {text || url}
          </CopyButton>
        </Box>
      </Box>
      <Box vfx={{ padding: "s", backgroundColor: "default" }}>
        <Box vfx={{ axis: "x", align: "center", paddingBottom: "s" }}>
          {toggleOptions.map((toggle) => (
            <UnstyledButton
              key={toggle.label}
              className={classNames(
                "response-toggle",
                showData === toggle.value ? "response-toggle-selected" : null,
              )}
              vfx={{ fontSize: "s", fontWeight: 6 }}
              onClick={() => setShowData(toggle.value)}
            >
              {toggle.label}
            </UnstyledButton>
          ))}
        </Box>
        {showData ? section : <JsonTree>{responseHeaders}</JsonTree>}
      </Box>
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <Box
      id="response"
      vfx={{
        axis: "y",
        width: "full",
        border: true,
        radius: "rounded",
        overflow: "hidden",
      }}
    >
      {children}
    </Box>
  );
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
    <ui.iframe
      title="HTML Response"
      src={url}
      sandbox="allow-scripts allow-popups"
      referrerPolicy="no-referrer"
      vfx={{ border: false, width: "full" }}
      style={{ minHeight: "45vh" }}
    />
  ) : (
    <ui.code children={html.trim()} className="html-text" />
  );
}

function ImgResponse({ url }: { url: string }) {
  return (
    <Box vfx={{ axis: "x", justify: "center" }}>
      <ui.img src={url} alt="" />
    </Box>
  );
}
