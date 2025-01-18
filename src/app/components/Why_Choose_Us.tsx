import Image from "next/image";






export default function Why_Choose_Us() {
    return (
        <>
            <div className="why_choose_us_container relative bg-bgColor">
                <div className="why_choose_us_inner_container  w-[95%] z-10 mx-auto grid grid-cols-2 gap-6 bg-bgBlue p-12 text-white">

                    {/* Diagonal lines */}
                    {/* <div className="absolute left-0 top-0 w-full h-full overflow-hidden">
                        <div className="absolute -top-[37px] left-[13px] w-[416.69px] h-[59.41px] bg-[#FFFFFF] bg-opacity-20 rotate-[30deg]"></div>
                        <div className="absolute -top-[8.9px] left-[86.82px] w-[744px] h-[172px] bg-[#FFFFFF] bg-opacity-30 rotate-[30deg]"></div>
                        <div className="absolute top-[237.76px] left-[-80.53px] w-[416px] h-[59px] bg-[#FFFFFF] bg-opacity-30 rotate-[30deg]"></div>
                    </div> */}

                    <div className="absolute" style={{backgroundImage: "url('/images/why_choose_us_img_2.png')"}}></div>

                    <div className="flex flex-col justify-start items-start gap-3">
                        <h1 className="text-[54px] font-[600] leading-[65.83px]">Why Choose Us?</h1>
                        <p className="text-[14px] leading-[31px] font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <button className="py-0.5 px-6 bg-[#ED371C] font-[600] text-[16px] leading-[36px] rounded-[20px] mt-6">Contact US</button>
                    </div>
                    <div className="w-full h-full flex justify-center items-center bg-center py-6">
                        <Image width={600} height={200} src="/images/why_choose_us_img.png" alt="why_choose_us_section_img" className="w-full h-full" />
                    </div>
                </div>
            </div>
        </>
    )
}