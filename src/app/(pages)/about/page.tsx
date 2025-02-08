import Image from "next/image"
import { aboutPageData } from "@/app/data"
import { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

export const metadata: Metadata = seoData.about;

export default function About() {
    return (
        <div className="about_page_container w-full bg-bgColor">
            <div className="about_page_inner_container w-[90%] max-sm:w-[95%] 2xl:w-[80%] mx-auto pt-16 max-lg:pt-20 max-md:pt-16 max-sm:pt-12">
                {aboutPageData.hero.title.map((line, index) => (
                    <h1 key={index} className="font-[700] text-7xl max-xl:text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">
                        {index === 1 ? (
                            <>Dream <span className="text-bgRed">Home</span> Today!</>
                        ) : line}
                    </h1>
                ))}
                
                <button className="w-auto px-8 h-[3.375rem] max-lg:h-[2.8rem] rounded-[63px] uppercase bg-bgRed text-white text-base max-lg:text-sm max-sm:text-xs leading-normal my-8 max-lg:my-6 max-md:my-4 max-sm:my-3 font-medium tracking-[0.2em]">
                    <a href={aboutPageData.hero.callButton.link}>{aboutPageData.hero.callButton.text}</a>
                </button>

                <div className="about_us_info w-full mx-auto min-h-screen bg-cover max-lg:min-h-[auto] text-white grid grid-cols-2 px-12 py-16 max-xl:px-8 max-lg:grid-cols-1 gap-8 max-lg:gap-12 max-md:px-6 max-sm:px-4" 
                    style={{ backgroundImage: `url('${aboutPageData.mainSection.backgroundImage}')` }}>
                    <div className="flex flex-col justify-end items-start max-lg:pt-32 max-2xl:pt-36 2xl:pt-40 max-2xl:gap-10 2xl:gap-12">
                        <h3 className="font-[600] text-6xl max-xl:text-5xl max-lg:text-4xl max-sm:text-3xl">
                            {aboutPageData.mainSection.title}
                        </h3>
                        <div className="about_us_grid_container w-full h-full grid grid-cols-2 items-end max-lg:grid-cols-1 mt-16 max-lg:mt-12 max-sm:mt-8 max-sm:gap-6 max-lg:gap-y-8 max-2xl:gap-x-6 max-2xl:gap-y-20 2xl:gap-4">
                            {aboutPageData.mainSection.features.map((feature, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <div className="bg-white w-[40px] h-[40px] max-lg:w-[32px] max-lg:h-[32px] max-md:w-[28px] max-md:h-[28px] max-sm:w-[24px] max-sm:h-[24px] rounded-[10px] flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#E73336" viewBox={feature.icon.viewBox} className="w-6 h-6">
                                            <path d={feature.icon.path} />
                                        </svg>
                                    </div>
                                    <h3 className="text-[18px] max-2xl:text-sm max-lg:text-[18px] max-md:text-[16px] max-sm:text-[14px] font-[600]">
                                        {feature.title}
                                    </h3>
                                    <p className="max-lg:text-xs leading-[15.85px] max-lg:leading-[14.52px] max-md:leading-[13.39px] max-sm:leading-[12.2px] font-[400] text-[#8F90A6]">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-full flex items-center justify-center lg:items-end">
                        <div className="w-full h-auto max-lg:h-[150px] max-2xl:h-[430px] 2xl:h-[450px] aspect-[4/3] relative rounded-2xl overflow-hidden">
                            <Image
                                width={100} 
                                height={100}
                                src={aboutPageData.mainSection.rightImage.src}
                                alt={aboutPageData.mainSection.rightImage.alt}
                                className="w-full h-full object-cover"
                                style={{
                                    objectPosition: 'center bottom'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}