'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function IntroOverlay({ onDismiss }) {
  const videoRef = useRef(null);
  const isDismissedRef = useRef(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  // Trigger dismissal and audio start
  const handleDismiss = useCallback(() => {
    if (isDismissedRef.current) return;
    isDismissedRef.current = true;
    setIsDismissed(true);

    // Trigger reception audio start
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('start-reception-audio'));
    }

    if (onDismiss) onDismiss();

    // Pause intro video and unmount after smooth fade out
    setTimeout(() => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch (e) {}
      }
      setIsMounted(false);
    }, 750);
  }, [onDismiss]);

  // Video playback lifecycle and robust auto-dismiss triggers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // 1. timeupdate: fires continuously during playback (checks if within 0.35s of end)
    const handleTimeUpdate = () => {
      if (video.duration && !isNaN(video.duration) && video.currentTime >= video.duration - 0.35) {
        handleDismiss();
      }
    };

    // 2. native ended event
    const handleEnded = () => {
      handleDismiss();
    };

    // 3. pause event: in case video stops on last frame without firing ended
    const handlePause = () => {
      if (video.duration && !isNaN(video.duration) && video.currentTime >= video.duration - 0.6) {
        handleDismiss();
      }
    };

    // 4. loadedmetadata: set an exact watchdog timer based on video duration
    let durationTimer = null;
    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        durationTimer = setTimeout(handleDismiss, (video.duration + 0.3) * 1000);
      }
    };

    if (video.readyState >= 1 && video.duration && !isNaN(video.duration)) {
      handleLoadedMetadata();
    }

    // 5. Fallback safety watchdog (12s maximum safety net)
    const fallbackWatchdog = setTimeout(handleDismiss, 12000);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('pause', handlePause);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // Auto-play attempt
    video.play().catch(() => {
      const handleUserGesture = () => {
        if (video) video.play().catch(() => {});
        window.removeEventListener('touchstart', handleUserGesture);
        window.removeEventListener('click', handleUserGesture);
      };
      window.addEventListener('touchstart', handleUserGesture, { once: true });
      window.addEventListener('click', handleUserGesture, { once: true });
    });

    return () => {
      if (durationTimer) clearTimeout(durationTimer);
      clearTimeout(fallbackWatchdog);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [handleDismiss]);

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
        />
        {/* Full-screen tap-to-enter shield */}
        <div 
          className="intro-tap-shield"
          onClick={handleDismiss}
          onTouchEnd={handleDismiss}
          title="Click or tap to enter"
        />
      </div>

      {/* Single Prominent, Non-Overlapping Skip Intro Button */}
      <button 
        type="button"
        className="skip-intro-btn" 
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleDismiss();
        }}
        aria-label="Skip Intro and Enter Invitation"
        id="btn-skip-intro"
      >
        <i className="fa-solid fa-forward-step"></i>
        <span>Skip Intro</span>
      </button>
    </div>
  );
}
