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
                                        { 
                                            title: "Experienced Agents", 
                                            description: "Our agents have years of experience in the real estate market.",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#E73336" viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm4 8.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zm-12 0a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                                                </svg>
                                            )
                                        },
                                        { 
                                            title: "Wide Range of Properties", 
                                            description: "We offer a wide range of properties to suit all needs.",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#E73336" viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                                                </svg>
                                            )
                                        },
                                        { 
                                            title: "Customer Satisfaction", 
                                            description: "We prioritize customer satisfaction above all else.",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#E73336" viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                                                </svg>
                                            )
                                        },
                                        { 
                                            title: "Affordable Prices", 
                                            description: "We provide properties at the most affordable prices.",
                                            icon: (
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="#E73336" viewBox="0 0 24 24" className="w-6 h-6">
                                                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                                                </svg>
                                            )
                                        }
                                    ].map((currElem, index) => {
                                        return (
                                            <div key={index} className="flex flex-col gap-1">
                                                <div className="bg-white w-[40px] h-[40px] max-lg:w-[32px] max-lg:h-[32px] max-md:w-[28px] max-md:h-[28px] max-sm:w-[24px] max-sm:h-[24px] rounded-[10px] flex items-center justify-center">
                                                    {currElem.icon}
                                                </div>
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