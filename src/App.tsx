import { Route, Router, Routes, useScrollToHash } from "@adamjanicki/ui";
import Footer from "src/components/Footer";
import Nav from "src/components/Nav";
import About from "src/pages/About";
import Home from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import Request from "src/pages/request/Request";
import StatusCodes from "src/pages/StatusCodes";

const App = () => {
  useScrollToHash();
  return (
    <Router basename="/ping">
      <Nav />
      <Routes fallback={<NotFound />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route path="/status-codes" element={<StatusCodes />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
