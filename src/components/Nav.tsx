import "src/components/nav.css";

import { Box, Hamburger, Link, ui, UnstyledLink } from "@adamjanicki/ui";
import { useState } from "react";
import Logo from "src/img/logo.svg?react";

type NavlinkProps = {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
};

function Navlink(props: NavlinkProps) {
  return (
    <ui.li className="navlink-li">
      <Link className="navlink" {...props} />
    </ui.li>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <ui.nav
      vfx={{
        axis: "x",
        align: "center",
        justify: "between",
        width: "full",
        paddingY: "s",
        paddingX: "l",
      }}
      className="nav"
    >
      <Box
        vfx={{ axis: "x", align: "center", justify: "between" }}
        className="bar-container"
      >
        <UnstyledLink to="/" onClick={closeMenu}>
          <Logo height={36} />
        </UnstyledLink>
        <Box className="mobile">
          <Hamburger open={open} onClick={() => setOpen(!open)} />
        </Box>
      </Box>
      <ui.ul
        vfx={{ axis: "x", align: "center", margin: "none" }}
        className="desktop link-container"
        style={{ display: open ? "flex" : undefined }}
      >
        <Navlink to="/request" onClick={closeMenu}>
          Request
        </Navlink>
        <Navlink to="/about" onClick={closeMenu}>
          About
        </Navlink>
        <Navlink to="/status-codes" onClick={closeMenu}>
          Status Codes
        </Navlink>
      </ui.ul>
    </ui.nav>
  );
}
