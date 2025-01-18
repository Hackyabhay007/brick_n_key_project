import Image from "next/image";
import Buy_Section from "./Buy_Section";






export default function HeroSection() {
    return (
        <>
            <div className="heroSection_container relative z-10 w-full bg-bgColor">
                <div className="heroSection_inner_container relative 2xl:w-[70%] w-[90%] mx-auto flex flex-col justify-center items-center bg-center">
                    <Image width={100} height={100} src="/images/Hero_Section.png" alt="Hero_section_img" className="w-full h-full object-contain rounded-t-[20px]" />

                    <div className="absolute w-[80%] -mt-10 z-10 flex justify-center items-center">
                        <Buy_Section />
                    </div>

                </div>
            </div>
        </>
    )
}