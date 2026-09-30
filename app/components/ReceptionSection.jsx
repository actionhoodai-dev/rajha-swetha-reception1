'use client';

const RECEPTION_BLUR_BASE64 = "data:image/webp;base64,UklGRroAAABXRUJQVlA4IK4AAADwBACdASoVACAAPzmQv1evKaajqAqp4CcJZgC7ADQ6WDs3vS3F8OnFu4fTiSVY1AAA/r5H96O7SzZ2g8uzVCDUQMWUnOoZNUE2iDfSwZZKBFZQdv//sWfcDzdeLiiB1G84WhRCkjhmqYMGXPFK3kEp2yH7esTmaWR4+0iDB6oJeVZI9NOhhm/tHN4C/5t4E7IKafwwXoSPp0JWdR9fhIhQYwTh2QinyCgyO4fgAAA=";

export default function ReceptionSection({ onScrollTop }) {
  return (
    <section className="story-page reception-page" id="section-4" data-index="3">
      <div className="mobile-canvas-stage">
        <div 
          className="mobile-card card-ratio-reception"
          style={{ backgroundImage: `url('${RECEPTION_BLUR_BASE64}')` }}
        >
          {/* Instant High-Priority Background Image */}
          <img
            src="/template_reception_blank.webp"
            alt="Reception Details Background"
            className="mobile-card-bg-img"
            loading="lazy"
            decoding="async"
          />

          {/* Seamless inline details matching Sample Image 2 */}
          <div className="sec4-inline-details-box">
            <div className="sec4-inline-row">
              {/* Date Column */}
              <div className="sec4-col sec4-date-col">
                <div className="sec4-icon-glyph">
                  <i className="fa-regular fa-calendar"></i>
                </div>
                <div className="sec4-text-val">12 NOV 2026</div>
              </div>

              {/* Vertical Divider */}
              <div className="sec4-inline-divider"></div>

              {/* Venue Column */}
              <div className="sec4-col sec4-venue-col">
                <div className="sec4-icon-glyph">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="sec4-text-val sec4-venue-lines">
                  <span>BHARATHI MAHAL,</span>
                  <span>KAMARAJ NAGAR,</span>
                  <span>GOBICHETTIPALAYAM</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="sec4-inline-divider"></div>

              {/* Time Column */}
              <div className="sec4-col sec4-time-col">
                <div className="sec4-icon-glyph">
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div className="sec4-text-val">6:00 PM – 10:00 PM</div>
              </div>
            </div>

            {/* Lotus Flourish Line */}
            <div className="sec4-lotus-row">
              <span className="sec4-lotus-line"></span>
              <svg className="lotus-svg-icon" viewBox="0 0 24 24">
                <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 6.5 7 1-3.5 3.5-6 6.5-7-3-1-5.5-4-6-7z" fill="currentColor"/>
              </svg>
              <span className="sec4-lotus-line"></span>
            </div>
          </div>

          {/* Back to Top Scroll Cue */}
          <div className="scroll-cue" onClick={() => onScrollTop(0)}>
            <span className="cue-text">Back to Top</span>
            <div className="cue-arrow">
              <i className="fa-solid fa-chevron-up"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
