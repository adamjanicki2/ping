import { Box, ui, useScrollToHash } from "@adamjanicki/ui";
import React from "react";
import Heading from "src/components/Heading";
import Page from "src/components/Page";
import { type StatusCodeEntry, statusCodes } from "src/helpers/codes";

const displayNames = {
  info: "Informational",
  success: "Successful",
  redirect: "Redirect",
  "client-error": "Client Error",
  "server-error": "Server Error",
} as const;

const statusCodeGroups: [string, [string, StatusCodeEntry][]][] = [
  "info",
  "success",
  "redirect",
  "client-error",
  "server-error",
].map((type) => [
  type,
  Object.entries(statusCodes).filter(([, entry]) => entry.type === type),
]);

export default function StatusCodes() {
  useScrollToHash();

  return (
    <Page title="Status Codes">
      <Box vfx={{ width: "full", paddingX: "xxl" }}>
        {statusCodeGroups.map(([type, entries], i) => (
          <React.Fragment key={i}>
            <Heading level={1} id={type}>
              {displayNames[type as keyof typeof displayNames]}
            </Heading>
            {entries.map(([code, statusCodeEntry], j) => (
              <StatusCodeItem
                key={j}
                code={code}
                statusCodeEntry={statusCodeEntry}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
    </Page>
  );
}

type Props = {
  statusCodeEntry: StatusCodeEntry;
  code: number | string;
};
function StatusCodeItem({ statusCodeEntry, code }: Props) {
  const { name, description } = statusCodeEntry;
  return (
    <>
      <Heading level={2} id={`${code}`}>{`${code} - ${name}`}</Heading>
      <ui.p vfx={{ margin: "none", marginBottom: "s" }}>{description}</ui.p>
    </>
  );
}
