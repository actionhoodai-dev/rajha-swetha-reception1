'use client';

const INTRO_BLUR_BASE64 = "data:image/webp;base64,UklGRtQAAABXRUJQVlA4IMgAAADwBACdASoWACAAPzmQvVevKaYjqAqp4CcJZgC1CAeEntypm5YBeIlrg4JyinT1GAgAy0LJkjxvdawNXfG6z3PAQIsMEpn6Wk9BfnAUeb3ycAnHatPeaoUYP4RtjWVnvbT752x3Ia1Gd5x8Qt71bPLfUD0nclnXuZ22hMI6iEgR8L/OeEVyb8ps/pWWGdrx75TLSTzEIVUti0kb29dXm/UVNMUa6PRDH4SQZQcdipvpS2wUqyO8t9qzK6Ep6svA6xxAJgJrMW8AAA==";

export default function HeroSection({ onScrollNext }) {
  return (
    <section className="story-page" id="section-1" data-index="0">
      <div className="mobile-canvas-stage">
        <div 
          className="mobile-card card-ratio-intro"
          style={{ backgroundImage: `url('${INTRO_BLUR_BASE64}')` }}
        >
          {/* High-Resolution Background Image with Couple Photos */}
          <img
            src="/final-page1.png"
            alt="Rajha Mukilan & Swetha Wedding"
            className="mobile-card-bg-img"
            fetchPriority="high"
            decoding="async"
          />

          {/* Typography matching Sample Image 1 */}
          <div className="sec1-typography-container">
            <div className="sec1-tagline-top">
              <span>TWO</span>
              <span>BEAUTIFUL SOULS</span>
              <span>ONE INCREDIBLE</span>
              <span>JOURNEY</span>
            </div>

            <div className="sec1-lotus-divider">
              <span className="sec1-divider-line"></span>
              <svg className="lotus-svg-icon" viewBox="0 0 24 24">
                <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 6.5 7 1-3.5 3.5-6 6.5-7-3-1-5.5-4-6-7z" fill="currentColor"/>
              </svg>
              <span className="sec1-divider-line"></span>
            </div>

            <div className="sec1-names-block">
              <h1 className="sec1-groom-title">RAJHA MUKILAN</h1>
              <div className="sec1-weds-script">Weds</div>
              <h2 className="sec1-bride-title">SWETHA</h2>
            </div>

            <div className="sec1-lotus-divider">
              <span className="sec1-divider-line"></span>
              <svg className="lotus-svg-icon" viewBox="0 0 24 24">
                <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 6.5 7 1-3.5 3.5-6 6.5-7-3-1-5.5-4-6-7z" fill="currentColor"/>
              </svg>
              <span className="sec1-divider-line"></span>
            </div>

            <div className="sec1-tagline-bottom">
              <span>A NEW CHAPTER</span>
              <span>BEGINS</span>
            </div>
          </div>

          {/* Scroll Cue to Page 2 Video */}
          <div className="scroll-cue" onClick={() => onScrollNext(1)}>
            <span className="cue-text">Scroll or Swipe to Enter</span>
            <div className="cue-arrow">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
