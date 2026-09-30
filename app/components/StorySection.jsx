'use client';

export default function StorySection({ onScrollNext }) {
  return (
    <section className="story-page" id="section-3" data-index="2">
      <div className="mobile-canvas-stage">
        <div 
          className="mobile-card card-ratio-story"
          style={{ backgroundImage: `url('/template_story_blank.jpg')` }}
        >
          {/* Typography matching Sample Image 3 */}
          <div className="sec3-story-box">
            {/* Gold Script Calligraphy Heading */}
            <h2 className="sec3-story-script">Our Story</h2>

            {/* Elegant Italic Subheading */}
            <div className="sec3-story-subheading">Our Story</div>

            {/* Poetic Italic Book Prose */}
            <div className="sec3-story-prose">
              <p className="story-para">
                Some stories begin unexpectedly, but the most beautiful ones begin with a simple hello.
              </p>
              
              <p className="story-para">
                Rajha Mukilan and Swetha's journey began during their golden days, where friendship slowly blossomed into something more.
              </p>
              
              <p className="story-para">
                Through countless moments, conversations, laughter, and memories, their bond grew stronger with every passing day.
              </p>
              
              <p className="story-para">
                What started as a beautiful connection became a love they chose to cherish forever.
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
