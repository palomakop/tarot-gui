import { Moon } from "./moon";
import { Link } from "react-router";
import { useLocation } from "react-router-dom";

export function Footer() {
  const currentPathname = useLocation().pathname;
  if (currentPathname == "/about") {
    return (
      <footer className="flex flex-col items-center gap-3">
        <Link to="/" viewTransition>Home</Link>
        <Moon />
      </footer>
    )
  }
  else if (currentPathname == "/") {
    return (
      <footer className="flex flex-col items-center gap-3">
        <Link to="/about" viewTransition>About</Link>
        <Moon />
      </footer>
    )
  }
  else {
    return (
      <footer className="flex flex-col items-center gap-3">
        <div className="flex gap-3">
          <Link to="/" viewTransition>Home</Link> <span>•</span> <Link to="/about" viewTransition>About</Link>
        </div>
        <Moon />
      </footer>
    )
  }
}