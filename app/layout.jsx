import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata = {
  title: 'Rajha Mukilan & Swetha | Wedding & Reception Invitation',
  description: 'You are cordially invited to celebrate the wedding reception of Rajha Mukilan and Swetha on 12 November 2026 at Bharathi Mahal, Gobichettipalayam.',
  openGraph: {
    title: 'Rajha Mukilan & Swetha | Wedding & Reception',
    description: 'Two beautiful souls, one incredible journey. Save the date: 12 November 2026.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* High-Priority Image Preloads for Instant First Paint */}
        <link
          rel="preload"
          as="image"
          href="/template_intro_blank.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/template_story_blank.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/template_reception_blank.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="video"
          href="/ordered_video.mp4"
          type="video/mp4"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
