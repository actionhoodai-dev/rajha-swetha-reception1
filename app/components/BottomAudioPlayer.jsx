'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function BottomAudioPlayer({ showToast }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const userManuallyMutedRef = useRef(false);
  const isPlayingRef = useRef(false);

  // Keep ref in sync
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const startMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userManuallyMutedRef.current) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented playback, waiting for next user gesture
      });
    }
  }, []);

  // Set up audio and global interaction triggers for ANY click or scroll
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    // 1. Try playing immediately upon page mount
    startMusic();

    // 2. Global event listener on ANY user interaction anywhere on screen
    const handleGlobalInteraction = () => {
      if (!userManuallyMutedRef.current && audioRef.current && audioRef.current.paused) {
        startMusic();
      }
    };

    const interactionEvents = [
      'click',
      'pointerdown',
      'mousedown',
      'touchstart',
      'touchend',
      'wheel',
      'scroll',
      'keydown'
    ];

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleGlobalInteraction, { capture: true, passive: true });
      document.addEventListener(evt, handleGlobalInteraction, { capture: true, passive: true });
    });

    // Also attach directly to the scroll viewport if present
    const viewport = document.querySelector('.story-viewport');
    if (viewport) {
      viewport.addEventListener('scroll', handleGlobalInteraction, { capture: true, passive: true });
      viewport.addEventListener('wheel', handleGlobalInteraction, { capture: true, passive: true });
      viewport.addEventListener('touchmove', handleGlobalInteraction, { capture: true, passive: true });
    }

    // Custom event triggered by IntroOverlay skip or dismiss
    const handleCustomStart = () => {
      userManuallyMutedRef.current = false;
      startMusic();
    };
    window.addEventListener('start-reception-audio', handleCustomStart);

    return () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleGlobalInteraction, { capture: true });
        document.removeEventListener(evt, handleGlobalInteraction, { capture: true });
      });
      if (viewport) {
        viewport.removeEventListener('scroll', handleGlobalInteraction, { capture: true });
        viewport.removeEventListener('wheel', handleGlobalInteraction, { capture: true });
        viewport.removeEventListener('touchmove', handleGlobalInteraction, { capture: true });
      }
      window.removeEventListener('start-reception-audio', handleCustomStart);
    };
  }, [startMusic]);

  const toggleAudio = useCallback((e) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      userManuallyMutedRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
        if (showToast) showToast('Playing Song 🎵');
      }).catch(() => {});
    } else {
      userManuallyMutedRef.current = true;
      audio.pause();
      setIsPlaying(false);
      if (showToast) showToast('Song Muted 🔇');
    }
  }, [showToast]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/reception_song.mp3"
        loop
        preload="auto"
      />

      {/* Floating Mute/Play Button at the Right Bottom of the Screen */}
      <button
        className={`floating-bottom-audio-btn ${isPlaying ? 'playing' : 'muted'}`}
        onClick={toggleAudio}
        title={isPlaying ? 'Mute Music' : 'Play Music'}
        aria-label="Toggle Reception Music"
        id="btn-bottom-audio"
      >
        <div className="bottom-sound-wave" style={{ display: isPlaying ? 'flex' : 'none' }}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <i
          className={`fa-solid ${isPlaying ? 'fa-volume-high' : 'fa-volume-xmark'}`}
          style={{ display: isPlaying ? 'none' : 'inline-block' }}
        ></i>
        <span className="bottom-audio-label">{isPlaying ? 'Music' : 'Muted'}</span>
      </button>
    </>
  );
}
