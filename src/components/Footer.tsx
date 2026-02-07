import { Link, ui } from "@adamjanicki/ui";

const Footer = () => (
  <ui.footer
    vfx={{
      axis: "x",
      align: "center",
      justify: "center",
      paddingY: "xxl",
      paddingX: "s",
      borderTop: true,
      borderWidth: "s",
    }}
  >
    <ui.p vfx={{ fontWeight: 5, textAlign: "center" }}>
      Est. 2025 Built from scratch by{" "}
      <Link newTab to="https://adamjanicki.xyz">
        Adam
      </Link>
    </ui.p>
  </ui.footer>
);

export default Footer;
