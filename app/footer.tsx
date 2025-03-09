import { Moon } from "./moon";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-3">
      <Link to="/about">About</Link>
      <Moon />
    </footer>
  )
}