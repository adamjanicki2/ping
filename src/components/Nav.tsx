import "src/components/nav.css";

import {
  Box,
  Link,
  TripleFade as Hamburger,
  ui,
  UnstyledLink,
  useLocation,
} from "@adamjanicki/ui";
import { useEffect, useState } from "react";
import Logo from "src/img/logo.svg?react";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
};

const Nav = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const Navlink = (props: NavlinkProps) => (
    <li className="navlink-li">
      <Link className="navlink" onClick={closeMenu} {...props} />
    </li>
  );

  return (
    <ui.nav
      className="nav"
      vfx={{ axis: "x", align: "center", justify: "between", paddingY: "s" }}
      style={{ paddingLeft: 24, paddingRight: 24 }}
    >
      <Box
        vfx={{ axis: "x", align: "center", justify: "between", width: "full" }}
        className="bar-container"
      >
        <UnstyledLink
          className="nav-title"
          to="/"
          vfx={{ axis: "x", align: "center" }}
        >
          <Logo height="36px" />
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <ui.ul
        className="desktop link-container"
        vfx={{ axis: "x", align: "center", margin: "none" }}
        style={open ? { display: "flex" } : undefined}
      >
        <Navlink to="/request">Request</Navlink>
        <Navlink to="/about">About</Navlink>
        <Navlink to="/status-codes">Status Codes</Navlink>
      </ui.ul>
    </ui.nav>
  );
};

export default Nav;
