"use client"


import { useState } from "react";
import About_the_Property from "./About_the_Property";
import MapContactForm from "./MapContactForm";
import Overview from "./Overview";
import Places_Nearby from "./Places_Nearby";
import Popular_Listing from "./Popular_Listing";






export default function page() {
    const images = [
        "/images/detail_page_img_1.png",
        "/images/explore_img_2.png",  // Add more image paths as needed
        "/images/detail_page_img_1.png"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (index:number) => {
        setCurrentImageIndex(index);
    };

    return (
        <>
            <div className="detail_container w-full bg-bgColor">
                <div className="detail_inner_container relative w-[90%] max-sm:w-[95%] z-10 mx-auto">
                    <img
                        src={images[currentImageIndex]}
                        alt={`Carousel image ${currentImageIndex + 1}`}
                        className="w-full h-auto"
                    />
                    <div className="feature_container absolute top-6 -left-2 w-[200px] h-[50px] flex justify-center items-center rounded-[10px] bg-[#ED371C] text-white font-[600] text-[24px] tracking-[10%]">
                        Featured
                    </div>

                    {/* Dot Navigation */}
                    <div className="dot_navigation absolute bottom-1/3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {images.map((_, index:number) => (
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-3 h-3 rounded-full ${currentImageIndex === index
                                        ? 'bg-[#ED371C]'
                                        : 'bg-gray-300'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="estimated_EMI relative w-full 2xl:h-[400px] max-lg:h-[200px] max-md:h-[150px] bg-bgBlue -mt-56 max-lg:-mt-24 z-20 pb-8 pt-16 text-white flex justify-center max-lg:justify-between items-center max-lg:px-16 rounded-t-[80px] max-lg:rounded-t-[40px] rounded-b-[10px] max-lg:rounded-b-[5px] gap-3 max-md:gap-0">
                    <div className="h-full flex flex-col items-start justify-center gap-8 max-2xl:gap-0">
                        <h3 className="font-[600] 2xl:text-9xl max-2xl:text-8xl max-lg:text-4xl max-md:text-2xl leading-[36px] tracking-[0.05em]">₹5.99 Cr</h3>
                        <p className="mt-3 2xl:text-4xl max-2xl:text-3xl max-lg:text-sm max-md:text-xs leading-[36px] max-md:leading-0 tracking-[0.05em] text-bgRed">Estimated EMI ₹4,78,424</p>
                    </div>
                    <div className="border-r-2 border-[#FFFFFF] h-full max-lg:h-[50%] flex flex-col justify-center  bg-opacity-50 py-12 px-4">
                        <p className="text-xl 2xl:text-4xl max-lg:text-base max-md:text-xs font-[400] leading-[36px] tracking-[0.05em] text-white text-opacity-50">@ 3,32,777 Per Sq.M.</p>
                    </div>
                    <div className="text-2xl 2xl:text-5xl max-lg:text-xs flex flex-col gap-3 max-2xl:gap-1">
                        <p className="text-white text-opacity-70">3Bedrooms 2Baths</p>
                        <p className="text-white text-opacity-50 2xl:text-2xl max-lg:text-xs text-sm font-[400] leading-[36px]">Independent House/Villa for Sale</p>
                        <p className=" text-white text-opacity-50 2xl:text-2xl max-lg:text-xs text-xs">in Sector 14, Noida</p>
                    </div>
                </div>
                <Overview />

                <About_the_Property />
                <Places_Nearby />
                <MapContactForm />
                <Popular_Listing />
            </div>
        </>
    )
}