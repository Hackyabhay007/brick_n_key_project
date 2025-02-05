





export default function page() {
    return (
        <>
            <div className="about_page_container w-full bg-bgColor pb-16">
                <div className="about_page_inner_container w-[90%] max-sm:w-[95%] 2xl:w-[80%] mx-auto pt-12 max-lg:pt-24 max-md:pt-16 max-sm:pt-12">
                    <h1 className="font-[700] text-8xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">Unlock Your</h1>
                    <h1 className="font-[700] text-8xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl">Dream <span className="text-bgRed">Home</span> Today!</h1>
                    <button className="w-[10.375rem] max-lg:w-[9rem] h-[3.375rem] max-lg:h-[2.8rem] rounded-[63px] uppercase bg-bgRed text-white text-base max-lg:text-sm max-sm:text-xs leading-[29.26px] my-12 max-lg:my-6 max-md:my-4 max-sm:my-3 font-medium tracking-[0.2em]">Call Now</button>

                    <div className="about_us_info w-full mx-auto h-auto max-lg:h-screen max-lg:px-8 max-lg:py-24 max-md:px-6 max-md:py-16 max-sm:px-4 max-sm:py-0 text-white grid grid-cols-2 px-16 py-20 max-lg:grid-cols-1 gap-12 max-[1290px]:gap-4 max-[1290px]:px-6 max-[1290px]:py-12 max-lg:pt-6 max-md:pt-2" style={{ backgroundImage: "url('/images/about_us_img_1.png')" }}>
                        <div className="flex flex-col justify-center pt-40 items-start max-lg:mt-0 max-md:mt-0">
                            <h3 className="font-[600] text-7xl max-lg:text-4xl">About Us</h3>
                            <div className="about_us_grid_container max-lg:w-[80%] grid grid-cols-2 max-lg:grid-cols-1 mt-32 max-lg:mt-16 max-md:mt-12 max-sm:mt-8 gap-8">
                                {
                                    [
                                        { title: "Experienced Agents", description: "Our agents have years of experience in the real estate market." },
                                        { title: "Wide Range of Properties", description: "We offer a wide range of properties to suit all needs." },
                                        { title: "Customer Satisfaction", description: "We prioritize customer satisfaction above all else." },
                                        { title: "Affordable Prices", description: "We provide properties at the most affordable prices." }
                                    ].map((currElem, index) => {
                                        return (
                                            <div className="flex flex-col gap-1">
                                                <div className="bg-white w-[40px] h-[40px] max-lg:w-[32px] max-lg:h-[32px] max-md:w-[28px] max-md:h-[28px] max-sm:w-[24px] max-sm:h-[24px] rounded-[10px]"></div>
                                                <h3 className="text-[18px] max-lg:text-[18px] max-md:text-[16px] max-sm:text-[14px] font-[600]">{currElem?.title}</h3>
                                                <p className="text-[13px] max-lg:text-[12px] max-md:text-[11px] max-sm:text-[10px] leading-[15.85px] max-lg:leading-[14.52px] max-md:leading-[13.39px] max-sm:leading-[12.2px] font-[400] text-[#8F90A6]">{currElem?.description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-end max-sm:items-center">
                            <img src="/images/about_us_img_2.png" alt="" className="rounded-[20px] max-lg:h-[100px] max-lg:w-full" />
                        </div>
                    </div>

                    {/* <div className="about_us_info_in_mobile w-full h-[863px] overscroll-none border-none  max-lg:px-8 max-lg:py-24 max-md:px-6 max-md:py-16 max-sm:px-4 max-sm:py-12 text-white grid grid-cols-2 max-lg:grid-cols-1 gap-12" style={{ backgroundImage: "url('/images/about_us_mobile_reactangle_img.png')" }}>
                        
                    </div> */}
                </div>
            </div>
        </>
    )
}