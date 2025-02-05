"use client"

import { useEffect, useState } from 'react'
import Brand from "./components/Brand"
import Explore_Section from "./components/Explore_Section"
import HeroSection from "./components/HeroSection"
import Popular_Residence from "./components/Popular_Residence"
import Trust_Us from "./components/Trust_Us"
import Why_Choose_Us from "./components/Why_Choose_Us"
import Loader from './components/Loader'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const headerLoading = useSelector((state: RootState) => state.headerSection.loading);
  const heroLoading = useSelector((state: RootState) => state.heroSection.loading);
  const popularLoading = useSelector((state: RootState) => state.popularSection.loading);
  const brandLoading = useSelector((state: RootState) => state.brandSection.loading);

  useEffect(() => {
    // Check if all main components have finished loading
    if (!headerLoading && !heroLoading && !popularLoading && !brandLoading) {
      // Add a small delay to ensure smooth transition
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [headerLoading, heroLoading, popularLoading, brandLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return(
    <>
        <HeroSection />
        <Popular_Residence />
        <Brand />
        <Explore_Section />
        <Why_Choose_Us />
        <Trust_Us />
    </>
  )
}