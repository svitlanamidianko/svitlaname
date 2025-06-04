// This is a single-line comment
export default function Header() {
  return (
    <div className="header w-nav" data-collapse="medium" data-animation="default" data-duration="400" data-w-id="58db7844-5919-d71b-dd74-2323ed8dffe9" data-easing="ease" data-easing2="ease" role="banner">
      <div className="container-header">
        <div className="split-content header-left">
          <a href="/" className="brand w-nav-brand">
            <div className="text-block">🌻</div>
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <ul role="list" className="header-navigation" style={{ justifyContent: 'flex-end' }}>
        
              <li className="nav-item-wrapper">
                <a href="/yummy-collections" className="nav-link">yummy collections</a>
              </li>
            
              {/*<li className="nav-item-wrapper">
              <a href="/experiential-software" className="nav-link">experiential software</a>
              </li> */}
=
              <li className="nav-item-wrapper">
                <a href="/writing" className="nav-link">writings</a>
              </li>
               {/*
              <li className="nav-item-wrapper">
                <a href="/artsies" className="nav-link">artsies</a>
              </li>*/}
              <li className="nav-item-wrapper">
                <a href="/misc-pour" className="nav-link">misc pour</a>
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