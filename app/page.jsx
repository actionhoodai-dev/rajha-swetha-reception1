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
import BottomAudioPlayer from './components/BottomAudioPlayer';
import IntroOverlay from './components/IntroOverlay';

export default function WeddingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const viewportRef = useRef(null);
  const toastTimeoutRef = useRef(null);

  // Trigger toast notification
  const triggerToast = useCallback((msg) => {
    setToastMessage(msg);
    setShowToast(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2400);
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

  return (
    <div className="wedding-app-root">
      {/* Intro Video Overlay with Skip Button at Left Bottom */}
      <IntroOverlay />

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

      {/* Floating Header (Couple badge on left) */}
      <FloatingHeader />

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

          {/* Page 2: Continuous Running AI Video */}
          <VideoSection 
            onScrollNext={scrollToSection}
            showToast={triggerToast}
          />

          {/* Page 3: Our Story (5-6 words per line maximum, safe bounds) */}
          <StorySection onScrollNext={scrollToSection} />

          {/* Page 4: Reception Details (moved down, no star ending, date right 1cm) */}
          <ReceptionSection onScrollTop={scrollToSection} />
        </div>
      </main>

      {/* Floating Mute/Play Button at the Right Bottom of the Screen with reception_song.mp3 */}
      <BottomAudioPlayer showToast={triggerToast} />

      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>
    </div>
  );
}
