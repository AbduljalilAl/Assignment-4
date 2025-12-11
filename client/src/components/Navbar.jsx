const Navbar = ({ theme, onToggleTheme }) => {
  const label = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <header>
      <nav className="navbar">
        <h1 className="logo">My Portfolio</h1>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#github">GitHub</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <button id="theme-toggle" type="button" onClick={onToggleTheme}>
              {label}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
