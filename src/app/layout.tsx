import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
    ? process.env.NEXT_PUBLIC_SITE_URL
    : 'https://stepwise.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'StepWise',
  title: {
    default: 'StepWise | Master Algorithms Through Visualization',
    template: '%s | StepWise',
  },
  description:
    'High-fidelity algorithm visualizer for engineers and students. Understand sorting, graph traversal, and heap operations with deterministic step-by-step traces.',
  keywords: [
    'algorithm visualizer',
    'sorting algorithms',
    'graph algorithms',
    'heap data structure',
    'computer science education',
    'step-by-step visualization',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'StepWise | Master Algorithms Through Visualization',
    description:
      'Interactive algorithm workspace for sorting, graph traversal, and heap operations with detailed runtime telemetry.',
    siteName: 'StepWise',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StepWise | Master Algorithms Through Visualization',
    description:
      'Interactive algorithm workspace for sorting, graph traversal, and heap operations with detailed runtime telemetry.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

const themeInitScript = `(function(){try{var stored=localStorage.getItem('theme');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var theme=stored==='dark'||stored==='light'?stored:(prefersDark?'dark':'light');var root=document.documentElement;root.classList.toggle('dark',theme==='dark');root.style.colorScheme=theme;}catch(e){}})();`;

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'StepWise',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  description:
    'Interactive algorithm visualizer for sorting, graph traversal, and heap operations with step-by-step telemetry.',
  url: siteUrl,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-slate-900 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}

