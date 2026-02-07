import { Box, Link, ui } from "@adamjanicki/ui";
import { useEffect } from "react";
import Logo from "src/img/logo.svg?react";

export default function Home() {
  useEffect(() => {
    document.title = "Ping";
  }, []);
  return (
    <Box vfx={{ axis: "y", align: "center", paddingY: "l" }}>
      <Box vfx={{ axis: "x", align: "center", padding: "l" }}>
        <Logo className="spinning" />
        <ui.h1
          className="home-title-text"
          vfx={{ margin: "none", marginLeft: "m" }}
        >
          Ping
        </ui.h1>
      </Box>
      <ui.p
        className="home-description"
        vfx={{ textAlign: "center", paddingX: "l" }}
      >
        Your friendly neighborhood tool for testing API endpoints and URLs,
        delivering real-time responses in JSON, text, or HTML.
      </ui.p>
      <Link vfx={{ fontSize: "m", fontWeight: 5 }} to="/request">
        Get started
      </Link>
    </Box>
  );
}
