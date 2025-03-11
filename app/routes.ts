import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pull", "routes/pull.tsx", [
    index("routes/pull/index.tsx"),
    route("new", "routes/pull/new.tsx"),
    route(":id", "routes/pull/id.tsx"),
  ]),
  route("about", "routes/about.tsx"),
] satisfies RouteConfig;
