"use client"

import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Template from "./components/Template";
import Head from "next/head";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const metadata: Metadata = {
  title: 'Brick N Key - Premium Real Estate Properties',
  description: 'Discover luxurious properties, premium apartments, and exclusive real estate listings. Find your dream home with Brick N Key - your trusted property partner.',
  keywords: 'real estate, luxury homes, premium properties, apartments, houses for sale, property listings, Brick N Key, real estate agency',
  authors: [{ name: 'Brick N Key' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/Nav_logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Brick N Key - Premium Real Estate Properties',
    description: 'Explore exclusive properties and find your perfect home. Premium real estate listings curated by Brick N Key.',
    images: ['/images/Nav_logo.png'],
    type: 'website',
    locale: 'en_US',
    siteName: 'Brick N Key',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brick N Key - Luxury Real Estate',
    description: 'Discover premium properties and exclusive real estate listings at Brick N Key.',
    images: ['/images/Nav_logo.png'],
    creator: '@BrickNKey',
    site: '@BrickNKey',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <Head>
        {/* Base Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ED371C" />
        
        {/* Favicon */}
        <link rel="icon" href="public/images/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png"/>
        
        {/* PWA Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Brick N Key" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Brick N Key" />
        
        {/* Base SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Brick N Key" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Social & Search */}
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://www.bricknkey.com" />
      </Head>
      <body className={montserrat.className}>
        <Provider store={store}>
          <Template>
            {children}
          </Template> 
        </Provider>
      </body>
    </html>
  );
}
