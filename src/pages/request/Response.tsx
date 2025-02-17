import { Badge, Button } from "@adamjanicki/ui";
import { assertDefined } from "@adamjanicki/ui/functions";
import { useState } from "react";
import JsonTree from "src/components/JsonTree";
import { classifyCode, getBadgeType } from "src/helpers/codes";
import { PingResponse } from "src/helpers/http";
import CopyButton from "src/pages/CopyButton";

export default function Response({ response }: { response?: PingResponse }) {
  const [showIframe, setShowIframe] = useState(true);

  if (!response) return null;
  const Wrapper = (props: {
    children: React.ReactNode | React.ReactNode[];
  }) => (
    <div
      id="response"
      {...props}
      className="flex flex-column w-100 mt3 br2 ba b--moon-gray"
    />
  );
  let { statusCode, text, json, html, duration, error, url, type } = response;
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
  const info = classifyCode(statusCode);

  let section = <TextResponse>{text}</TextResponse>;
  if (json) section = <JsonResponse>{json}</JsonResponse>;
  else if (html)
    section = <HtmlResponse showIframe={showIframe} url={url} html={html} />;
  else if (type === "img") section = <ImgResponse url={url} />;

  return (
    <Wrapper>
      <div className="flex items-center justify-between pa2 bg-light-gray br2 br--top">
        <span className="flex items-center">
          <Badge type={getBadgeType(info.type)}>
            {statusCode} {info.name}
          </Badge>
          <span className="f6 fw7 mh2">{duration}ms</span>
          <Badge type="info">{typeToLabel[type]}</Badge>
        </span>
        <div className="flex items-center">
          {html && (
            <Button
              style={{ padding: "3px 6px" }}
              className="f6 fw6 mr2"
              variant="secondary"
              onClick={() => setShowIframe(!showIframe)}
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
      {section}
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

function ResponseContentWrapper({ children }: WrapperProps) {
  return (
    <div
      className="pa2 br2 br--bottom bt b--moon-gray"
      style={{ backgroundColor: "#fffcff" }}
    >
      {children}
    </div>
  );
}

function TextResponse({ children }: WrapperProps) {
  return (
    <ResponseContentWrapper>
      <p>{children ? children : "The response was empty."}</p>
    </ResponseContentWrapper>
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
  return (
    <ResponseContentWrapper>
      {showIframe ? (
        <iframe
          title="HTML display"
          src={url}
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          width="100%"
          height="100%"
          className="mv2"
          style={{ minHeight: "40vh", border: "none" }}
        />
      ) : (
        <p>{html.trim()}</p>
      )}
    </ResponseContentWrapper>
  );
}

function JsonResponse({ children }: { children: Object }) {
  return (
    <ResponseContentWrapper>
      <JsonTree className="mv2">{children}</JsonTree>
    </ResponseContentWrapper>
  );
}

function ImgResponse({ url }: { url: string }) {
  return (
    <ResponseContentWrapper>
      <div className="flex justify-center pv2">
        <img src={url} alt="" />
      </div>
    </ResponseContentWrapper>
  );
}
