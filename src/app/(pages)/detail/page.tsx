"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchDetailPage } from "@/redux/slices/detailSlice";
import { useSearchParams } from 'next/navigation';
import Loader from "@/app/components/Loader";
import About_the_Property from "./About_the_Property";
import MapContactForm from "./MapContactForm";
import Overview from "./Overview";
import Places_Nearby from "./Places_Nearby";
import Popular_Listing from "./Popular_Listing";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function page() {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    // const images = [
    //     "/images/detail_page_img_1.png",
    //     "/images/explore_img_2.png",  // Add more image paths as needed
    //     "/images/detail_page_img_1.png"
    // ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const data = useSelector((state: RootState) => state.detailPage?.data?.data[0]);
    const loading = useSelector((state: RootState) => state.detailPage?.loading);
    const dispatch = useDispatch<AppDispatch>();
    console.log("This is the data of the detail page", data);

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            dispatch(fetchDetailPage(Number(id)))
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [searchParams, dispatch]);

    useEffect(() => {
        if (data) {
            console.log("This is the property Image Array of the detail page", data?.property_Images);
        }

        const image_Data = data?.property_Images.map((currElem: { url: string, id: number }) => currElem?.url);
        setImages(image_Data);
    }, [data]);

    // Add auto-sliding effect
    useEffect(() => {
        if (images?.length > 0) {
            const timer = setInterval(() => {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentImageIndex((prevIndex) =>
                        prevIndex === images.length - 1 ? 0 : prevIndex + 1
                    );
                    setIsTransitioning(false);
                }, 500); // Match this with CSS transition duration
            }, 5000); // Change slide every 5 seconds

            return () => clearInterval(timer);
        }
    }, [images]);

    const handleDotClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const handlePrevClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    const handleNextClick = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
            setIsTransitioning(false);
        }, 500);
    };

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="detail_container w-full bg-bgColor">
                <div className="detail_inner_container relative w-[90%] max-sm:w-[95%] 2xl:w-[80%] z-10 mx-auto">
                    <div className="carousel_container relative w-[80%] max-lg:w-[90%] mx-auto h-[450px] max-lg:h-[450px] rounded-[20px]">
                        <img
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${images[currentImageIndex]}`}
                            alt={`Carousel image ${currentImageIndex + 1}`}
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'
                                }`}
                        />

                        <div className="feature_container absolute top-2 left-0 w-[200px] h-[50px] flex justify-center items-center rounded-[10px] bg-[#ED371C] text-white font-[600] text-[24px] tracking-[10%]">
                            Featured
                        </div>


                        {/* Add Navigation Buttons */}
                        <button
                            onClick={handlePrevClick}
                            className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
                            aria-label="Previous image"
                        >
                            <IoIosArrowBack size={24} />
                        </button>
                        <button
                            onClick={handleNextClick}
                            className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-white hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
                            aria-label="Next image"
                        >
                            <IoIosArrowForward size={24} />
                        </button>

                    </div>




                    {/* Dot Navigation */}
                    <div className="dot_navigation absolute lg:bottom-1/3 max-lg:bottom-1/4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {(images).map((_, index: number) => (
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

                <div className="estimated_EMI_bar relative w-[90%] 2xl:w-[80%] mx-auto bg-bgBlue -mt-32 max-lg:-mt-24 z-20 py-6 text-white flex justify-center max-lg:justify-between items-center px-8 rounded-t-[40px] rounded-b-[10px] gap-6 max-md:gap-4">
                    <div className="flex flex-col items-start justify-center gap-2">
                        <h3 className="font-[600] text-4xl max-lg:text-3xl max-md:text-2xl max-sm:text-base leading-tight tracking-[0.05em]">
                            ₹{data?.property_price} Cr
                        </h3>
                        <p className="text-xl max-lg:text-base max-md:text-sm max-sm:text-base tracking-[0.05em] text-bgRed">
                            Estimated EMI ₹{data?.estimated_emi_price}
                        </p>
                    </div>

                    <div className="border-r-2 border-[#FFFFFF] h-12 opacity-50" />

                    <div className="flex flex-col gap-1">
                        <p className="text-base max-lg:text-sm font-[400] tracking-[0.05em] text-white/50">
                            @ {data?.per_sqm_price} Per Sq.M.
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <p className="text-base max-lg:text-sm max-sm:text-xs text-white/70">
                            {
                                data?.propertyFeature?.slice(0, 2)?.map((currElem: { item: string, id: number }, index: number) => (
                                    <span key={currElem?.id}>
                                        {currElem?.item}
                                        {index < data?.propertyFeature?.length - 1 ? " " : ""}
                                    </span>
                                ))
                            }
                        </p>
                        <p className="text-sm max-lg:text-xs max-sm:text-[10px] text-white/50">
                            {data?.property_Type}
                        </p>
                        <p className="text-sm max-lg:text-xs text-white/50">
                            {data?.property_Location}
                        </p>
                    </div>
                </div>

                <Overview overViewArray={data?.property_Overview_container} />

                <About_the_Property propertyDescription={data?.property_Description} propertyAddress={data?.property_Location} />
                <Places_Nearby propertyAddress={data?.property_Location} nearBy_Array={data?.property_NearBy_places} />
                <MapContactForm listingId={data?.id} />
                <Popular_Listing propertyType={data?.property_Type} />
            </div>
        </>
    )
}