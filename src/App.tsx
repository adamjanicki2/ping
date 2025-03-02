import { useScrollToHash } from "@adamjanicki/ui";
import { BrowserRouter, Route, Routes } from "react-router";
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
    <BrowserRouter basename="/ping">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/request" element={<Request />} />
        <Route path="/status-codes" element={<StatusCodes />} />
        {/* Make sure this is the last route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
