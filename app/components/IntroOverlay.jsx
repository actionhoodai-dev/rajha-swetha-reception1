'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function IntroOverlay({ onDismiss }) {
  const videoRef = useRef(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Trigger dismissal and audio start
  const handleDismiss = useCallback(() => {
    if (isDismissed) return;
    setIsDismissed(true);

    // Trigger reception audio start
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('start-reception-audio'));
    }

    if (onDismiss) onDismiss();

    // Pause intro video and unmount after smooth fade out
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsMounted(false);
    }, 850);
  }, [isDismissed, onDismiss]);

  // Start video playback automatically upon mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      // If autoplay was restricted, play on first user gesture
      const startVideo = () => {
        if (video) video.play().catch(() => {});
        window.removeEventListener('touchstart', startVideo);
        window.removeEventListener('click', startVideo);
      };
      window.addEventListener('touchstart', startVideo, { once: true });
      window.addEventListener('click', startVideo, { once: true });
    });
  }, []);

  if (!isMounted) return null;

  return (
    <div 
      className={`intro-overlay ${isDismissed ? 'dismissed' : ''}`}
      id="intro-overlay"
    >
      {/* Cinematic Ambient Glow Behind Video */}
      <div className="intro-backdrop-blur"></div>

      {/* Main Intro Video Stage */}
      <div className="intro-video-container">
        <video
          ref={videoRef}
          className="intro-video"
          src="/reception-intro.mp4"
          autoPlay
          playsInline
          muted
          preload="auto"
          onEnded={handleDismiss}
        />
      </div>

      {/* Skip Intro Button Positioned at Bottom-Left */}
      <button 
        className="skip-intro-btn" 
        onClick={handleDismiss}
        aria-label="Skip Intro"
        id="btn-skip-intro"
      >
        <i className="fa-solid fa-forward-step"></i>
        <span>Skip Intro</span>
      </button>

      {/* Discreet Enter Invitation Prompt */}
      <div className="intro-scroll-hint" onClick={handleDismiss}>
        <span>Enter Invitation</span>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  );
}
