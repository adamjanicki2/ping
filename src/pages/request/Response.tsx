import { Badge, Button, UnstyledButton } from "@adamjanicki/ui";
import { assertDefined, classNames } from "@adamjanicki/ui/functions";
import { useState } from "react";
import JsonTree from "src/components/JsonTree";
import { UnstyledLink } from "src/components/Link";
import { classifyCode, getBadgeType } from "src/helpers/codes";
import { PingResponse } from "src/helpers/http";
import CopyButton from "src/pages/CopyButton";
import { formatBytes } from "src/util";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import "src/pages/request/response.css";

export default function Response({ response }: { response?: PingResponse }) {
  const [showIframe, setShowIframe] = useState(true);
  const [showData, setShowData] = useState(true);

  if (!response) return null;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      id="response"
      className="flex flex-column w-100 mt3 br2 ba b--moon-gray"
    >
      {children}
    </div>
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
        <div className="flex items-center pa2 bg-light-gray">
          <Badge type="error">Unknown error</Badge>
        </div>
        <TextResponse>{error.toString()}</TextResponse>
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
      <div className="flex items-center justify-between pa2 bg-light-gray br2 br--top flex-wrap bb b--moon-gray">
        <span className="flex items-center">
          <UnstyledLink to={`/status-codes#${statusCode}`}>
            <Badge type={getBadgeType(info.type)}>
              {statusCode} {info.name}
            </Badge>
          </UnstyledLink>
          <span className="fw7 mh2" style={{ color: "#055437" }}>
            {typeToLabel[type]}
          </span>
          <span className="f6 fw7">{duration}ms</span>
          {size && <span className="f6 fw7 ml2">{formatBytes(size)}</span>}
        </span>
        <div className="flex items-center mv2">
          {html && (
            <Button
              style={{ padding: "3px 6px" }}
              className="f6 fw6 mr2"
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
        </div>
      </div>
      <div
        className="pa2 br2 br--bottom"
        style={{ backgroundColor: "#fffcff" }}
      >
        <div className="flex items-center pb2">
          <UnstyledButton
            className={classNames(
              "response-toggle f6 fw6",
              showData ? "response-toggle-selected" : null
            )}
            onClick={() => setShowData(true)}
          >
            Data
          </UnstyledButton>
          <UnstyledButton
            className={classNames(
              "response-toggle f6 fw6",
              !showData ? "response-toggle-selected" : null
            )}
            onClick={() => setShowData(false)}
          >
            Headers
          </UnstyledButton>
        </div>
        {showData ? section : <JsonResponse>{responseHeaders}</JsonResponse>}
      </div>
    </Wrapper>
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
  return <p>{children ? children : "The response was empty."}</p>;
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
      className="mv2"
      style={{ minHeight: "45vh", border: "none" }}
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
  return <JsonTree className="mv2">{children}</JsonTree>;
}

function ImgResponse({ url }: { url: string }) {
  return (
    <div className="flex justify-center pv2">
      <img src={url} alt="" />
    </div>
  );
}
