'use client';

const BACKGROUND_MAP = [
  '/final-page1.png',
  '/section2_hd.png',
  '/final-page3.png',
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
