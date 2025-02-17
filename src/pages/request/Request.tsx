import { Animated, Button, Input, Select } from "@adamjanicki/ui";
import { useEffect, useMemo, useState } from "react";
import PageWrapper from "src/components/PageWrapper";
import {
  type HttpMethod,
  get,
  post,
  HTTP_METHODS,
  RequestArgs,
  PingResponse,
} from "src/helpers/http";
import useCache from "src/hooks/useCache";
import Accordion from "src/components/Accordion";
import Response from "src/pages/request/Response";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const methodToFunc = {
  GET: get,
  POST: post,
} as const;

const labels = {
  params: "Query parameters",
  body: "Body",
  headers: "Headers",
} as const;

const additionalInputs: Record<HttpMethod, RequestArgs> = {
  GET: { headers: {}, params: {} },
  POST: { body: {}, headers: {}, params: {} },
};

export default function Request() {
  return (
    <PageWrapper title="Request">
      <RequestUi />
    </PageWrapper>
  );
}

function RequestUi() {
  const [showParams, setShowParams] = useState(false);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const { cache, setCache } = useCache();
  const cachedUrl = cache[method] || "";
  const [url, setUrl] = useState(cachedUrl);
  const [response, setResponse] = useState<PingResponse>();
  const reqArgs = additionalInputs[method];
  const [args, setArgs] = useState<RequestArgs>({
    ...reqArgs,
  });
  const [newArgs, setNewArgs] = useState<
    Record<keyof RequestArgs, [string, string]>
  >(
    Object.fromEntries(
      Object.keys(reqArgs).map((key) => [key as any, ["", ""]])
    )
  );

  useEffect(() => {
    setArgs({ ...reqArgs });
    setNewArgs(
      Object.fromEntries(
        Object.keys(reqArgs).map((key) => [key as any, ["", ""]])
      )
    );
  }, [method, reqArgs]);

  const func = methodToFunc[method];

  const doRequest = async () => {
    if (!url.trim()) return;
    const response = await func({ ...args, url });
    setResponse(response);
    setCache(method, url);
  };

  const memoizedResponse = useMemo(
    () => <Response response={response} />,
    // eslint-disable-next-line
    [response?.id]
  );

  return (
    <div className="flex flex-column ph4 request-container">
      <div className="flex flex-wrap justify-center items-center mb3">
        <Select
          className="bg-white mt2"
          options={[...HTTP_METHODS]}
          aria-label="method"
          value={method}
          onChange={(e) => setMethod(e.target.value as HttpMethod)}
          style={{ width: "max-content" }}
        />
        <Input
          style={{ flexGrow: 1 }}
          className="mh2 mt2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              doRequest();
            }
          }}
        />
        <Button
          onClick={doRequest}
          disabled={!url.trim()}
          className="mt2"
          style={{ padding: "12px 16px", whiteSpace: "nowrap" }}
        >
          Send it
        </Button>
      </div>
      <Button
        className="mr2"
        style={{ width: "fit-content" }}
        size="small"
        variant="secondary"
        onClick={() => setShowParams(!showParams)}
      >
        <FontAwesomeIcon icon={showParams ? faChevronDown : faChevronRight} />{" "}
        {showParams ? "Hide config" : "Show config"}
      </Button>
      <Animated
        visible={showParams}
        className="w-100"
        enter={{ style: { opacity: 1 } }}
        exit={{ style: { opacity: 0 } }}
      >
        {Object.entries(args).map(([key, value], i) => {
          const [newArgKey, newArgValue] = newArgs[key as keyof RequestArgs];
          const handleAdd = () => {
            setArgs({
              ...args,
              [key]: {
                ...args[key as keyof RequestArgs],
                [newArgKey]: newArgValue,
              },
            });
            setNewArgs({
              ...newArgs,
              [key]: ["", ""],
            });
          };
          const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && newArgKey && newArgValue) {
              handleAdd();
            }
          };
          return (
            <Accordion
              key={i}
              label={labels[key as keyof typeof labels]}
              divider
            >
              <div className="mb3">
                {Object.entries(value).map(([argKey, argValue], j) => (
                  <div className="mv1" key={j}>
                    <Button
                      className="mr2"
                      size="small"
                      variant="secondary"
                      onClick={() =>
                        setArgs((prev) => {
                          const copy = { ...prev };
                          delete (copy[key as keyof RequestArgs] as any)[
                            argKey
                          ];
                          return copy;
                        })
                      }
                    >
                      Delete
                    </Button>
                    <span className="monospace f5">
                      {argKey} : {argValue}
                    </span>
                  </div>
                ))}
                <div className="flex items-center mv1">
                  <Input
                    placeholder="key"
                    value={newArgKey}
                    onChange={(e) =>
                      setNewArgs({
                        ...newArgs,
                        [key]: [e.target.value, newArgValue],
                      })
                    }
                    onKeyUp={onEnter}
                  />
                  <span className="mh2">:</span>
                  <Input
                    placeholder="value"
                    value={newArgValue}
                    onChange={(e) =>
                      setNewArgs({
                        ...newArgs,
                        [key]: [newArgKey, e.target.value],
                      })
                    }
                    onKeyUp={onEnter}
                  />
                </div>
                <Button
                  className="mt1"
                  disabled={!newArgKey || !newArgValue}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </div>
            </Accordion>
          );
        })}
      </Animated>
      {memoizedResponse}
    </div>
  );
}
