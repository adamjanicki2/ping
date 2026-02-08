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

type ArgKey = keyof RequestArgs;
type ArgValues = Record<string, string>;
type NewArgState = Record<ArgKey, [string, string]>;
type DrawerState = Record<ArgKey, boolean>;

const getKeys = (args: RequestArgs) => Object.keys(args) as ArgKey[];
const initNewArgs = (keys: ArgKey[]): NewArgState =>
  Object.fromEntries(keys.map((key) => [key, ["", ""]])) as NewArgState;
const initOpenDrawers = (keys: ArgKey[]): DrawerState =>
  Object.fromEntries(keys.map((key) => [key, false])) as DrawerState;
const entries = <T extends object>(obj: T) =>
  Object.entries(obj) as Array<[keyof T, T[keyof T]]>;

export default function Request() {
  const [searchParams, setSearchParams] = useSearchParams();
  const originalUrl = searchParams.target as string;
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [url, setUrl] = useState(originalUrl || "");
  const [response, setResponse] = useState<PingResponse>();
  const reqArgs = additionalInputs[method];
  const [args, setArgs] = useState<RequestArgs>({ ...reqArgs });
  const [newArgs, setNewArgs] = useState<NewArgState>(
    initNewArgs(getKeys(reqArgs)),
  );
  const [openDrawers, setOpenDrawers] = useState<DrawerState>(
    initOpenDrawers(getKeys(reqArgs)),
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
    const keys = getKeys(nextReqArgs);
    setArgs({ ...nextReqArgs });
    setNewArgs(initNewArgs(keys));
    setOpenDrawers(initOpenDrawers(keys));
  };

  const updateNewArgs = (key: ArgKey, next: [string, string]) =>
    setNewArgs((prev) => ({ ...prev, [key]: next }));

  const addArg = (key: ArgKey) => {
    const [newKey, newValue] = newArgs[key];
    if (!newKey || !newValue) return;
    setArgs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [newKey]: newValue,
      },
    }));
    updateNewArgs(key, ["", ""]);
  };

  const deleteArg = (key: ArgKey, argKey: string) =>
    setArgs((prev) => {
      const next = {
        ...prev,
        [key]: { ...prev[key] },
      };
      delete (next[key] as ArgValues)[argKey];
      return next;
    });

  const setDrawerOpen = (key: ArgKey, open: boolean) =>
    setOpenDrawers((prev) => ({ ...prev, [key]: open }));

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
        drawers={entries(args).map(([key, value]) => {
          const argKey = key;
          const argValue = value as ArgValues;
          const [newArgKey, newArgValue] = newArgs[argKey];
          const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") addArg(argKey);
          };
          return {
            label: labels[argKey],
            open: openDrawers[argKey],
            onOpenChange: (open) => setDrawerOpen(argKey, open),
            content: (
              <Box
                vfx={{
                  axis: "y",
                  gap: "s",
                  paddingX: "m",
                  paddingBottom: "m",
                }}
              >
                {entries(argValue).map(([key, value]) => (
                  <Badge
                    key={key}
                    type="static"
                    vfx={{
                      axis: "x",
                      align: "center",
                      gap: "xs",
                      radius: "max",
                    }}
                  >
                    <IconButton
                      icon={xCircle}
                      onClick={() => deleteArg(argKey, key)}
                      aria-label="delete"
                    />
                    <ui.span
                      className="monospace"
                      vfx={{ fontSize: "s" }}
                      style={{ overflowWrap: "break-word" }}
                    >
                      {key} : {value}
                    </ui.span>
                  </Badge>
                ))}
                <Box vfx={{ axis: "x", align: "center", gap: "s", wrap: true }}>
                  <Input
                    placeholder="key"
                    value={newArgKey}
                    onChange={(e) =>
                      updateNewArgs(argKey, [e.target.value, newArgValue])
                    }
                    onKeyUp={onEnter}
                  />
                  <Input
                    placeholder="value"
                    value={newArgValue}
                    onChange={(e) =>
                      updateNewArgs(argKey, [newArgKey, e.target.value])
                    }
                    onKeyUp={onEnter}
                  />
                </Box>
                <Button
                  vfx={{ width: "fit" }}
                  disabled={!newArgKey || !newArgValue}
                  onClick={() => addArg(argKey)}
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
