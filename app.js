/**
 * Rajha Mukilan & Swetha - Wedding Reception Interactive Experience
 * Handles snap scrolling across 4 pages, video playback on Page 2, audio ambience, and petals canvas
 */

document.addEventListener('DOMContentLoaded', () => {

  // ================= 1. SCROLL & SECTION MANAGEMENT =================
  const storyViewport = document.getElementById('story-viewport');
  const sections = Array.from(document.querySelectorAll('.story-page'));
  const navDots = Array.from(document.querySelectorAll('.nav-dot'));
  const progressBar = document.getElementById('top-progress-bar');
  const ambientBackdrop = document.getElementById('ambient-backdrop');

  const bgImages = [
    'final-page1.png',
    'ordered_video_thumb.jpg',
    'final-page3.png',
    'template_reception_blank.jpg'
  ];

  let currentSectionIndex = 0;

  // Window scroll to specific section index
  window.scrollToSection = function(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Nav Dot Click Handlers
  navDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-section'), 10);
      scrollToSection(idx);
    });
  });

  // Scroll cue click in Section 1
  const cueScrollDown = document.getElementById('cue-scroll-down');
  if (cueScrollDown) {
    cueScrollDown.addEventListener('click', () => scrollToSection(1));
  }

  // Page 2 Video Elements
  const orderedVideo = document.getElementById('ordered-invitation-video');
  const btnOrderedPlay = document.getElementById('btn-ordered-play');
  const iconOrderedPlay = document.getElementById('icon-ordered-play');
  const textOrderedPlay = document.getElementById('text-ordered-play');
  const btnOrderedMute = document.getElementById('btn-ordered-mute');
  const iconOrderedMute = document.getElementById('icon-ordered-mute');
  const textOrderedMute = document.getElementById('text-ordered-mute');
  const btnOrderedFullscreen = document.getElementById('btn-ordered-fullscreen');
  const centerVideoTap = document.getElementById('center-video-tap');

  // Intersection Observer to detect active section
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.getAttribute('data-index'), 10);
        updateActiveSection(index);
      }
    });
  }, {
    root: storyViewport,
    threshold: 0.55
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  function updateActiveSection(index) {
    currentSectionIndex = index;

    // Update dots
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    // Update progress bar
    const progressPercent = ((index + 1) / sections.length) * 100;
    if (progressBar) {
      progressBar.style.width = `${progressPercent}%`;
    }

    // Update ambient backdrop
    if (ambientBackdrop && bgImages[index]) {
      ambientBackdrop.style.backgroundImage = `url('${bgImages[index]}')`;
    }

    // Page 2 Video Continuous Running
    if (orderedVideo && orderedVideo.paused) {
      orderedVideo.play().catch(() => {});
    }
  }

  // Keyboard navigation (Arrow Up / Down)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToSection(Math.min(sections.length - 1, currentSectionIndex + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToSection(Math.max(0, currentSectionIndex - 1));
    }
  });


  // ================= 2. DESKTOP / MOBILE CARD VIEW TOGGLE =================
  const btnViewToggle = document.getElementById('btn-view-toggle');
  let isFrameMode = true;

  if (btnViewToggle) {
    btnViewToggle.addEventListener('click', () => {
      isFrameMode = !isFrameMode;
      document.body.classList.toggle('phone-frame-mode', isFrameMode);
      document.body.classList.toggle('fullscreen-mode', !isFrameMode);

      const icon = btnViewToggle.querySelector('i');
      const text = btnViewToggle.querySelector('.btn-text');

      if (isFrameMode) {
        icon.className = 'fa-solid fa-mobile-screen';
        text.textContent = 'Frame View';
        showToast('Switched to Mobile Card Frame View');
      } else {
        icon.className = 'fa-solid fa-expand';
        text.textContent = 'Full Screen';
        showToast('Switched to Full Screen Immersion View');
      }

      setTimeout(() => scrollToSection(currentSectionIndex), 100);
    });
  }


  // ================= 3. PAGE 2 VIDEO PLAYER CONTROLS =================
  function updateVideoUI(isPlaying) {
    if (!iconOrderedPlay || !textOrderedPlay) return;
    if (isPlaying) {
      iconOrderedPlay.className = 'fa-solid fa-pause';
      textOrderedPlay.textContent = 'Pause';
      if (centerVideoTap) centerVideoTap.classList.remove('show-btn');
    } else {
      iconOrderedPlay.className = 'fa-solid fa-play';
      textOrderedPlay.textContent = 'Play';
      if (centerVideoTap) centerVideoTap.classList.add('show-btn');
    }
  }

  function toggleOrderedVideoPlay() {
    if (!orderedVideo) return;
    if (orderedVideo.paused || orderedVideo.ended) {
      orderedVideo.play().then(() => updateVideoUI(true)).catch(() => {});
    } else {
      orderedVideo.pause();
      updateVideoUI(false);
    }
  }

  if (btnOrderedPlay) btnOrderedPlay.addEventListener('click', toggleOrderedVideoPlay);
  if (centerVideoTap) centerVideoTap.addEventListener('click', toggleOrderedVideoPlay);

  if (btnOrderedMute && orderedVideo) {
    btnOrderedMute.addEventListener('click', (e) => {
      e.stopPropagation();
      orderedVideo.muted = !orderedVideo.muted;
      if (orderedVideo.muted) {
        iconOrderedMute.className = 'fa-solid fa-volume-xmark';
        textOrderedMute.textContent = 'Muted';
        showToast('Video sound muted');
      } else {
        iconOrderedMute.className = 'fa-solid fa-volume-high';
        textOrderedMute.textContent = 'Sound';
        showToast('Video sound enabled');
      }
    });
  }

  if (btnOrderedFullscreen && orderedVideo) {
    btnOrderedFullscreen.addEventListener('click', (e) => {
      e.stopPropagation();
      if (orderedVideo.requestFullscreen) {
        orderedVideo.requestFullscreen();
      } else if (orderedVideo.webkitRequestFullscreen) {
        orderedVideo.webkitRequestFullscreen();
      }
    });
  }


  // ================= 4. INTRO VIDEO OVERLAY & SKIP INTRO =================
  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  const btnSkipIntro = document.getElementById('btn-skip-intro');
  const introScrollHint = document.getElementById('intro-scroll-hint');

  let isIntroDismissed = false;

  function dismissIntro() {
    if (isIntroDismissed) return;
    isIntroDismissed = true;

    if (introOverlay) {
      introOverlay.classList.add('dismissed');
      setTimeout(() => {
        introOverlay.style.display = 'none';
        if (introVideo) introVideo.pause();
      }, 850);
    }

    // Play reception music upon entering
    playSong();
  }

  if (introVideo) {
    introVideo.play().catch(() => {
      const startIntroVideo = () => {
        if (introVideo) introVideo.play().catch(() => {});
        window.removeEventListener('touchstart', startIntroVideo);
        window.removeEventListener('click', startIntroVideo);
      };
      window.addEventListener('touchstart', startIntroVideo, { once: true });
      window.addEventListener('click', startIntroVideo, { once: true });
    });

    introVideo.addEventListener('ended', dismissIntro);
  }

  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro();
    });
  }

  if (introScrollHint) {
    introScrollHint.addEventListener('click', dismissIntro);
  }

  // Dismiss intro on button click or when video finishes naturally



  // ================= 5. RECEPTION SONG AUDIO PLAYER =================
  const receptionAudio = document.getElementById('reception-audio');
  const btnBottomAudio = document.getElementById('btn-bottom-audio');
  const bottomSoundWave = document.getElementById('bottom-sound-wave');
  const bottomAudioIcon = document.getElementById('bottom-audio-icon');
  const bottomAudioLabel = document.getElementById('bottom-audio-label');

  let isSongPlaying = false;
  let userManuallyMuted = false;

  function updateAudioUI(playing) {
    isSongPlaying = playing;
    if (bottomSoundWave) bottomSoundWave.style.display = playing ? 'flex' : 'none';
    if (bottomAudioIcon) {
      bottomAudioIcon.style.display = playing ? 'none' : 'inline-block';
      bottomAudioIcon.className = playing ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
    }
    if (bottomAudioLabel) bottomAudioLabel.textContent = playing ? 'Music' : 'Muted';
    if (btnBottomAudio) btnBottomAudio.classList.toggle('playing', playing);
  }

  function playSong() {
    if (!receptionAudio || userManuallyMuted) return;
    receptionAudio.play().then(() => {
      updateAudioUI(true);
    }).catch(() => {
      // Browser autoplay policy requires user gesture
    });
  }

  function pauseSong() {
    if (!receptionAudio) return;
    receptionAudio.pause();
    updateAudioUI(false);
  }

  // Global Interaction Listeners: Start song when user clicks or scrolls ANY part of screen
  if (receptionAudio) {
    receptionAudio.volume = 0.75;
    playSong();

    const handleAnyUserInteraction = () => {
      if (!userManuallyMuted && receptionAudio.paused) {
        playSong();
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

    interactionEvents.forEach(evt => {
      window.addEventListener(evt, handleAnyUserInteraction, { capture: true, passive: true });
      document.addEventListener(evt, handleAnyUserInteraction, { capture: true, passive: true });
    });

    if (storyViewport) {
      storyViewport.addEventListener('scroll', handleAnyUserInteraction, { capture: true, passive: true });
      storyViewport.addEventListener('wheel', handleAnyUserInteraction, { capture: true, passive: true });
      storyViewport.addEventListener('touchmove', handleAnyUserInteraction, { capture: true, passive: true });
    }
  }

  if (btnBottomAudio) {
    btnBottomAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!receptionAudio) return;
      if (receptionAudio.paused) {
        userManuallyMuted = false;
        playSong();
        showToast('Playing Song 🎵');
      } else {
        userManuallyMuted = true;
        pauseSong();
        showToast('Song Muted 🔇');
      }
    });
  }



  // ================= 5. FALLING ROSE PETALS PARTICLE CANVAS =================
  const canvas = document.getElementById('petals-canvas');
  const ctx = canvas.getContext('2d');
  const btnPetalsToggle = document.getElementById('btn-petals-toggle');

  let petalsEnabled = true;
  let petals = [];
  const petalCount = 28;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -30;
      this.size = Math.random() * 9 + 8;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 1.2 - 0.6;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1.5 - 0.75;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = Math.random() * 0.03 + 0.01;
      
      const colors = [
        'rgba(235, 140, 155, 0.75)',
        'rgba(245, 175, 185, 0.70)',
        'rgba(255, 215, 140, 0.65)',
        'rgba(220, 110, 130, 0.80)'
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.y * 0.01) * 0.6;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;

      if (this.y > canvas.height + 30 || this.x < -30 || this.x > canvas.width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(Math.cos(this.flip), 1);

      ctx.fillStyle = this.color;
      ctx.beginPath();
      const s = this.size;
      const topCurveHeight = s * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(-s * 0.55, -s * 0.55, -s * 1.05, s * 0.35, 0, s);
      ctx.bezierCurveTo(s * 1.05, s * 0.35, s * 0.55, -s * 0.55, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < petalCount; i++) {
    petals.push(new Petal());
  }

  function animatePetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Mandatory petals on pages 1, 3, 4; seamlessly hidden on page 2 (video)
    const isVisibleOnSection = currentSectionIndex !== 1;
    petals.forEach(p => {
      p.update();
      if (isVisibleOnSection) {
        p.draw();
      }
    });
    requestAnimationFrame(animatePetals);
  }

  animatePetals();


  // ================= 6. TOAST NOTIFICATION HELPER =================
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

});
