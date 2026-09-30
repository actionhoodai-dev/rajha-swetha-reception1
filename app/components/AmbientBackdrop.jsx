'use client';

const BACKGROUND_MAP = [
  '/template_intro_blank.jpg',
  '/section2_hd.png',
  '/template_story_blank.jpg',
  '/template_reception_blank.jpg',
];

export default function AmbientBackdrop({ activeIndex }) {
  const currentBg = BACKGROUND_MAP[activeIndex] || BACKGROUND_MAP[0];

  return (
    <div 
      className="ambient-backdrop" 
      style={{ backgroundImage: `url('${currentBg}')` }}
    />
  );
}
