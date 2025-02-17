import Link from "src/components/Link";
import PageWrapper from "src/components/PageWrapper";

export default function About() {
  return (
    <PageWrapper title="About">
      <p className="f5 fw4 w-70 mt0">
        <h1>Welcome to Ping!</h1>
        This is a site where you can play around with making <code>
          HTTP
        </code>{" "}
        requests to test your own API endpoints, sites, or whatever you find
        useful. There are a lot of times I want to test something without making
        a complex curl statement, so this will help you do the same but much
        easier!
        <h1>How to use</h1>
        Using the site is simple, on the <Link to="/request">request page</Link>
        , you will see all the tools you need to make your first request. To
        start, select your <code>HTTP</code> method, e.g.{" "}
        <code>GET, POST, PATCH</code> (we'll see which ones I actually support
        for safety reasons).
        <br />
        <br />
        Once you have your method selected, you'll be able to enter in all of
        the request-specific info, including the URL target, and any request
        parameters, body, and headers you'd like to add. You'll be able to view
        the response along with any relevant info once the response returns.
        <h1>Viewing response</h1>
        As I mentioned above, once the request is fired and a response is
        returned, you'll be able to to view returned content including the
        status code, response body, and any important headers returned.
      </p>
    </PageWrapper>
  );
}
