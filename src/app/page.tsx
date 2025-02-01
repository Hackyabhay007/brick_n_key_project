"use client"

import Brand from "./components/Brand"
import Explore_Section from "./components/Explore_Section"
import HeroSection from "./components/HeroSection"
import Popular_Residence from "./components/Popular_Residence"
import Trust_Us from "./components/Trust_Us"
// import Unlock from "./components/Unlock"
import Why_Choose_Us from "./components/Why_Choose_Us"





export default function page(){
  return(
    <>
        <HeroSection />
        <Popular_Residence />
        <Explore_Section />
        <Brand />
        <Why_Choose_Us />
        <Trust_Us />
    </>
  )
}