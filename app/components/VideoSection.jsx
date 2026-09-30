'use client';

import { useRef, useState, useEffect } from 'react';

export default function VideoSection({ onScrollNext, showToast }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  // Ensure video always continuously plays without ever feeling static
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlaying = () => {
      video.muted = true;
      video.play().catch(() => {
        // Retry on first touch/interaction if browser was pending
        const handleUserGesture = () => {
          if (video) video.play().catch(() => {});
          window.removeEventListener('touchstart', handleUserGesture);
          window.removeEventListener('click', handleUserGesture);
        };
        window.addEventListener('touchstart', handleUserGesture, { once: true });
        window.addEventListener('click', handleUserGesture, { once: true });
      });
    };

    startPlaying();
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
    if (showToast) {
      showToast(video.muted ? 'Video Muted 🔇' : 'Video Sound Active 🔊');
    }
  };

  return (
    <section className="story-page video-page" id="section-2" data-index="1">
      <div className="mobile-canvas-stage">
        <div className="mobile-card card-ratio-video">
          <div className="video-card-container">
            <video
              ref={videoRef}
              className="continuous-running-video"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
            >
              <source src="/3rd-page-video.mp4" type="video/mp4" />
              <source src="/ordered_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Discreet Sound Toggle Pill */}
            <button 
              className="video-sound-pill" 
              onClick={toggleSound}
              title="Toggle Video Audio"
            >
              <i className={`fa-solid ${isMuted ? 'fa-volume-xmark' : 'fa-volume-high'}`}></i>
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            {/* Seamless Bottom Cue to Page 4 (Our Story) */}
            <div className="video-next-cue" onClick={() => onScrollNext(2)}>
              <span>Our Story</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
