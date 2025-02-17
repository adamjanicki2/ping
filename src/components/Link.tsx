import {
  Link as UILink,
  UnstyledLink as UIUnstyledLink,
} from "@adamjanicki/ui";
import { Link as RouterLink } from "react-router";

type Props = React.ComponentProps<typeof UILink>;

const Link = (props: Props) => (
  <UILink
    LinkElement={({ to, ...props }) => (
      <RouterLink {...props} to={to} reloadDocument={to.includes("#")} />
    )}
    {...props}
  />
);

export const UnstyledLink = (
  props: React.ComponentProps<typeof UIUnstyledLink>
) => (
  <UIUnstyledLink
    LinkElement={({ to, ...props }) => (
      <RouterLink {...props} to={to} reloadDocument={to.includes("#")} />
    )}
    {...props}
  />
);

export default Link;
