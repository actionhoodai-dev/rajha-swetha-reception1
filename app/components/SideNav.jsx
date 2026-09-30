'use client';

const SECTIONS = [
  { index: 0, label: '1. Welcome' },
  { index: 1, label: '2. Invitation Video' },
  { index: 2, label: '3. Our Story' },
  { index: 3, label: '4. Reception' },
];

export default function SideNav({ activeIndex, onSelectSection }) {
  return (
    <nav className="side-nav" aria-label="Page Sections Navigation">
      {SECTIONS.map((sec) => (
        <button
          key={sec.index}
          className={`nav-dot ${activeIndex === sec.index ? 'active' : ''}`}
          onClick={() => onSelectSection(sec.index)}
          title={sec.label}
          aria-label={sec.label}
        >
          <span className="dot-label">{sec.label}</span>
        </button>
      ))}
    </nav>
  );
}
