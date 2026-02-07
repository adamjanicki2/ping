import { ui } from "@adamjanicki/ui";
import Box from "@adamjanicki/ui/components/Box/Box";
import { classNames } from "@adamjanicki/ui/functions";
import { useDocumentTitle } from "src/hooks";
import type { Children } from "src/types";

type Props = {
  children: Children;
  title: string;
  documentTitle?: string;
  titleClass?: string;
};

const PageWrapper = ({
  children,
  title,
  documentTitle,
  titleClass = "",
}: Props) => {
  useDocumentTitle(`${documentTitle ?? title} | Ping`);

  return (
    <Box
      vfx={{ axis: "y", align: "center", width: "full", paddingBottom: "xl" }}
      style={{ minHeight: "70vh" }}
    >
      <ui.h1
        vfx={{ textAlign: "center" }}
        className={classNames("page-title-text", titleClass)}
        style={{ whiteSpace: "wrap", wordBreak: "break-word" }}
      >
        {title}
      </ui.h1>
      {children}
    </Box>
  );
};

export default PageWrapper;
