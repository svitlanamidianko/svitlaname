import { useState } from 'react';
// This is a single-line comment
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="header w-nav" data-collapse="medium" data-animation="default" data-duration="400" data-w-id="58db7844-5919-d71b-dd74-2323ed8dffe9" data-easing="ease" data-easing2="ease" role="banner">
      <div className="container-header">
        <div className="split-content header-left">
          <a href="/" className="brand w-nav-brand">
            <div className="text-block">🌻</div>
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu desktop-nav-menu">
            <ul role="list" className="header-navigation" style={{ justifyContent: 'flex-end' }}>
              <li className="nav-item-wrapper">
                <a href="/yummy-collections" className="nav-link">yummy collections</a>
              </li>
              {/*<li className="nav-item-wrapper">
              <a href="/experiential-software" className="nav-link">experiential software</a>
              </li> */}
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
          <div className="menu-button w-nav-button mobile-menu-button" onClick={() => setMenuOpen(true)}>
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
      {/* Mobile Menu Overlay */}
      <div
        className="mobile-menu-overlay"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          position: 'fixed',
          top: 0,
          right: 0,
          left: 'auto',
          width: '70vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.97)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          paddingTop: '60px',
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'absolute',
            top: 35,
            left: '2rem',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2rem',
            cursor: 'pointer',
            zIndex: 1100,
          }}
          aria-label="Close menu"
        >
          ×
        </button>
        {/* Menu Links */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          <li style={{ margin: '30px 0' }}><a href="/yummy-collections" className="nav-link mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', paddingLeft: '2.5rem', display: 'block' }} onClick={() => setMenuOpen(false)}>yummy collections</a></li>
          <li style={{ margin: '30px 0' }}><a href="/writing" className="nav-link mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', paddingLeft: '2.5rem', display: 'block' }} onClick={() => setMenuOpen(false)}>writings</a></li>
          <li style={{ margin: '30px 0' }}><a href="/misc-pour" className="nav-link mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', paddingLeft: '2.5rem', display: 'block' }} onClick={() => setMenuOpen(false)}>misc pour</a></li>
          <li style={{ margin: '30px 0' }}><a href="https://www.pond.space/" className="nav-link mobile-menu-link" style={{ color: '#fff', textDecoration: 'none', paddingLeft: '2.5rem', display: 'block' }} onClick={() => setMenuOpen(false)}>pond.space</a></li>
        </ul>
      </div>
      {/* Responsive styles for mobile/desktop nav */}
      <style jsx>{`
        .mobile-menu-button {
          display: none;
        }
        .mobile-menu-overlay {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-nav-menu {
            display: none !important;
          }
          .mobile-menu-button {
            display: block;
          }
          .mobile-menu-overlay {
            display: flex;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-button {
            display: none;
          }
          .mobile-menu-overlay {
            display: none;
          }
        }
      `}</style>
    </div>
  );
} 