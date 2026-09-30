'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoSection({ onScrollNext }) {
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    const startPlaying = () => {
      video.muted = true;
      video.play().catch(() => {
        const handleUserGesture = () => {
          if (video) {
            video.muted = true;
            video.play().catch(() => {});
          }
          window.removeEventListener('touchstart', handleUserGesture);
          window.removeEventListener('click', handleUserGesture);
        };
        window.addEventListener('touchstart', handleUserGesture, { once: true });
        window.addEventListener('click', handleUserGesture, { once: true });
      });
    };

    startPlaying();
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsVideoMuted(nextMuted);

    // Show temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'site-toast show';
    toast.textContent = nextMuted ? 'Video Muted' : 'Video Sound Active';
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 2200);
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
              muted
              playsInline
              preload="auto"
            >
              <source src="/3rd-page-video.mp4" type="video/mp4" />
              <source src="/ordered_video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Sound Pill */}
            <button
              className="video-sound-pill"
              onClick={toggleSound}
              aria-label={isVideoMuted ? "Unmute video sound" : "Mute video sound"}
            >
              <i className={isVideoMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"}></i>
              <span>{isVideoMuted ? "Muted" : "Sound On"}</span>
            </button>

            {/* Seamless Bottom Cue to Our Story */}
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
