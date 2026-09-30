'use client';

export default function FloatingHeader({
  isPetalsEnabled,
  onTogglePetals,
  isMusicPlaying,
  onToggleMusic,
}) {
  return (
    <header className="floating-header">
      <div className="header-left">
        <span className="header-btn" style={{ cursor: 'default', opacity: 0.9 }}>
          <i className="fa-solid fa-heart" style={{ color: '#E8A598' }}></i>
          <span className="btn-text">Rajha & Swetha</span>
        </span>
      </div>

      <div className="header-right">
        <button
          className="header-btn"
          onClick={onTogglePetals}
          title="Toggle Falling Wedding Petals"
        >
          <i className="fa-solid fa-fan"></i>
          <span className="btn-text">{isPetalsEnabled ? 'Petals On' : 'Petals Off'}</span>
        </button>

        <button
          className={`header-btn audio-btn ${isMusicPlaying ? 'playing' : ''}`}
          onClick={onToggleMusic}
          title="Toggle Romantic Ambience Music"
        >
          <div className="sound-wave-icon">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <i className="fa-solid fa-music"></i>
          <span className="btn-text">{isMusicPlaying ? 'Playing' : 'Music'}</span>
        </button>
      </div>
    </header>
  );
}
