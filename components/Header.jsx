import IconMonospace from "./icons/Monospace";

export default function Header() {
  return (
    <header>
      <nav className="container">
        <a href="/">
          <IconMonospace />
        </a>
        <span className="text-blue-900 extra-bold text-5xl">
          Do More Proof Of Concept 
        </span>
      </nav>
    </header>
  );
}
