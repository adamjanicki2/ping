import { Badge } from "@adamjanicki/ui";
import { assertDefined } from "@adamjanicki/ui/functions";
import { useState } from "react";
import JsonTree from "src/components/JsonTree";
import { classifyCode, getBadgeType } from "src/helpers/codes";
import { PingResponse } from "src/helpers/http";
import CopyButton from "src/pages/CopyButton";

export default function Response({ response }: { response?: PingResponse }) {
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
  let { statusCode, text, json, html, duration, error, url } = response;
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
  else if (html) section = <HtmlResponse url={url} html={html} />;

  return (
    <Wrapper>
      <div className="flex items-center justify-between pa2 bg-light-gray br2 br--top">
        <span className="flex items-center">
          <Badge type={getBadgeType(info.type)}>
            {statusCode} {info.name}
          </Badge>
          <span className="f6 fw7 ml2">{duration}ms</span>
        </span>
        <CopyButton text={text} type={json ? "JSON" : html ? "HTML" : "TEXT"} />
      </div>
      {section}
    </Wrapper>
  );
}

type WrapperProps = {
  children: React.ReactNode;
  label?: string;
};

function ResponseContentWrapper({ children, label }: WrapperProps) {
  return (
    <div
      className="pa2 br2 br--bottom bt b--moon-gray"
      style={{ backgroundColor: "#fffcff" }}
    >
      {label && (
        <Badge className="mb2" type="static">
          {label}
        </Badge>
      )}
      {children}
    </div>
  );
}

function TextResponse({ children }: WrapperProps) {
  return (
    <ResponseContentWrapper label="TEXT">
      <p>{children}</p>
    </ResponseContentWrapper>
  );
}

function HtmlResponse({ url, html }: { url: string; html: string }) {
  const [showIframe] = useState(true);
  return (
    <ResponseContentWrapper label="HTML">
      {showIframe ? (
        <iframe
          src={url}
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          width="100%"
          height="100%"
          className="mv2"
          style={{ minHeight: "40vh", border: "none" }}
        />
      ) : (
        <p>{html}</p>
      )}
    </ResponseContentWrapper>
  );
}

function JsonResponse({ children }: { children: Object }) {
  return (
    <ResponseContentWrapper label="JSON">
      <JsonTree className="mv2">{children}</JsonTree>
    </ResponseContentWrapper>
  );
}
