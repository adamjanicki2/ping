import { Link, ui } from "@adamjanicki/ui";
import PageWrapper from "src/components/PageWrapper";

const NotFound = () => (
  <PageWrapper title="404">
    <ui.p vfx={{ textAlign: "center", fontSize: "m", fontWeight: 4 }}>
      Oops! The requested page does not exist.
      <br />
      Try going <Link to="/">home</Link>.
    </ui.p>
  </PageWrapper>
);

export default NotFound;
