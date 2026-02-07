import {
  Accordion,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  Select,
  ui,
  useSearchParams,
} from "@adamjanicki/ui";
import { xCircle } from "@adamjanicki/ui/icons";
import { useEffect, useState } from "react";
import Page from "src/components/Page";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const originalUrl = searchParams.target as string;
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(originalUrl || "");
  const [response, setResponse] = useState<PingResponse>();
  const reqArgs = additionalInputs[method];
  const [openDrawers, setOpenDrawers] = useState<
    Record<keyof RequestArgs, boolean>
  >(
    Object.fromEntries(
      Object.keys(reqArgs).map((key) => [key as any, false]),
    ) as Record<keyof RequestArgs, boolean>,
  );
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
    setOpenDrawers(
      Object.fromEntries(
        Object.keys(nextReqArgs).map((key) => [key as any, false]),
      ) as Record<keyof RequestArgs, boolean>,
    );
  };

  return (
    <Page
      title="Request"
      vfx={{ marginX: "auto", paddingX: "l", gap: "m" }}
      className="w-70-100"
    >
      <Box
        vfx={{
          axis: "x",
          wrap: true,
          justify: "center",
          align: "center",
          width: "full",
          gap: "s",
        }}
      >
        <Select
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
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              doRequest();
            }
          }}
          vfx={{ stretch: "grow" }}
        />
        <Button onClick={doRequest} disabled={!url.trim()}>
          Send it
        </Button>
      </Box>
      <Accordion
        vfx={{ width: "full" }}
        drawers={(
          Object.entries(args) as [keyof RequestArgs, Record<string, string>][]
        ).map(([key, value]) => {
          const [newArgKey, newArgValue] = newArgs[key];
          const handleAdd = () => {
            setArgs({
              ...args,
              [key]: {
                ...args[key],
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
          return {
            label: labels[key as keyof typeof labels],
            open: openDrawers[key],
            onOpenChange: (open) =>
              setOpenDrawers((prev) => ({ ...prev, [key]: open })),
            content: (
              <Box
                vfx={{
                  axis: "y",
                  gap: "s",
                  paddingX: "m",
                  paddingBottom: "m",
                }}
              >
                {Object.entries(value).map(([argKey, argValue], j) => (
                  <Badge
                    type="static"
                    vfx={{
                      axis: "x",
                      align: "center",
                      gap: "xs",
                      radius: "max",
                    }}
                    key={j}
                  >
                    <IconButton
                      icon={xCircle}
                      onClick={() =>
                        setArgs((prev) => {
                          const copy = { ...prev };
                          delete (copy[key] as any)[argKey];
                          return copy;
                        })
                      }
                      aria-label="delete"
                    />
                    <ui.span
                      className="monospace"
                      vfx={{ fontSize: "s" }}
                      style={{ overflowWrap: "break-word" }}
                    >
                      {argKey} : {argValue}
                    </ui.span>
                  </Badge>
                ))}
                <Box vfx={{ axis: "x", align: "center", gap: "s", wrap: true }}>
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
                </Box>
                <Button
                  vfx={{ width: "fit" }}
                  disabled={!newArgKey || !newArgValue}
                  onClick={handleAdd}
                >
                  Add
                </Button>
              </Box>
            ),
          };
        })}
      />
      <Response response={response} />
    </Page>
  );
}
