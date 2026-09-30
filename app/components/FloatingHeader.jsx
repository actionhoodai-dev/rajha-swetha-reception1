'use client';

export default function FloatingHeader() {
  return (
    <header className="floating-header">
      <div className="header-left">
        <span className="header-btn" style={{ cursor: 'default', opacity: 0.9 }}>
          <i className="fa-solid fa-heart" style={{ color: '#E8A598' }}></i>
          <span className="btn-text">Rajha & Swetha</span>
        </span>
      </div>
    </header>
  );
}
