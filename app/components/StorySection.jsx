'use client';

export default function StorySection({ onScrollNext }) {
  return (
    <section className="story-page" id="section-3" data-index="2">
      <div className="mobile-canvas-stage">
        <div 
          className="mobile-card card-ratio-story"
          style={{ backgroundImage: `url('/template_story_blank.jpg')` }}
        >
          {/* Exactly allocated story box - text appears only ONCE and fits parchment */}
          <div className="sec3-story-box">
            {/* Gold Script Calligraphy Heading (appears ONLY ONCE) */}
            <h2 className="sec3-story-script">Our Story</h2>

            {/* Subtle decorative divider */}
            <div className="sec3-lotus-divider">
              <span className="sec3-divider-line"></span>
              <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 6.5 7 1-3.5 3.5-6 6.5-7-3-1-5.5-4-6-7z" fill="currentColor"/>
              </svg>
              <span className="sec3-divider-line"></span>
            </div>

            {/* Elegant Book Italic Prose tailored to fit parchment space */}
            <div className="sec3-story-prose">
              <p className="story-para">
                Some stories begin unexpectedly, but the most beautiful ones begin with a simple hello.
              </p>
              
              <p className="story-para">
                Rajha Mukilan & Swetha's journey blossomed through shared laughter, cherished conversations, and memories that grew into a love to cherish forever.
              </p>
              
              <p className="story-para story-para-conclusion">
                And now, they begin their next chapter — together, for a lifetime. 💍 ✨
              </p>
            </div>
          </div>

          {/* Bottom Cue to Page 4 */}
          <div className="scroll-cue" onClick={() => onScrollNext(3)}>
            <span className="cue-text">Reception Details</span>
            <div className="cue-arrow">
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
