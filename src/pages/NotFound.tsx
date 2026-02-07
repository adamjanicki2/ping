import { Link, ui } from "@adamjanicki/ui";
import Page from "src/components/Page";

const NotFound = () => (
  <Page title="404">
    <ui.p vfx={{ textAlign: "center", fontSize: "m", fontWeight: 4 }}>
      Oops! The requested page does not exist.
      <ui.br />
      Try going <Link to="/">home</Link>.
    </ui.p>
  </Page>
);

export default NotFound;
