"use client"

import { Montserrat } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Template from "./components/Template";
import { Suspense } from "react";
import Header from './components/Header';
import Footer from './components/Footer';

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/Nav_logo.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={montserrat.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={store}>
            {/* <Header /> */}
            <Template>
              {children}
            </Template>
            {/* <Footer /> */}
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
