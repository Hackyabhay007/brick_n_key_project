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
import Image from "next/image";
import { giveCorrectImage } from "@/app/data";
import { ImSpinner9 } from "react-icons/im";

const DetailPage = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [imageLoading, setImageLoading] = useState(true);
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
        // Reset currentImageIndex when images change
        setCurrentImageIndex(0);
    }, [data]);

    // Modify auto-sliding effect to only work when there are multiple images
    useEffect(() => {
        if (images?.length > 1) {
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

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    if (loading || isLoading) {
        return <Loader />;
    }

    return (
        <>
            <div className="detail_container w-full bg-bgColor">
                <div className="detail_inner_container group relative w-[95%] sm:w-[90%] 2xl:w-[80%] z-10 mx-auto">
                    <div className="carousel_container cursor-pointer relative w-[95%] sm:w-[90%] lg:w-[80%] mx-auto h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-[20px] overflow-hidden">
                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
                                <div className="simple-loader"></div>
                            </div>
                        )}

                        {imageLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 backdrop-blur-sm rounded-xl">
                                <ImSpinner9 className="animate-spin text-3xl sm:text-4xl text-bgRed" />
                            </div>
                        )}

                        <Image
                            width={600}
                            height={400}
                            src={giveCorrectImage(images[currentImageIndex])}
                            alt={`Carousel image ${currentImageIndex + 1}`}
                            onLoad={handleImageLoad}
                            className={`w-full h-full object-cover transition-opacity duration-500 rounded-xl 
                                ${isTransitioning || imageLoading ? 'opacity-0' : 'opacity-100'}`}
                            priority
                        />

                        <div className="feature_container absolute top-2 left-2 w-[100px] sm:w-[150px] h-[35px] sm:h-[50px] flex justify-center items-center rounded-[10px] bg-[#ED371C] text-white font-[600] text-[16px] sm:text-[24px] tracking-[10%]">
                            Featured
                        </div>

                        {images?.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrevClick}
                                    className="absolute left-1 sm:-left-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg"
                                    aria-label="Previous image"
                                >
                                    <IoIosArrowBack className="w-4 h-4 sm:w-6 sm:h-6" />
                                </button>
                                <button
                                    onClick={handleNextClick}
                                    className="absolute right-1 sm:-right-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 transition-all duration-300 shadow-lg"
                                    aria-label="Next image"
                                >
                                    <IoIosArrowForward className="w-4 h-4 sm:w-6 sm:h-6" />
                                </button>
                            </>
                        )}
                    </div>

                    {images?.length > 1 && (
                        <div className="dot_navigation absolute bottom-[25%] sm:bottom-1/3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
                            {images.map((_, index: number) => (
                                <button
                             
                                key={index}
                                    onClick={() => handleDotClick(index)}
                                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                                        currentImageIndex === index
                                            ? 'bg-[#ED371C]'
                                            : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    )}

                    <div className="estimated_EMI_bar transition-all duration-500 ease-in-out relative w-[95%] sm:w-[90%] 2xl:w-[80%] mx-auto bg-bgBlue -mt-16 sm:-mt-24 lg:-mt-32 group-hover:-mt-20 z-20 py-4 sm:py-6 text-white flex flex-wrap sm:flex-nowrap justify-between items-center px-4 sm:px-8 rounded-t-[20px] sm:rounded-t-[40px] rounded-b-[10px] gap-3 sm:gap-6">
                        <div className="flex flex-col items-start justify-center gap-1 sm:gap-2 w-full sm:w-auto">
                            <h3 className="font-[600] text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-[0.05em]">
                                ₹{data?.property_price} Cr
                            </h3>
                            <p className="text-sm sm:text-base lg:text-xl tracking-[0.05em] text-bgRed">
                                Estimated PRICE
                            </p>
                        </div>

                        <div className="hidden sm:block border-r-2 border-[#FFFFFF] h-12 opacity-50" />

                        <div className="flex flex-col gap-1 w-1/2 sm:w-auto">
                            <p className="text-sm lg:text-base font-[400] tracking-[0.05em] text-white/50">
                                @ {data?.per_sqm_price} Per Sq.M.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1 w-1/2 sm:w-auto">
                            <p className="text-xs sm:text-sm lg:text-base text-white/70">
                                {
                                    data?.propertyFeature?.slice(0, 2)?.map((currElem: { item: string, id: number }, index: number) => (
                                        <span key={currElem?.id}>
                                            {currElem?.item}
                                            {index < data?.propertyFeature?.length - 1 ? " " : ""}
                                        </span>
                                    ))
                                }
                            </p>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-white/50">
                                {data?.property_Type}
                            </p>
                            <p className="text-[10px] sm:text-xs lg:text-sm text-white/50">
                                {data?.property_Location}
                            </p>
                        </div>
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

export default DetailPage;