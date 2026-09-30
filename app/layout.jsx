import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

// Automatically detect Vercel production domain, deployment URL, or custom domain
const getSiteUrl = () => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'https://rajha-swetha-reception1.vercel.app';
};

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Rajha Mukilan & Swetha | Wedding & Reception Invitation',
  description: 'Two beautiful souls, one incredible journey. You are cordially invited to celebrate the wedding reception of Rajha Mukilan and Swetha on 12 November 2026 at Bharathi Mahal, Gobichettipalayam.',
  openGraph: {
    title: 'Rajha Mukilan & Swetha | Wedding & Reception',
    description: 'Two beautiful souls, one incredible journey. Save the date: 12 November 2026 at Bharathi Mahal, Gobichettipalayam.',
    type: 'website',
    url: siteUrl,
    siteName: 'Rajha & Swetha Wedding',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 675,
        type: 'image/jpeg',
        alt: 'Rajha Mukilan & Swetha Wedding & Reception Invitation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rajha Mukilan & Swetha | Wedding & Reception',
    description: 'Two beautiful souls, one incredible journey. Save the date: 12 November 2026.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* High-Priority Preloads for Instant First Paint */}
        <link
          rel="preload"
          as="image"
          href="/final-page1.png"
          type="image/png"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/final-page3.png"
          type="image/png"
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
          href="/reception-intro.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="/3rd-page-video.mp4"
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
