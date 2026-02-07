import {
  Animated,
  Box,
  Button,
  Icon,
  Input,
  Select,
  ui,
  useSearchParams,
} from "@adamjanicki/ui";
import { chevronDown, chevronRight } from "@adamjanicki/ui/icons";
import { useEffect, useState } from "react";
import Accordion from "src/components/Accordion";
import PageWrapper from "src/components/PageWrapper";
import {
  get,
  HTTP_METHODS,
  type HttpMethod,
  PingResponse,
  post,
  RequestArgs,
} from "src/helpers/http";
import Response from "src/pages/request/Response";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const originalUrl = searchParams.target as string;
  const [showParams, setShowParams] = useState(false);
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(originalUrl || "");
  const [response, setResponse] = useState<PingResponse>();
  const reqArgs = additionalInputs[method];
  const [args, setArgs] = useState<RequestArgs>({
    ...reqArgs,
  });
  const [newArgs, setNewArgs] = useState<
    Record<keyof RequestArgs, [string, string]>
  >(
    Object.fromEntries(
      Object.keys(reqArgs).map((key) => [key as any, ["", ""]]),
    ),
  );

  const func = methodToFunc[method];

  useEffect(() => {
    if (originalUrl?.trim()) {
      func({ ...args, url: originalUrl }).then(setResponse);
    }
    // eslint-disable-next-line
  }, [originalUrl]);

  const doRequest = async () => {
    if (!url.trim()) return;
    setSearchParams((prev) => ({ ...prev, target: url }));
  };

  const resetArgsForMethod = (nextMethod: HttpMethod) => {
    const nextReqArgs = additionalInputs[nextMethod];
    setArgs({ ...nextReqArgs });
    setNewArgs(
      Object.fromEntries(
        Object.keys(nextReqArgs).map((key) => [key as any, ["", ""]]),
      ),
    );
  };

  return (
    <Box className="request-container" vfx={{ axis: "y", paddingX: "l" }}>
      <Box
        vfx={{
          axis: "x",
          wrap: true,
          justify: "center",
          align: "center",
          marginBottom: "m",
        }}
      >
        <Select
          style={{ backgroundColor: "white", width: "max-content" }}
          vfx={{ marginTop: "s" }}
          options={[...HTTP_METHODS]}
          aria-label="method"
          value={method}
          onSelect={(value) => {
            setMethod(value);
            resetArgsForMethod(value);
            setSearchParams({});
          }}
        />
        <Input
          style={{ flexGrow: 1 }}
          vfx={{ marginLeft: "s", marginRight: "s", marginTop: "s" }}
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
          vfx={{ marginTop: "s" }}
          style={{ padding: "12px 16px", whiteSpace: "nowrap" }}
        >
          Send it
        </Button>
      </Box>
      <Button
        vfx={{ marginRight: "s" }}
        style={{ width: "fit-content", whiteSpace: "nowrap" }}
        size="small"
        variant="secondary"
        onClick={() => setShowParams(!showParams)}
      >
        <Icon icon={showParams ? chevronDown : chevronRight} />
        {showParams ? "Hide config" : "Show config"}
      </Button>
      <Animated
        visible={showParams}
        style={{ width: "100%" }}
        to={{ opacity: 1 }}
        from={{ opacity: 0 }}
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
              <Box vfx={{ marginBottom: "m" }}>
                {Object.entries(value).map(([argKey, argValue], j) => (
                  <Box vfx={{ marginY: "xs" }} key={j}>
                    <Button
                      vfx={{ marginRight: "s" }}
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
                    <ui.span
                      className="monospace"
                      vfx={{ fontSize: "s" }}
                      style={{ overflowWrap: "break-word" }}
                    >
                      {argKey} : {argValue}
                    </ui.span>
                  </Box>
                ))}
                <Box
                  vfx={{
                    axis: "x",
                    align: "center",
                    wrap: true,
                    marginY: "xs",
                  }}
                >
                  <Input
                    placeholder="key"
                    value={newArgKey}
                    onChange={(e) =>
                      setNewArgs({
                        ...newArgs,
                        [key]: [e.target.value, newArgValue],
                      })
                    }
                    className="mobile-w-100"
                    vfx={{ marginY: "xs" }}
                    onKeyUp={onEnter}
                  />
                  <ui.span
                    className="desktop"
                    vfx={{ marginLeft: "s", marginRight: "s" }}
                  >
                    :
                  </ui.span>
                  <Input
                    placeholder="value"
                    value={newArgValue}
                    onChange={(e) =>
                      setNewArgs({
                        ...newArgs,
                        [key]: [newArgKey, e.target.value],
                      })
                    }
                    className="mobile-w-100"
                    vfx={{ marginY: "xs" }}
                    onKeyUp={onEnter}
                  />
                </Box>
                <Button
                  disabled={!newArgKey || !newArgValue}
                  onClick={handleAdd}
                  vfx={{ marginTop: "xs" }}
                >
                  Add
                </Button>
              </Box>
            </Accordion>
          );
        })}
      </Animated>
      <Response response={response} />
    </Box>
  );
}
