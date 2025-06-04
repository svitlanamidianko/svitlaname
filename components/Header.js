export default function Header() {
  return (
    <div className="header w-nav" data-collapse="medium" data-animation="default" data-duration="400" data-w-id="58db7844-5919-d71b-dd74-2323ed8dffe9" data-easing="ease" data-easing2="ease" role="banner">
      <div className="container-header">
        <div className="split-content header-left">
          <a href="/" className="brand w-nav-brand">
            <div className="text-block">☀️</div>
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <ul role="list" className="header-navigation">
              <li className="nav-item-wrapper">
                <a href="/" className="nav-link">home</a>
              </li>
              <li className="nav-item-wrapper">
                <a href="/notes-to-self" className="nav-link">notes to self<br /></a>
              </li>
              <li className="nav-item-wrapper">
                <a href="/writing" className="nav-link">writing</a>
              </li>
              <li className="nav-item-wrapper">
                <a href="/misc" className="nav-link">misc</a>
              </li>
              <li className="nav-item-wrapper">
                <a href="https://www.pond.space/" className="nav-link">pond.space</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="split-content header-right">
          <div className="menu-button w-nav-button">
            <div className="menu-button-wrapper">
              <div className="menu-button-icon">
                <div className="menu-line-top"></div>
                <div className="menu-line-top"></div>
                <div className="menu-line-top"></div>
              </div>
            </div>
            <a href="#" className="w-inline-block"></a>
          </div>
        </div>
      </div>
    </div>
  );
} 