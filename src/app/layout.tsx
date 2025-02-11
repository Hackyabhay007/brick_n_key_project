"use client"

import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Template from "./components/Template";
import { Suspense } from "react";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const metadata: Metadata = {
  title: 'Brick N Key - Find Your Dream Property',
  description: 'Discover the perfect property that matches your lifestyle and aspirations. Start your journey with us today.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/Nav_logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Brick N Key - Find Your Dream Property',
    description: 'Discover the perfect property that matches your lifestyle and aspirations. Start your journey with us today.',
    images: ['/images/Nav_logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brick N Key - Find Your Dream Property',
    description: 'Discover the perfect property that matches your lifestyle and aspirations. Start your journey with us today.',
    images: ['/images/Nav_logo.png'],
  },
};


  // console.error = () => {};
  // console.warn = () => {};
  // console.log = () => {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/Nav_logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={montserrat.className}>

      <Suspense fallback={<div>Loading...</div>}>
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
