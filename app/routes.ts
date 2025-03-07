import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pull/new", "routes/new-pull.tsx"),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
