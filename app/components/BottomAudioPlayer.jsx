'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function BottomAudioPlayer({ showToast }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play on mount or on first user scroll / touch / click
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    const tryAutoPlay = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay policy prevented unmuted autoplay; wait for first user gesture
        const handleFirstInteraction = () => {
          if (!audio) return;
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {});

          window.removeEventListener('scroll', handleFirstInteraction);
          window.removeEventListener('wheel', handleFirstInteraction);
          window.removeEventListener('touchstart', handleFirstInteraction);
          window.removeEventListener('pointerdown', handleFirstInteraction);
          window.removeEventListener('click', handleFirstInteraction);
        };

        window.addEventListener('scroll', handleFirstInteraction, { passive: true });
        window.addEventListener('wheel', handleFirstInteraction, { passive: true });
        window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
        window.addEventListener('pointerdown', handleFirstInteraction, { passive: true });
        window.addEventListener('click', handleFirstInteraction, { passive: true });
      });
    };

    tryAutoPlay();
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => {
        setIsPlaying(true);
        if (showToast) showToast('Playing Song 🎵');
      }).catch(() => {});
    } else {
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
