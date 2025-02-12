"use client"

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Template from "./components/Template";
import { Suspense } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from "./components/Loader";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Primary Meta Tags */}
        <title>Brick N Key - Premium Real Estate in India</title>
        <meta name="title" content="Brick N Key - Premium Real Estate in India" />
        <meta name="description" content="Discover premium properties with Brick N Key - Your trusted partner for buying, selling, and investing in real estate across India. Find luxury homes, apartments, and commercial properties." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bricknkey.com/" />
        <meta property="og:title" content="Brick N Key - Premium Real Estate in India" />
        <meta property="og:description" content="Discover premium properties with Brick N Key - Your trusted partner for buying, selling, and investing in real estate across India. Find luxury homes, apartments, and commercial properties." />
        <meta property="og:image" content="https://bricknkey.com/images/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bricknkey.com/" />
        <meta property="twitter:title" content="Brick N Key - Premium Real Estate in India" />
        <meta property="twitter:description" content="Discover premium properties with Brick N Key - Your trusted partner for buying, selling, and investing in real estate across India. Find luxury homes, apartments, and commercial properties." />
        <meta property="twitter:image" content="https://bricknkey.com/images/og-image.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/Nav_logo.png" type="image/png" />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="keywords" content="real estate india, property, luxury homes, apartments, houses, brick n key, property listing, real estate investment, premium properties" />
        <meta name="author" content="Brick N Key" />
        <meta name="google-site-verification" content="your-verification-code" />
        <link rel="canonical" href="https://bricknkey.com/" />
      </head>
      <body className={`${montserrat.className} overflow-x-hidden`}>
        <Suspense fallback={<div><Loader/></div>}>
          <Provider store={store}>
            <Template>
              {children}
            </Template>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
