import { Box, Link, ui } from "@adamjanicki/ui";
import PageWrapper from "src/components/PageWrapper";

export default function About() {
  return (
    <PageWrapper title="About">
      <Box className="about-content" vfx={{ axis: "y", gap: "m" }}>
        <ui.h2 vfx={{ margin: "none" }}>Welcome to Ping!</ui.h2>
        <ui.p vfx={{ margin: "none", fontWeight: 4 }}>
          This is a site where you can play around with making <code>HTTP</code>{" "}
          requests to test your own API endpoints, sites, or whatever you find
          useful. There are a lot of times I want to test something without
          making a complex curl statement, so this will help you do the same but
          much easier!
        </ui.p>
        <ui.h2 vfx={{ margin: "none" }}>How to use</ui.h2>
        <ui.p vfx={{ margin: "none", fontWeight: 4 }}>
          Using the site is simple. On the{" "}
          <Link to="/request">request page</Link>, you will see all the tools
          you need to make your first request. To start, select your{" "}
          <code>HTTP</code> method, e.g. <code>GET, POST, PATCH</code> (we'll
          see which ones I actually support for safety reasons).
        </ui.p>
        <ui.p vfx={{ margin: "none", fontWeight: 4 }}>
          Once you have your method selected, you'll be able to enter in all of
          the request-specific info, including the URL target, and any request
          parameters, body, and headers you'd like to add. You'll be able to
          view the response along with any relevant info once the response
          returns.
        </ui.p>
        <ui.h2 vfx={{ margin: "none" }}>Viewing response</ui.h2>
        <ui.p vfx={{ margin: "none", fontWeight: 4 }}>
          As I mentioned above, once the request is fired and a response is
          returned, you'll be able to view returned content including the status
          code, response body, and any important headers returned.
        </ui.p>
      </Box>
    </PageWrapper>
  );
}
