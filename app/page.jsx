'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import VideoSection from './components/VideoSection';
import StorySection from './components/StorySection';
import ReceptionSection from './components/ReceptionSection';
import AmbientBackdrop from './components/AmbientBackdrop';
import PetalsCanvas from './components/PetalsCanvas';
import SideNav from './components/SideNav';
import FloatingHeader from './components/FloatingHeader';

export default function WeddingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const viewportRef = useRef(null);
  const audioCtxRef = useRef(null);
  const musicTimerRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Trigger toast notification
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  }, []);

  // Smooth scroll to section index
  const scrollToSection = useCallback((index) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const sections = viewport.querySelectorAll('.story-page');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // IntersectionObserver to sync active section on scroll
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const sections = viewport.querySelectorAll('.story-page');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveIndex(index);
          }
        });
      },
      {
        root: viewport,
        threshold: 0.5,
      }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Romantic acoustic synth music via Web Audio API
  const toggleMusic = useCallback(() => {
    if (isMusicPlaying) {
      if (musicTimerRef.current) {
        clearInterval(musicTimerRef.current);
        musicTimerRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      setIsMusicPlaying(false);
      triggerToast('Ambience Music Paused');
    } else {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const chordProgressions = [
          [261.63, 329.63, 392.0], // C Maj
          [220.0, 261.63, 329.63], // A Min
          [174.61, 220.0, 261.63], // F Maj
          [196.0, 246.94, 293.66], // G Maj
        ];

        let chordIdx = 0;
        const playPluck = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const chord = chordProgressions[chordIdx % chordProgressions.length];
          chordIdx++;

          chord.forEach((freq, idx) => {
            setTimeout(() => {
              if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
              const osc = audioCtxRef.current.createOscillator();
              const gain = audioCtxRef.current.createGain();

              osc.type = 'triangle';
              osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

              gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
              gain.gain.exponentialRampToValueAtTime(0.05, audioCtxRef.current.currentTime + 0.05);
              gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 2.2);

              osc.connect(gain);
              gain.connect(audioCtxRef.current.destination);

              osc.start();
              osc.stop(audioCtxRef.current.currentTime + 2.2);
            }, idx * 160);
          });
        };

        playPluck();
        musicTimerRef.current = setInterval(playPluck, 2400);

        setIsMusicPlaying(true);
        triggerToast('Playing Romantic Ambience 🎵');
      } catch (e) {
        console.error('Audio error', e);
        triggerToast('Audio not allowed by browser');
      }
    }
  }, [isMusicPlaying, triggerToast]);

  return (
    <div className="wedding-app-root">
      {/* Ambient Blurred Background matching active section */}
      <AmbientBackdrop activeIndex={activeIndex} />

      {/* Mandatory Heart-Shaped Petals (Hidden on Section 2 Video, active on 1, 3, 4) */}
      <PetalsCanvas isVisible={activeIndex !== 1} />

      {/* Top Reading Progress Bar */}
      <div className="top-progress-container">
        <div 
          className="top-progress-bar" 
          style={{ width: `${((activeIndex + 1) / 4) * 100}%` }}
        />
      </div>

      {/* Floating Header Controls (Music & Couple Badge only) */}
      <FloatingHeader
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={toggleMusic}
      />

      {/* Side Navigation Indicator Dots */}
      <SideNav 
        activeIndex={activeIndex} 
        onSelectSection={scrollToSection} 
      />

      {/* Main Snap-Scroll Story Viewport */}
      <main className="story-wrapper">
        <div className="story-viewport" ref={viewportRef}>
          {/* Page 1: Hero / Welcome */}
          <HeroSection onScrollNext={scrollToSection} />

          {/* Page 2: Continuous Running AI Video (No Petals Over Video) */}
          <VideoSection 
            onScrollNext={scrollToSection}
            showToast={triggerToast}
          />

          {/* Page 3: Our Story */}
          <StorySection onScrollNext={scrollToSection} />

          {/* Page 4: Reception Details */}
          <ReceptionSection onScrollTop={scrollToSection} />
        </div>
      </main>

      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
}
