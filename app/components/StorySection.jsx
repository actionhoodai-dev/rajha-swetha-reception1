'use client';

const STORY_BLUR_BASE64 = "data:image/webp;base64,UklGRuYAAABXRUJQVlA4INoAAABwBQCdASoXACAAPzmQvVgvKaYjqAqp4CcJYgC1CKocAAftJFQCBnbCL0YBsw5OJSN3bAHAAMyLn20mEpl+8p5mRHthGDFLhXGEojm8l5kTBsMJgnOydk0t8Hk7At1kImlgy6/MxP1NhhLMgivyBGHStDfsDaXyNjunOXrDbbN9rBCFtiEmlhJ4OD5fScOzENDLdxkypOl0SLQt6MHy9V8gS1L4YW/pFUCSmsJ0fruWZfyrB/RndatAeZny/P22Zv4lNmsoT9vzb6DGFzk7sHaYAQStAZWmqLgAAA==";

export default function StorySection({ onScrollNext }) {
  return (
    <section className="story-page" id="section-3" data-index="2">
      <div className="mobile-canvas-stage">
        <div 
          className="mobile-card card-ratio-story"
          style={{ backgroundImage: `url('${STORY_BLUR_BASE64}')` }}
        >
          {/* Instant High-Priority Background Image */}
          <img
            src="/template_story_blank.webp"
            alt="Our Story Background"
            className="mobile-card-bg-img"
            loading="lazy"
            decoding="async"
          />

          {/* Strictly 5-6 words per line maximum to prevent any design overlap */}
          <div className="sec3-story-box">
            {/* Gold Script Calligraphy Heading (appears ONLY ONCE) */}
            <h2 className="sec3-story-script">Our Story</h2>

            {/* Subtle decorative divider */}
            <div className="sec3-lotus-divider">
              <span className="sec3-divider-line"></span>
              <svg className="lotus-svg-icon" viewBox="0 0 24 24" width="14" height="14">
                <path d="M12 3c-1.5 3-4 6-7 7 3 1 5.5 3.5 6.5 7 1-3.5 3.5-6 6.5-7-3-1-5.5-4-6-7z" fill="currentColor"/>
              </svg>
              <span className="sec3-divider-line"></span>
            </div>

            {/* 5 to 6 words maximum per line */}
            <div className="sec3-story-prose">
              <p className="story-para">
                Some stories begin unexpectedly,<br />
                but the most beautiful ones<br />
                begin with a simple hello.
              </p>
              
              <p className="story-para">
                Our journey began with friendship,<br />
                where two hearts slowly<br />
                found their way to each other.
              </p>
              
              <p className="story-para">
                Through countless moments, conversations,<br />
                laughter, and shared memories,<br />
                our bond grew stronger<br />
                with every passing day.
              </p>
              
              <p className="story-para">
                What started as friendship<br />
                blossomed into a love<br />
                we chose to cherish forever.
              </p>

              <p className="story-para">
                From friends to soulmates,<br />
                from soulmates to lovers,<br />
                and now husband and wife,<br />
                our journey has been magical.
              </p>
              
              <p className="story-para story-para-conclusion">
                And now, we begin our next<br />
                chapter — together, for a lifetime. 💍
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
