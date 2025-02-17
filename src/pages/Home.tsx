import { useEffect } from "react";
import Link from "src/components/Link";
import { ReactComponent as Logo } from "src/img/logo.svg";

export default function Home() {
  useEffect(() => {
    document.title = "Ping";
  }, []);
  return (
    <div className="flex flex-column items-center pv4">
      <div className="flex items-center pa4">
        <Logo className="spinning" />
        <h1 className="home-title-text ma0 ml3">Ping</h1>
      </div>
      <p className="ph4 tc home-description">
        Your friendly neighborhood tool for testing API endpoints and URLs,
        delivering real-time responses in JSON, text, or HTML.
      </p>
      <Link className="home-description" to="/request">
        Get started
      </Link>
    </div>
  );
}
